module.exports = AppModel = function() {

  this.extend = function(model_setup) {
    return new factory_methods(model_setup, {});
  }

  this.factory_methods = function(model_setup, model_data) {
    var custom_methods = model_setup["methods"];

    var base_methods = {
      attributes: function() {
        return model_data;
      },
      create: function(args) {
        console.log(123);
      },
      find: function(args) {

      }
    }

    return Object.assign({}, base_methods, custom_methods);
  }

  return {
    extend: extend
  }
}();
