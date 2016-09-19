const config = require('config'),
    	__ = require('lodash'),
    	validator = require('validator'),
			Main = require('./Main');

let Session = Object.assign({}, Main, {

	create: function(req, res) {
	  this.set_headers(res);

	  console.log('Creating session...');
	  var pushref = this.db().child('sessions').push();
	  pushref.set({
	    "created_at": (new Date()).toString()
	  });

	  res.send(pushref.key);
	},

	get: function(req, res) {
		this.set_headers(res);
		var self = this;

	  console.log("Retrieving Session...");

	  this.db().child('/sessions').child(req.params.session_id || "missigno").once('value').then(function(snapshot) {
	    if(snapshot.val() == null) {
	      throw(config.get('Errors.notFound'));
	    }
	    return snapshot;
	  }).then(function(snapshot) {
	    res.send(self.build_action_json("update_session", snapshot.val()));
	  }).catch(function(error) {
	    if(error == config.get('Errors.notFound')) {
	      res.send(self.build_error_json(0, config.get('Errors.notFound')));
	    } else {
	      res.send(self.build_error_json(999, ["An unknown error occured (",error,")"].join('')))
	    }
	  })
	},

	join: function(req, res) {
		this.set_headers(res);
		var self = this;

	  // 1 - retrieve the whole session
	  // 2 - add user to slot
	  // 3 - return a session json
	  // rules
	  // - session must exist
	  // - session must have empty slots remaining
	  // - the user must provide an e-mail
	  // - the user cannot connect twice with the same e-mail account
	  this.db().child('/sessions').child(req.params.session_id || "missigno").once('value').then(function(snapshot) {
	    // ------------------------------
	    // 1 - Validating request params
	    // ------------------------------
	    if(snapshot.val() == null) {
	      throw(config.get('Errors.notFound'));
	    }
	    if(!validator.isEmail(req.query.email || "")) {
	      throw(config.get('Errors.invalidEmail'));
	    }
	    return snapshot;
	  }).then(function(snapshot) {
	    // ------------------------------
	    // 2 - Validating business rules
	    // ------------------------------
	    if(snapshot.child('_setup/heroes').numChildren() < config.get('General.maxSlots')) {

	      if(__.find(__.values(snapshot.child('_setup/heroes').val()), function(obj) {
	        return (obj.account.email == req.query.email);
	      }) != undefined) {
	        throw(config.get('Errors.alreadyConnected'));
	      } else {
	        return snapshot;
	      }

	    } else {
	      throw(config.get('Errors.noSlots'));
	    }
	  }).then(function(snapshot) {
	    // ------------------------------
	    // 3 - Executing the happy case
	    // ------------------------------
	    snapshot.child('_setup/heroes').ref.push().set({
	      "starting_tile": "1,1",
	      "account": {
	        "email": req.query.email
	      }
	    }, function(error) {
	      //@TODO: Find a way to return the DataSnapshot aftersave
	      self.db().child('/sessions').child(req.params.session_id || "missigno").once('value').then(function(snapshot) {
	        res.send(self.build_action_json("account_joined", snapshot.val()))
	      });
	    });

	  }).catch(function(error) {
	    // ------------------------------
	    // 4 - Error management
	    // ------------------------------
	    if(error == config.get('Errors.notFound')) {
	      res.send(self.build_error_json(0, "Resource was not found"));
	    } else if(error == config.get('Errors.noSlots')) {
	      res.send(self.build_error_json(1, "There are no slots available for this Session"));
	    } else if(error == config.get('Errors.invalidEmail')) {
	      res.send(self.build_error_json(2, "You must inform an e-mail to connect to a session"));
	    } else if(error == config.get('Errors.alreadyConnected')) {
	      res.send(self.build_error_json(3, "Your account is already connected to this Session. Try to logout."));
	    } else {
	      res.send(self.build_error_json(999, ["An unknown error occured (",error,")"].join('')))
	    }
	  });
	}
});

module.exports = Session;
