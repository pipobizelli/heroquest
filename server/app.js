const RESOURCE_NOT_FOUND_ERROR = "RESOURCE_NOT_FOUND";
const NO_SLOTS_ERROR = "NO_SLOTS_ERROR";
const INVALID_EMAIL_ERROR = "INVALID_EMAIL_ERROR";
const EMAIL_ALREADY_CONNECTED_ERROR = "EMAIL_ALREADY_CONNECTED_ERROR";
const MAX_SLOTS = 2;
const MAX_ACTIONS = 2;

var __ = require('lodash');
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

function set_headers(res) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
  // res.header('Content-Type', 'application/javascript');
}

function build_action_json(action, data) {
  return {
    "action": {
      "name": action,
      "data": data || {}
    }
  }
}


function call_create_round(session_id) {
  return db.child('/sessions').child(session_id || "missigno").once('value').then(function(snapshot) {
    if(snapshot.val() == null) {
      throw(RESOURCE_NOT_FOUND_ERROR);
    }
    return snapshot;

  }).then(function(snapshot) {
    var roundref = db.child('sessions').child(session_id).child("rounds").push();
    var roundkey = roundref.key;

    var turnref = db
      .child('sessions')
        .child(session_id)
          .child("rounds")
            .child(roundkey).push();

    turnref.set({
      "summoned_id": __.keys(snapshot.child("_setup/heroes").val())[0],
      "position": __.values(snapshot.child("_setup/heroes").val())[0].starting_tile,
    })

    return snapshot;

  }).then(function(snapshot) {
    return db.child('/sessions').child(session_id || "missigno").once('value').then(function(snapshot) {
      if(snapshot.val() == null) {
        throw(RESOURCE_NOT_FOUND_ERROR);
      }
      return snapshot;
    }).then(function(snapshot) {
      return build_action_json("turn", snapshot.val());
    })
  }).catch(function(error) {
    if(error == RESOURCE_NOT_FOUND_ERROR) {
      return build_error_json(0, "Resource was not found");
    } else {
      return build_error_json(999, ["An unknown error occured (",error,")"].join(''));
    }
  });
}

// @TODO - Salvar ID do turno ativo para economizar trafego de rede
function call_active_action(session_id) {
  var json_response;

  return db.child('/sessions').child(session_id || "missigno").once('value').then(function(snapshot) {
    if(snapshot.val() == null) {
      throw(RESOURCE_NOT_FOUND_ERROR);
    }
    return snapshot;
  }).then(function(snapshot) {
    var heroes = snapshot.child("_setup/heroes").val();
    var rounds = snapshot.child("rounds").val();
    var last_round = __.values(rounds)[snapshot.child("rounds").numChildren()-1];

    var heroes_array = __.keys(heroes);

    var actions_array = __.map(__.values(last_round), function(obj) {
      return obj.summoned_id;
    })

    var last_hero_id = __.last(actions_array);

    var total_actions_last_hero = __.filter(actions_array, function(hero_id) {
      return hero_id == last_hero_id;
    }).length;

    var remaining_turns = __.xor(heroes_array, actions_array);

    if(total_actions_last_hero < MAX_ACTIONS) {
      json_response = build_action_json("active_turn", {
        hero_id: last_hero_id
      });
    } else {
      if(__.isEmpty(remaining_turns)) {
        call_create_round(session_id);
        json_response = build_action_json("waiting_new_round", {});
      } else {
        json_response = build_action_json("active_turn", {
          hero_id: __.first(remaining_turns)
        });
      }
    }

    return json_response;
  })
}


// Create Session
app.post('/session', function(req, res) {
  set_headers(res);
  console.log('Creating session...');
  var pushref = db.child('sessions').push();
  pushref.set({
    "created_at": (new Date()).toString()
  });

  res.send(pushref.key);
});

// Retrieve Session
app.get('/session/:session_id', function(req, res) {
  set_headers(res);

  console.log("Retrieving Session...");
  db.child('/sessions').child(req.params.session_id || "missigno").once('value').then(function(snapshot) {
    if(snapshot.val() == null) {
      throw(RESOURCE_NOT_FOUND_ERROR);
    }
    return snapshot;
  }).then(function(snapshot) {
    res.send(build_action_json("update_session", snapshot.val()));
  }).catch(function(error) {
    if(error == RESOURCE_NOT_FOUND_ERROR) {
      res.send(build_error_json(0, "Resource was not found"));
    } else {
      res.send(build_error_json(999, ["An unknown error occured (",error,")"].join('')))
    }
  })
})

// Join Session
app.get('/session/:session_id/join', function(req, res) {
  set_headers(res);

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
    if(snapshot.child('_setup/heroes').numChildren() < MAX_SLOTS) {

      if(__.find(__.values(snapshot.child('_setup/heroes').val()), function(obj) {
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
    }, function(error) {
      //@TODO: Find a way to return the DataSnapshot aftersave
      db.child('/sessions').child(req.params.session_id || "missigno").once('value').then(function(snapshot) {
        res.send(build_action_json("account_joined", snapshot.val()))
      });
    });

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

// Session is ready?
// To-Do
// 1 - retrieve session
// 2 - know required slots
// 3 - validate if required slots == actual slots
// 4 - give an error message if slots were not fullfilled
app.get('/session/:session_id/ready', function(req, res) {
  console.log('Is the session ready?');
  set_headers(res);

  db.child('/sessions').child(req.params.session_id || "missigno").once('value').then(function(snapshot) {
    if(snapshot.val() == null) {
      throw(RESOURCE_NOT_FOUND_ERROR);
    }
    return snapshot;
  }).then(function(snapshot) {

    if(snapshot.child('_setup/heroes').numChildren() == MAX_SLOTS) {
      res.send(build_action_json("start_game"));
    } else {
      res.send(build_action_json("waiting_quorum"));
    }

  }).catch(function(error) {
    if(error == RESOURCE_NOT_FOUND_ERROR) {
      res.send(build_error_json(0, "Resource was not found"));
    } else {
      res.send(build_error_json(999, ["An unknown error occured (",error,")"].join('')))
    }
  });
});

// <turno ativo> <-> <acao do turno> <-> <fim do turno>
//
// - como o server sabe qual é o turno ativo?
// - como o server sabe que você não fez sua ação?
// - como o server sabe que você já fez sua ação?
// - como o server sabe quando uma nova rodada deve começar?
// ---------
// Ações
// - Se não tem nenhum turno, então o server cria o primeiro turno
// e associa o setup_hero_0 para efetuar a primeira ação
// -
// 1 - criar o Round
// 2 - criar o turno com o primeiro heroi do setup
// 3 - devolver os rounds
app.post('/session/:session_id/turn_start', function(req, res) {
  set_headers(res);
  call_create_round(req.params.session_id || "missigno").then(function(json_response) {
    res.send(json_response);
  });
});


// Turn
// Deve saber qual é o turno ativo atualmente
app.get('/session/:session_id/turn', function(req, res) {
  set_headers(res);
  call_active_action(req.params.session_id || "missigno").then(function(json_response) {
    res.send(json_response);
  });
});

app.get('/session/turn/finish', function(req, res) {
  res.send('Finish your turn...')
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
