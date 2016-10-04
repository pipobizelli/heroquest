const __ = require('lodash');

var Iterator = function(obj) {

  var _obj = obj || {};

  var _get = function(path) {
    var url = path.split('/'),
        node = {};

    url.forEach(function(v, k){
      node = node[v] || obj[v];
    });

    _obj = node;
    return new Iterator(_obj);
  };

  var _first = function(){
    console.log('first');
  };

  var _first_key = function(){
    console.log('first_key');
  };

  var _first_value = function(){
    console.log('first_value');
  };

  var _last = function() {
    console.log('last');
  };

  var _last_key = function(){
    console.log('last_key');
  };

  var _last_value = function(){
    var length = __.values(_obj).length-1,
        last = __.values(_obj)[length];
      
    _obj = last;
    return this;
  };

  var _keys = function(){
    console.log('keys');
  };

  var _map = function(index){
    var arr = __.map(_obj, function(obj) {
      return obj[index];
    });

    _obj = arr;
    return this;
  };

  var _occurence = function(){
    console.log('occurence');
  };

  /* END of methods chain */
  var _val = function(){
    return _obj;
  };

  return {
    get: _get,
    first: _first,
    first_key: _first_key,
    first_value: _first_value,
    last: _last,
    last_key: _last_key,
    last_value: _last_value,
    keys: _keys,
    map: _map,
    occurence: _occurence,
    val: _val
  }
}

module.exports = Iterator;
