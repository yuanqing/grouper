/* globals describe, it, expect, grouper */

describe('grouper', function() {

  var arr = [
    { name: 'foo', age: 2, score: 0 },
    { name: 'bar', age: 2, score: 0 },
    { name: 'baz', age: 3, score: 0 },
    { name: 'qux', age: 2, score: 1 }
  ];

  it('should return `arr` if `props` is empty', function() {
    expect(grouper(arr, [])).toEqual(arr);
  });

  it('can group on a single property', function() {
    expect(grouper(arr, 'age')).toEqual([
      [ arr[0], arr[1], arr[3] ],
      [ arr[2] ]
    ]);
    expect(grouper(arr, 'score')).toEqual([
      [ arr[0], arr[1], arr[2] ],
      [ arr[3] ]
    ]);
  });

  it('can group on multiple properties', function() {
    expect(grouper(arr, ['age', 'score'])).toEqual([
      [ arr[0], arr[1] ],
      [ arr[2] ],
      [ arr[3] ],
    ]);
  });

});
