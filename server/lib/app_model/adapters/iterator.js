const __ = require('lodash');

var Iterator = function(obj) {

  var _obj = obj || {},
      _origin = obj || {};

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
    var k = __.keys(_obj)[0]
        o = {};
    
    o[k] = _obj[k];
    
    _obj = o;
    return this;
  };

  var _first_key = function(){
    return __.keys(_obj)[0];
  };

  var _first_value = function(){
    var first = __.values(_obj)[0];
      
    _obj = first;
    return this;
  };

  var _last = function() {
    var keys = __.keys(_obj),
        i = keys.length-1,
        k = __.keys(_obj)[i],
        o = {};
    
    o[k] = _obj[k];

    _obj = o;
    return this;
  };

  var _last_key = function(){
    var keys = __.keys(_obj),
        end = keys.length-1;

    return keys[end];
  };

  var _last_value = function(){
    var length = __.values(_obj).length-1,
        last = __.values(_obj)[length];
      
    _obj = last;
    return this;
  };

  var _keys = function(){
    var keys = __.keys(_obj);
      
    _obj = keys;
    return this;
  };

  var _map = function(index){
    var arr = __.map(_obj, function(obj) {
      return obj[index];
    });

    _obj = arr;
    return this;
  };

  var _is_empty = function(){
    return __.isEmpty(_obj);
  };

  var _occurence = function(){
    console.log('occurence');
  };

  /* END of methods chain */
  var _val = function(){
    if(_obj !== _origin) {
      var act = _obj;
      _obj = _origin;
      return act;
    }

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
    is_empty: _is_empty,
    occurence: _occurence,
    val: _val
  }
}

module.exports = Iterator;
