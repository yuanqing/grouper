/* globals describe, it, expect */
'use strict';

var grouper = require('..');

describe('grouper', function() {

  describe('group by one or more properties', function() {

    var arr = [
      { foo: true },
      { foo: 1 },
      { foo: false },
      { foo: 1 }
    ];

    it('defaults to strict `===`', function() {
      var result = grouper(arr, 'foo');
      expect(result).toEqual([
        [ arr[0] ],
        [ arr[1], arr[3] ],
        [ arr[2] ]
      ]);
      expect(result[0][0]).toBe(arr[0]);
      expect(result[1][0]).toBe(arr[1]);
      expect(result[1][1]).toBe(arr[3]);
      expect(result[2][0]).toBe(arr[2]);
    });

    it('with coercive `==`', function() {
      var result = grouper(arr, 'foo', { strict: false });
      expect(result).toEqual([
        [ arr[0], arr[1], arr[3] ],
        [ arr[2] ]
      ]);
      expect(result[0][0]).toBe(arr[0]);
      expect(result[0][1]).toBe(arr[1]);
      expect(result[0][2]).toBe(arr[3]);
      expect(result[1][0]).toBe(arr[2]);
    });

    it('group by multiple properties', function() {
      var arr = [
        { title: 'foo', date: { year: 1999, month: 1 } },
        { title: 'foo', date: { year: 2000, month: 1 } },
        { title: 'bar', date: { year: 2000, month: 1 } },
        { title: 'bar', date: { year: 2000, month: 2 } },
      ];
      var result = grouper(arr, ['title', 'date.year']);
      expect(result).toEqual([
        [ arr[0] ],
        [ arr[1] ],
        [ arr[2], arr[3] ]
      ]);
    });

  });

  describe('group by object value', function() {

    var arr = [
      { foo: true },
      { foo: 1 },
      { foo: false },
      { foo: 1 }
    ];

    it('defaults to strict `===`', function() {
      var result = grouper(arr);
      expect(result).toEqual([
        [ arr[0] ],
        [ arr[1], arr[3] ],
        [ arr[2] ]
      ]);
      expect(result[0][0]).toBe(arr[0]);
      expect(result[1][0]).toBe(arr[1]);
      expect(result[1][1]).toBe(arr[3]);
      expect(result[2][0]).toBe(arr[2]);
    });

    it('with coercive `==`', function() {
      var result = grouper(arr, { strict: false });
      expect(result).toEqual([
        [ arr[0], arr[1], arr[3] ],
        [ arr[2] ]
      ]);
      expect(result[0][0]).toBe(arr[0]);
      expect(result[0][1]).toBe(arr[1]);
      expect(result[0][2]).toBe(arr[3]);
      expect(result[1][0]).toBe(arr[2]);
    });

  });

  describe('group using a comparator function', function() {

    var arr = [
      { foo: true },
      { foo: 1 },
      { foo: false },
      { foo: 1 }
    ];

    it('works', function() {
      var result = grouper(arr, function(a, b) {
        return a.foo === b.foo;
      });
      expect(result).toEqual([
        [ arr[0] ],
        [ arr[1], arr[3] ],
        [ arr[2] ]
      ]);
      expect(result[0][0]).toBe(arr[0]);
      expect(result[1][0]).toBe(arr[1]);
      expect(result[1][1]).toBe(arr[3]);
      expect(result[2][0]).toBe(arr[2]);
    });

  });

});
