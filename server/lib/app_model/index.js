var IteratorAdapter = require('./adapters/iterator');
var FirebaseAdapter = require('./adapters/firebase');

var AppModel = function(config) {

  this.initialize = function(config) {
    this.instance_adapters_array = config["instance_adapters"] || [];
    this.static_adapters_array = config["static_adapters"] || [];
  }

  this.static_methods = function(config) {
    var base_methods = {
      extend: this.extend,
      get_model_setup: this.get_model_setup
    }

    return Object.assign.apply(this, [
      {},
      base_methods
    ].concat(this.static_adapters_array));
  }

  this.extend = function(model_setup) {
    return function(model_setup) {
      this.model_setup = model_setup;
      return static_methods(config);
    }(model_setup);
  }

  this.get_model_setup = function() {
    return model_setup;
  }

  this.instance_methods = function(model_setup, model_data) {
    var custom_methods = model_setup["methods"];

    var base_methods = {
      attributes: function() {
        return model_data;
      }
    }

    return Object.assign.apply(this, [
      {},
      base_methods,
      custom_methods
    ].concat(this.instance_adapters_array));
  }

  this.initialize(config);

  return {
    extend: this.extend
  }
};

module.exports = AppModel({
  instance_adapters: [
    new IteratorAdapter()
  ],
  static_adapters: [
    new FirebaseAdapter()
  ]
});
