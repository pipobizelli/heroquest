const RESOURCE_NOT_FOUND_ERROR = "RESOURCE_NOT_FOUND"
const NO_SLOTS_ERROR = "NO_SLOTS_ERROR"
const INVALID_EMAIL_ERROR = "INVALID_EMAIL_ERROR"
const EMAIL_ALREADY_CONNECTED_ERROR = "EMAIL_ALREADY_CONNECTED_ERROR"

var _ = require('lodash');
var validator = require('validator');
var express = require('express');
var app = express();

var firebase = require('firebase');
firebase.initializeApp({
  databaseURL: "https://heroquest-ca81f.firebaseio.com"
});
var db = firebase.database().ref('/');

function build_error_json(code, description) {
  return {
    "error": {
      "code": code,
      "description": description
    }
  }
}


// Create Session
app.post('/session', function(req, res) {
  console.log('Creating session...');
  var pushref = db.child('sessions').push();
  pushref.set({
    "created_at": (new Date()).toString()
  });

  res.send(pushref.key);
});



// Connect user to session
// req.params.session_id
// 1 - retrieve the whole session
// 2 - return a json
// rules
// - session must exist
// -
// app.get('/session/:session_id/connect', function (req, res, next) {
//
//   db.child('/sessions').child(req.params.session_id || "missigno").once('value').then(function(snapshot) {
//     console.log("STEP 1 - WE MUST DO SOMETHING");
//     if(snapshot.val() == null) {
//       throw(RESOURCE_NOT_FOUND_ERROR)
//     }
//     req.somevar = 123;
//     return snapshot.val();
//   }).then(function(result) {
//     console.log("STEP 2 - NOW ITS THE TIME!");
//     console.log(result);
//     next();
//   }).catch(function(error) {
//     if(error == RESOURCE_NOT_FOUND_ERROR) {
//       res.send({
//         "error": {
//           "code": 0,
//           "description": "Resource was not found"
//         }
//       })
//     }
//     console.log("WE FOUND AN ERROR!");
//     console.log(error);
//
//   });
// },function(req, res) {
//   console.log("Var value = " + req.somevar);
//   res.send('123');
// });
// app.get('/session/:session_id/connect', function (req, res, next) {
//
//   db.child('/sessions').child(req.params.session_id || "missigno").once('value').then(function(snapshot) {
//     console.log("STEP 1 - WE MUST DO SOMETHING");
//     if(snapshot.val() == null) {
//       throw(RESOURCE_NOT_FOUND_ERROR)
//     }
//     req.somevar = 123;
//     return snapshot.val();
//   }).then(function(result) {
//     console.log("STEP 2 - NOW ITS THE TIME!");
//     console.log(result);
//     next();
//   }).catch(function(error) {
//     if(error == RESOURCE_NOT_FOUND_ERROR) {
//       res.send({
//         "error": {
//           "code": 0,
//           "description": "Resource was not found"
//         }
//       })
//     }
//     console.log("WE FOUND AN ERROR!");
//     console.log(error);
//
//   });
// },function(req, res) {
//   console.log("Var value = " + req.somevar);
//   res.send('123');
// });


app.get('/session/:session_id/join', function(req, res) {
  var max_slots = 2;
  // 1 - retrieve the whole session
  // 2 - add user to slot
  // 3 - return a session json
  // rules
  // - session must exist
  // - session must have empty slots remaining
  // - the user must provide an e-mail
  // - the user cannot connect twice with the same e-mail account
  db.child('/sessions').child(req.params.session_id || "missigno").once('value').then(function(snapshot) {
    // ------------------------------
    // 1 - Validating request params
    // ------------------------------
    if(snapshot.val() == null) {
      throw(RESOURCE_NOT_FOUND_ERROR);
    }
    if(!validator.isEmail(req.query.email || "")) {
      throw(INVALID_EMAIL_ERROR);
    }
    return snapshot;
  }).then(function(snapshot) {
    // ------------------------------
    // 2 - Validating business rules
    // ------------------------------
    if(snapshot.child('_setup/heroes').numChildren() < max_slots) {

      if(_.find(_.values(snapshot.child('_setup/heroes').val()), function(obj) {
        return (obj.account.email == req.query.email);
      }) != undefined) {
        throw(EMAIL_ALREADY_CONNECTED_ERROR);
      } else {
        return snapshot;
      }

    } else {
      throw(NO_SLOTS_ERROR);
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
    });
    res.send(snapshot.val());
  }).catch(function(error) {
    // ------------------------------
    // 4 - Error management
    // ------------------------------
    if(error == RESOURCE_NOT_FOUND_ERROR) {
      res.send(build_error_json(0, "Resource was not found"));
    } else if(error == NO_SLOTS_ERROR) {
      res.send(build_error_json(1, "There are no slots available for this Session"));
    } else if(error == INVALID_EMAIL_ERROR) {
      res.send(build_error_json(2, "You must inform an e-mail to connect to a session"));
    } else if(error == EMAIL_ALREADY_CONNECTED_ERROR) {
      res.send(build_error_json(3, "Your account is already connected to this Session. Try to logout."));
    } else {
      res.send(build_error_json(999, ["An unknown error occured (",error,")"].join('')))
    }
  });
});

app.get('/session/ready', function(req, res) {
  res.send('Is the session ready?');
});

app.get('/session/turn', function(req, res) {
  res.send('Checking if is your turn...')
});

app.get('/session/turn/start', function(req, res) {
  res.send('Starting your turn...')
});

app.get('/session/turn/finish', function(req, res) {
  res.send('Finish your turn...')
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
