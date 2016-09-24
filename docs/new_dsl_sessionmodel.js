// session = <...>

if(session.turn().has_turn()) {
  active_hero_id = session.first_hero();
  active_round_id = null;
} else {
  if(session.turn().last_played_has_actions()) {
    active_hero_id = session.turn().last_played();
    active_round_id = session.turn().last_round();
  } else {
    active_hero_id = session.next_hero();
    active_round_id = session.turn().last_round();
  }
}

return self.build_action_json("active_turn", {
  hero_id: active_hero_id,
  round_id: active_round_id
});;