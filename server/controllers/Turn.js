const config = require('config'),
    	__ = require('lodash'),
			Main = require('./Main');

let Turn = Object.assign({}, Main, {

	// @TODO - Salvar ID do turno ativo para economizar trafego de rede
	active_action: function(session_id) {
	  var json_response;
	  var self = this;

	  return this.db().child('/sessions').child(session_id || "missigno").once('value').then(function(snapshot) {
	    if(snapshot.val() == null) {
	      throw(config.get('Errors.notFound'));
	    }
	    return snapshot;
	  }).then(function(snapshot) {
	    var heroes = snapshot.child("_setup/heroes").val();
	    var rounds = snapshot.child("rounds").val();
	    var last_round = __.values(rounds)[snapshot.child("rounds").numChildren()-1];

	    // Usado nos métodos de validação de action
	    var last_round_id = __.keys(rounds)[snapshot.child("rounds").numChildren()-1];
	    var heroes_array = __.keys(heroes);

	    var actions_array = __.map(__.values(last_round), function(obj) {
	      return obj.summoned_id;
	    })

	    if(rounds == null) {
	      // call_create_round(session_id);
	      return self.build_action_json("active_turn", {
	        hero_id: __.keys(heroes)[0]
	      });
	    }

	    var last_hero_id = __.last(actions_array);

	    var total_actions_last_hero = __.filter(actions_array, function(hero_id) {
	      return hero_id == last_hero_id;
	    }).length;

	    var remaining_turns = __.xor(heroes_array, actions_array);

	    if(total_actions_last_hero < config.get('General.maxActions')) {
	      json_response = self.build_action_json("active_turn", {
	        hero_id: last_hero_id,
	        round_id: last_round_id
	      });
	    } else {
	      if(__.isEmpty(remaining_turns)) {
	        // call_create_round(session_id);
	        json_response = self.build_action_json("active_turn", {
	          hero_id: __.keys(heroes)[0]
	        });
	      } else {
	        json_response = self.build_action_json("active_turn", {
	          hero_id: __.first(remaining_turns),
	          round_id: last_round_id
	        });
	      }
	    }

	    return json_response;
	  })
	},
	
	get: function(req, res) {
		this.set_headers(res);
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
		//
		// Turn
		// Deve saber qual é o turno ativo atualmente
	  this.active_action(req.params.session_id || "missigno").then(function(json_response) {
	    res.send(json_response);
	  });
	},

	set_action: function(req, res){
		var self = this;

		this.active_action(req.params.session_id || "missigno").then(function(json_response) {
	    var roundkey;

	    if(__.isEmpty(json_response.action.data)) {
	      res.send(json_response);
	    } else {
	      if(req.params.thing_id == json_response.action.data.hero_id) {
	        if(json_response.action.data.round_id) {
	          roundkey = json_response.action.data.round_id;
	        } else {
	          var roundref = self.db().child('sessions').child(req.params.session_id).child("rounds").push();
	          roundkey = roundref.key;
	        }
	        var pushref = self.db()
	          .child('sessions')
	          .child(req.params.session_id)
	          .child('rounds')
	          .child(roundkey).push();

	        var action_object = {
	          position: req.params.position || "1,1",
	          summoned_id: json_response.action.data.hero_id,
	          action_type: req.params.action_type
	        };

	        pushref.set(action_object);
	        res.send(self.build_action_json("action_saved", action_object));

	      } else {
	        res.send(self.build_error_json(666, "Não vem hackear aqui não!"));
	      }
	    }

	  }).catch(function(error) {
	    console.log(error);
	  })
	}
});

module.exports = Turn;