- first_value
- last_value
- map
- get
- first_key
- last_key
- first
- last
- occurence

var heroes = resultset_instance.get('_setup/heroes');
var rounds = resultset_instance.get('rounds');
var actions_array = rounds.last_value().map('summoned_id');

if(rounds == null) {
  return self.build_action_json("active_turn", {
    hero_id: heroes.first_key()
  })
}

var remaining_turns = actions_array.intersect(heroes.keys());

if(actions_array.occurences(actions_array.last()) < config.get('General.maxActions')) {
  json_response = self.build_action_json("active_turn", {
    hero_id: actions_array.last(),
    round_id: rounds.last_key()
  });
} else {
  if(remaining_turns.is_empty()) {
    json_response = self.build_action_json("active_turn", {
      hero_id: heroes.first_key()
    });
  } else {
    json_response = self.build_action_json("active_turn", {
      hero_id: remaining_turns.first(),
      round_id: rounds.last_key()
    });
  }
}

return json_response;
