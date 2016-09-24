var IteratorAdapter = require('./adapters/iterator');
var FirebaseAdapter = require('./adapters/firebase');

var AppModel = function(config) {
  var adapters_array = config["adapters"] || [];

  this.extend = function(model_setup) {
    return new factory_methods(model_setup, {});
  }

  this.factory_methods = function(model_setup, model_data) {
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
    ].concat(adapters_array));
  }

  return {
    extend: this.extend
  }
};

module.exports = AppModel({
  adapters: [
    new IteratorAdapter(),
    new FirebaseAdapter()
  ]
});
