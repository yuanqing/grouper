'use strict';

var deepEqual = require('deep-equal');
var get = require('jaunt').get;

var isObject = function(obj) {
  return obj !== null && typeof obj === 'object' && !Array.isArray(obj);
};

var grouper = function(arr, props, opts) {

  var comparator;
  if (typeof props === 'function') {
    comparator = props;
  } else {
    if (isObject(props)) { // argument shuffling for grouping by object value
      opts = props;
      props = [];
    }
    opts = opts || {};
    if (typeof opts.strict === 'undefined') {
      opts.strict = true; // default to strict `===`
    }
    props = [].concat(props).filter(Boolean);
    var propsLen = props.length;
    if (propsLen === 0) {
      comparator = function(a, b) {
        return deepEqual(a, b, opts);
      };
    } else {
      comparator = function(a, b) {
        var k = -1;
        while (++k < propsLen) {
          // check if `a` has the same values as `b` for every property in `props`
          var prop = props[k];
          if (!deepEqual(get(a, prop), get(b, prop), opts)) {
            return false;
          }
        }
        return true;
      };
    }
  }

  var result = [];
  var arrLen = arr.length;
  var i = -1;
  // for every `arr[i]` in `arr`...
  while (++i < arrLen) {
    var wasAdded = false;
    var resultLen = result.length;
    var j = -1;
    // for every `result[j]` group in `result`...
    while (++j < resultLen) {
      // check if `arr[i]` belongs to the `result[j]` group
      if (comparator(arr[i], result[j][0])) {
        result[j].push(arr[i]);
        wasAdded = true;
      }
    }
    // if `arr[i]` was not added to any group, create a new group containing only
    // `arr[i]` and add it to `result`
    if (!wasAdded) {
      result.push([arr[i]]);
    }
  }

  return result;

};

module.exports = grouper;
