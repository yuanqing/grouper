/* globals describe, it, expect */
'use strict';

var grouper = require('..');

describe('grouper(arr [, props, opts])', function() {

  describe('grouping on object value', function() {

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

    it('can also use coercive `==`', function() {
      var result = grouper(arr, [], { strict: false });
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

  describe('grouping on object `props`', function() {

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

    it('can also use coercive `==`', function() {
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

    it('can group on multiple properties', function() {
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

});
