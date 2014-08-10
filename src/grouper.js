/* globals define */
var f = function () {

  'use strict';

  return function(arr, props) {

    props = typeof props === 'string' ? [props] : props;

    var propsLen = props.length;
    if (!propsLen) {
      return arr;
    }

    var result = [],
        arrLen = arr.length,
        resultLen,
        added,
        same,
        i, j, k;

    for (i = 0; i < arrLen; ++i) {

      added = false; // was `arr[i]` added to `result`?
      resultLen = result.length;
      for (j = 0; !added && j < resultLen; ++j) {

        same = true; // does `arr[i]` have the same values as `result[j][0]` for all `props`?
        for (k = 0; same && k < propsLen; ++k) {
          if (result[j][0][props[k]] !== arr[i][props[k]]) {
            same = false;
          }
        }

        if (same) { // same `props`, so add `arr[i]` to `result[j]`
          result[j].push(arr[i]);
          added = true;
        }

      }

      if (!added) { // `arr[i]` not added, so add a new group containing only `arr[i]` to `result`
        result[resultLen] = [arr[i]];
      }

    }

    return result;

  };

};

/* istanbul ignore next */
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(factory);
  } else if (typeof exports === 'object') {
    module.exports = factory;
  } else {
    root.grouper = factory(root);
  }
})(this, f);