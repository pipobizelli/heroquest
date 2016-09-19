// var Model = Model || [];
//
// Model.Session = AppModel.extend({
//   path: 'session'
// });
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
