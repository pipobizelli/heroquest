const config = require('config'),
			firebase = require('firebase');

let Main = Object.assign({}, {
	
	db: function() {
		return firebase.database().ref('/');
	},

	build_error_json: function(code, description) {
	  return {
	    "error": {
	      "code": code,
	      "description": description
	    }
	  }
	},

	set_headers: function(res) {
	  res.header('Access-Control-Allow-Origin', config.get('General.header'));
	},

	build_action_json: function(action, data) {
	  return {
	    "action": {
	      "name": action,
	      "data": data || {}
	    }
	  }
	}
});

module.exports = Main;