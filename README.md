# Grouper.js [![Build Status](https://img.shields.io/travis/yuanqing/grouper.svg?style=flat)](https://travis-ci.org/yuanqing/grouper) [![Coverage Status](https://img.shields.io/coveralls/yuanqing/grouper.svg?style=flat)](https://coveralls.io/r/yuanqing/grouper)

> Group objects by their properties.

## Usage

Given an array of objects:

```js
var arr = [
  { name: 'foo', age: 2, score: 0 },
  { name: 'bar', age: 2, score: 0 },
  { name: 'baz', age: 3, score: 0 },
  { name: 'qux', age: 2, score: 1 }
];
```

&hellip;we can group the objects by a single property:

```js
grouper(arr, 'age');
/* =>
 * [ [ { name: 'foo', age: 2, score: 0 },
 *     { name: 'bar', age: 2, score: 0 },
 *     { name: 'qux', age: 2, score: 1 } ],
 *   [ { name: 'baz', age: 3, score: 0 } ] ]
 */
```

&hellip;or by multiple properties:

```js
grouper(arr, ['age', 'score']);
/* =>
 * [ [ { name: 'foo', age: 2, score: 0 },
 *     { name: 'bar', age: 2, score: 0 } ],
 *   [ { name: 'baz', age: 3, score: 0 } ],
 *   [ { name: 'qux', age: 2, score: 1 } ] ]
 */
```

## API

### grouper(arr, props)

`props` may be an `array` or a `string`. Objects to be grouped together must have the same value (strict `===`) for every property in `props`.

## Installation

Install using [npm](https://www.npmjs.org/package/grouper):

```bash
$ npm i --save grouper
```

Or [grab the minified script](https://github.com/yuanqing/grouper/raw/master/dist/grouper.min.js) from the [`dist`](https://github.com/yuanqing/grouper/tree/master/dist) directory.

## License

[MIT license](https://github.com/yuanqing/grouper/blob/master/LICENSE)