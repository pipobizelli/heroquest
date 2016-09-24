const __ = require('lodash');

var Iterator = function(obj) {

  this.obj = obj || {};

  this.get = function(path) {
    var url = path.split('/'),
        node;

    url.forEach(function(v, k){
      node = node[v] || this.obj[v];
    });

    console.log(node);
    //return node;
  };

  this.first = function(){
    console.log('first');
  };

  this.first_key = function(){
    console.log('first_key');
  };

  this.first_value = function(){
    console.log('first_value');
  };

  this.last = function() {
    console.log('last');
  };

  this.last_key = function(){
    console.log('last_key');
  };

  this.last_value = function(){
    console.log('last_value');
  };

  this.keys = function(){
    console.log('keys');
  };

  this.map = function(){
    console.log('map');
  };

  this.occurence = function(){
    console.log('occurence');
  };

  return {
    get: this.get,
    first: this.first,
    first_key: this.first_key,
    first_value: this.first_value,
    last: this.last,
    last_key: this.last_key,
    last_value: this.last_value,
    keys: this.keys,
    map: this.map,
    occurence: this.occurence
  }
}

//var IteratorAdapter = AppModel.adapter(new IteratorMethods());
module.exports = new Iterator(obj);

