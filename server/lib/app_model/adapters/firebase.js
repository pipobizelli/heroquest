const __ = require('lodash');

var FirebaseAdapter = function() {

  this.create = function() {
    console.log('create');
  };

  this.find = function(){
    console.log('find');
  };

  this.update = function(){
    console.log('update');
  };

  this.delete = function(){
    console.log('delete');
  };

  this.count = function() {
    console.log('count');
  }

  return {
    create:this.create,
    find:this.find,
    update:this.update,
    delete:this.delete,
    count:this.count
  }
}

module.exports = FirebaseAdapter;
