var AppModel = function() {

  this.extend = function(model_setup) {
    return function(model_data) {
      return new factory_methods(model_setup, model_data);
    }
  }

  this.factory_methods = function(model_setup, model_data) {

    var custom_methods = model_setup["methods"];

    var base_methods = {
      get: function(key){
        return model_data[key];
      },
      set: function(key, value) {
        model_data[key] = value;
      },
      attributes: function() {
        return model_data;
      }
    }

    return $.extend(base_methods, custom_methods);
  }

  return {
    extend: extend
  }
}();
