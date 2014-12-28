# Grouper.js [![npm Version](http://img.shields.io/npm/v/grouper.svg?style=flat)](https://www.npmjs.org/package/grouper) [![Build Status](https://img.shields.io/travis/yuanqing/grouper.svg?style=flat)](https://travis-ci.org/yuanqing/grouper) [![Coverage Status](https://img.shields.io/coveralls/yuanqing/grouper.svg?style=flat)](https://coveralls.io/r/yuanqing/grouper)

> Assign objects into groups by one or more properties, by object value, or by using a comparator function.

## API

### grouper(arr, props [, opts])

*Group by one or more properties.*

```js
var arr = [
  { title: 'foo', date: { year: 1999, month: 1 } },
  { title: 'foo', date: { year: 2000, month: 1 } },
  { title: 'bar', date: { year: 2000, month: 1 } },
  { title: 'bar', date: { year: 2000, month: 2 } },
];

// group by multiple properties
grouper(arr, ['title', 'date.year']);
/* [
 *   [ arr[0] ],
 *   [ arr[1] ],
 *   [ arr[2], arr[3] ]
 * ]
 */
```

1. Objects in `arr` will be grouped together if and only if they are the same for every property specified in `props`. Comparison is via the [deep-equal](https://github.com/substack/node-deep-equal#deepequala-b-opts) module with `opts.strict` set to true.
2. To group on a &ldquo;nested&rdquo; property, use a dot-delimited string (eg. `date.year` above). (See [Jaunt.js](https://github.com/yuanqing/jaunt).)
3. For coercive comparison (`==`), pass in an `opts` argument, setting `opts.strict` to `false`.

### grouper(arr [, opts])

*Group by object value.*

```js
var arr = [
  { foo: true },
  { foo: 1 },
  { foo: false },
  { foo: 1 }
];

// group by object value (with coercive `==`)
grouper(arr, { strict: false });
/* [
 *   [ arr[0], arr[1], arr[3] ],
 *   [ arr[2] ]
 * ]
 */
```

1. Objects in `arr` will be grouped together if and only if they are the same value. Comparison is via the [deep-equal](https://github.com/substack/node-deep-equal#deepequala-b-opts) module with `opts.strict` set to true.
2. For coercive comparison (`==`), pass in an `opts` argument, setting `opts.strict` to `false`.

### grouper(arr, fn)

*Group using a comparator function.*

```js
var arr = [
  { foo: true },
  { foo: 1 },
  { foo: false },
  { foo: 1 }
];

// group using a comparator function
var fn = function(a, b) {
  return a.foo === b.foo;
};
grouper(arr, fn);
/* [
 *   [ arr[0] ],
 *   [ arr[1], arr[3] ],
 *   [ arr[2] ]
 * ]
 */
```

The `fn` comparator function will be passed two elements from `arr`. The function must return a truthy value if its two arguments are to be placed in the same group.

## Installation

Install via [npm](https://www.npmjs.org/):

```bash
$ npm i --save grouper
```

## Changelog

- 2.1.0
  - Allow grouping using a comparator function
- 2.0.0
  - Use [deep-equal](https://github.com/substack/node-deep-equal) for comparing property values, with option to use coercive comparison
  - Allow grouping by object value
  - Allow grouping by nested keys
- 1.0.0
  - Initial release

## License

[MIT license](https://github.com/yuanqing/grouper/blob/master/LICENSE)
