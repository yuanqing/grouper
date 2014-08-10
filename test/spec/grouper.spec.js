/* globals describe, it, expect, grouper */

describe('grouper', function() {

  var arr = [
    { foo: 0, bar: 0, baz: 0 },
    { foo: 1, bar: 0, baz: 0 },
    { foo: 0, bar: 1, baz: 0 },
    { foo: 0, bar: 0, baz: 1 }
  ];

  it('should return `arr` if `props` is empty', function() {
    expect(grouper(arr, [])).toEqual(arr);
  });

  it('can group on a single property', function() {
    expect(grouper(arr, ['foo'])).toEqual([
      [arr[0], arr[2], arr[3]],
      [arr[1]]
    ]);
  });

  it('can group on multiple properties', function() {
    expect(grouper(arr, ['foo', 'bar'])).toEqual([
      [arr[0], arr[3]],
      [arr[1]],
      [arr[2]],
    ]);
  });

});
