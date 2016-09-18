// -------------------------------
// Dependencies: [Lodash]
// -------------------------------
// Lodash Extension Methods (YAY)
// -------------------------------
_.last = function(obj) {
  var keys = _.keys(obj);
  return obj[keys[keys.length-1]];
}
_.first = function(obj) {
  var keys = _.keys(obj);
  return obj[keys[0]];
}
_.objByKey = function(obj, key) {
  var keys = _.keys(obj);
  return obj[keys[key]];
}
_.try = function(obj, dotpath) {
  var last_value = obj;
  var path_arr = dotpath.split(".");
  for (var i = 0; i < path_arr.length; i++) {
    if(last_value[path_arr[i]] != undefined) {
      last_value = last_value[path_arr[i]];
    } else {
      return undefined;
    }
  }
  return last_value;
}
