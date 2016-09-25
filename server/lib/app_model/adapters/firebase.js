const __ = require('lodash');

var FirebaseAdapter = function() {

  var _get_path = function() {
    return get_model_setup().path;
  }

  var _new = function() {
    console.log('new');
  }

  var _create = function() {
    console.log('create');
  };

  var _find = function(){
    return get_path();
  };

  var _update = function(){
    console.log('update');
  };

  var _delete = function(){
    console.log('delete');
  };

  var _count = function() {
    console.log('count');
  }

  return {
    create:_create,
    find:_find,
    update:_update,
    delete:_delete,
    count:_count,
    new:_new
  }
}

module.exports = FirebaseAdapter;
