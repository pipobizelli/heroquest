var colors = require('colors');
var AppModel = require('app_model');

var Session = AppModel.extend({
  path: 'sessions',
  attributes: {

  },
  methods: {
    first_hero: function() {
      console.log("first_hero");
    },
    next_hero: function() {
      console.log("next_hero" );
    },
    turn: function() {
      return {
        last_played_has_actions: function() {
          console.log("last_played_has_actions");
        },
        last_played: function() {
          console.log("last_played");
        },
        last_round: function() {
          console.log("last_round");
        },
        has_turn: function() {
          console.log("has_turn");
        }
      }
    }
  }
});

module.exports = Session;



// console.log("================================".green)
// console.log("UNIT TESTS".green);
// console.log("================================".green)
//
// console.log("1. Method find must exists".cyan)
// console.log(typeof(Session.find) == "function");
//
// console.log("2. Method find must know about path defined in model".cyan)
// console.log(Session.find() == "sessions");
// console.log("================================".green)
//
// Model.SetupHeroes = AppModel.extend({
//   path: 'session.{{id}}._setup.heroes'
// })
//
// Model.TurnAction = AppModel.extend({
//   path: 'session.{{session_id}}.rounds.{{rounds_id}}',
//
//
//   active_turn: function() {
//     var heroes = resultset_instance.get('_setup/heroes');
//     var rounds = resultset_instance.get('rounds');
//     var actions_array = rounds.last_value().map('summoned_id');
//
//     if(rounds == null) {
//       return self.build_action_json("active_turn", {
//         hero_id: heroes.first_key()
//       })
//     }
//
//     var remaining_turns = actions_array.intersect(heroes.keys());
//
//     if(actions_array.occurences(actions_array.last()) < config.get('General.maxActions')) {
//       json_response = self.build_action_json("active_turn", {
//         hero_id: actions_array.last(),
//         round_id: rounds.last_key()
//       });
//     } else {
//       if(remaining_turns.is_empty()) {
//         json_response = self.build_action_json("active_turn", {
//           hero_id: heroes.first_key()
//         });
//       } else {
//         json_response = self.build_action_json("active_turn", {
//           hero_id: remaining_turns.first(),
//           round_id: rounds.last_key()
//         });
//       }
//     }
//   }
// })
//
//
//
// Model.Session.find("session_id").then(function(resultset_instance) {
//   resultset_instance.get('created_at/heroes')
// })
//
//
// Model.Session.create({
//   created_at: (new Date()).toString()
// }).then(function(key) {
//   res.send(key)
// })
//
// Model.SetupHero.create("session_id", {
//
// })
//
// Model.TurnAction.create("session_id", "round_id", {
//   type: 'asd'
// })
//
//
