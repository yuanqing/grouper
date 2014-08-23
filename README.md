# Grouper.js [![npm Version](http://img.shields.io/npm/v/grouper.svg?style=flat)](https://www.npmjs.org/package/grouper) [![Build Status](https://img.shields.io/travis/yuanqing/grouper.svg?style=flat)](https://travis-ci.org/yuanqing/grouper) [![Coverage Status](https://img.shields.io/coveralls/yuanqing/grouper.svg?style=flat)](https://coveralls.io/r/yuanqing/grouper)

> Group objects by their properties.

## Usage

```js
var arr = [
  { name: 'foo', age: 2, score: 0 },
  { name: 'bar', age: 2, score: 0 },
  { name: 'baz', age: 3, score: 0 },
  { name: 'qux', age: 2, score: 1 }
];

grouper(arr, 'age'); // group by a single property
/* =>
 * [ [ { name: 'foo', age: 2, score: 0 },
 *     { name: 'bar', age: 2, score: 0 },
 *     { name: 'qux', age: 2, score: 1 } ],
 *   [ { name: 'baz', age: 3, score: 0 } ] ]
 */

grouper(arr, ['age', 'score']); // group by multiple properties
/* =>
 * [ [ { name: 'foo', age: 2, score: 0 },
 *     { name: 'bar', age: 2, score: 0 } ],
 *   [ { name: 'baz', age: 3, score: 0 } ],
 *   [ { name: 'qux', age: 2, score: 1 } ] ]
 */
```

## API

### grouper(arr, props)

Groups objects in `arr` by `props`. Objects to be grouped together must have the same value (strict `===`) for every property in `props`.

- `arr` is an `array` of objects.

- `props` is a `string`, or an `array` of property names.

## Installation

Install via [npm](https://www.npmjs.org/package/grouper):

```bash
$ npm i --save grouper
```

## License

[MIT license](https://github.com/yuanqing/grouper/blob/master/LICENSE)
