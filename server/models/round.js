var AppModel = require('app_model');

var Round = AppModel.extend({
  path: 'sessions/:session_id/rounds',
  methods: {
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
});

module.exports = Round;
