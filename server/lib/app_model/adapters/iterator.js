const __ = require('lodash');

var Iterator = function(obj) {

  var obj = obj || {};

  var get = function(path) {
    var url = path.split('/'),
        node = {};

    url.forEach(function(v, k){
      node = node[v] || obj[v];
    });

    return node;
  };

  var first = function(){
    console.log('first');
  };

  var first_key = function(){
    console.log('first_key');
  };

  var first_value = function(){
    console.log('first_value');
  };

  var last = function() {
    console.log('last');
  };

  var last_key = function(){
    console.log('last_key');
  };

  var last_value = function(){
    console.log('last_value');
  };

  var keys = function(){
    console.log('keys');
  };

  var map = function(){
    console.log('map');
  };

  var occurence = function(){
    console.log('occurence');
  };

  return {
    get: get,
    first: first,
    first_key: first_key,
    first_value: first_value,
    last: last,
    last_key: last_key,
    last_value: last_value,
    keys: keys,
    map: map,
    occurence: occurence
  }
}

//var IteratorAdapter = AppModel.adapter(new IteratorMethods());
module.exports = Iterator;
