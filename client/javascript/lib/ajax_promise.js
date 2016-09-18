// -------------------------------
// Dependencies: [RSVP, Zepto]
// -------------------------------
// Initialize proper Promises
// -------------------------------
var AjaxPromise = function() {
  this.get = function(url, params) {
    var promise = new RSVP.Promise(function(resolve, reject) {
      $.ajax({type: 'GET',url: url,data: params,
        success: function(data, textStatus, jqXHR) {
          resolve(data);
        },
        error: function(jqXHR, textStatus, errorThrown) {
          reject(errorThrown);
        }
      });
    });

    return promise;
  }

  this.post = function(url, params) {
    var promise = new RSVP.Promise(function(resolve, reject) {
      $.ajax({type: 'POST',url: url,data: params,
        success: function(data, textStatus, jqXHR) {
          resolve(data);
        },
        error: function(jqXHR, textStatus, errorThrown) {
          reject(errorThrown);
        }
      });
    });

    return promise;
  }

  return {
    get:this.get,
    post: this.post
  }
}
window.ajax = new AjaxPromise();
