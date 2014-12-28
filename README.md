# Grouper.js [![npm Version](http://img.shields.io/npm/v/grouper.svg?style=flat)](https://www.npmjs.org/package/grouper) [![Build Status](https://img.shields.io/travis/yuanqing/grouper.svg?style=flat)](https://travis-ci.org/yuanqing/grouper) [![Coverage Status](https://img.shields.io/coveralls/yuanqing/grouper.svg?style=flat)](https://coveralls.io/r/yuanqing/grouper)

> Assign objects into groups based on their properties.

## Usage

```js
var arr = [
  { title: 'foo', date: { year: 1999, month: 1 } },
  { title: 'foo', date: { year: 2000, month: 1 } },
  { title: 'bar', date: { year: 2000, month: 1 } },
  { title: 'bar', date: { year: 2000, month: 2 } },
];
var props = ['title', 'date.year'];

grouper(arr, props);
/* [
 *   [ arr[0] ],
 *   [ arr[1] ],
 *   [ arr[2], arr[3] ]
 * ]
 */
```

1. Objects in `arr` will be grouped together if and only if they have same value (strict `===`) for every property specified in `props`.
2. To group on a &ldquo;nested&rdquo; property, use a dot-delimited string (eg. `date.year` above).
3. For coercive comparison (`==`), pass in a third `opts` argument, with `opts.strict` set to `false`.
4. To group on the objects values themselves, omit `props`, or pass in an empty array.

Read [the tests](https://github.com/yuanqing/grouper/blob/master/test/grouper.spec.js) for more usage examples.

Note that under the hood, Grouper uses:
- [deep-equal](https://github.com/substack/node-deep-equal) for comparing property values, and
- [Jaunt](https://github.com/yuanqing/jaunt) for accessing nested properties.

## API

### grouper(arr [, props, opts])

Groups objects in `arr` by each property in `props`. If `props` is ommitted, or an empty array, grouping is by object value.

- `arr` &mdash; The array of objects to be assigned into groups.
- `props` &mdash; An optional array of property names.
- `opts` &mdash; Set `opts.strict` to `false` for coercive `==` when comparing property values.

## Installation

Install via [npm](https://www.npmjs.org/):

```bash
$ npm i --save grouper
```

## Changelog

- 2.0.0
  - Use [deep-equal](https://github.com/substack/node-deep-equal) for comparing property values, with option to use coercive comparison
  - Allow grouping by object value
  - Allow grouping by nested keys
- 1.0.0
  - Initial release

## License

[MIT license](https://github.com/yuanqing/grouper/blob/master/LICENSE)
