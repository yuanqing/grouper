'use strict';

var deepEqual = require('deep-equal');
var get = require('jaunt').get;

var grouper = function(arr, props, opts) {

  opts = opts || {};
  if (typeof opts.strict === 'undefined') {
    opts.strict = true; // default to strict `===`
  }

  props = [].concat(props).filter(Boolean);
  var propsLen = props.length;
  var comparator;
  if (propsLen === 0) {
    comparator = function(a, b) {
      return deepEqual(a, b, opts);
    };
  } else {
    comparator = function(a, b, props) {
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

  var result = [];

  // for every `arr[i]` in `arr`...
  var arrLen = arr.length;
  var i = -1;
  while (++i < arrLen) {

    // for every `result[j]` group in `result`...
    var wasAdded = false;
    var resultLen = result.length;
    var j = -1;
    while (++j < resultLen) {

      // check if `arr[i]` belongs to the `result[j]` group
      if (comparator(arr[i], result[j][0], props)) {
        result[j].push(arr[i]);
        wasAdded = true;
      }

    }

    // if `arr[i]` was not added to any group, create a new group containing only `arr[i]`
    // and add it to `result`
    if (!wasAdded) {
      result.push([arr[i]]);
    }

  }

  return result;

};

module.exports = grouper;
