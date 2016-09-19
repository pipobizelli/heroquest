var GameHud = function() {

  this.update_player_board = function(state) {
    if(!_.isEmpty(_.try(state.session_data, "_setup.heroes"))) {
      if(_.objByKey(state.session_data._setup.heroes,0)) {
        $(".player-slot-1 h2").text(_.objByKey(state.session_data._setup.heroes,0).account.email || "Slot 1");
      } else {
        $(".player-slot-1 h2").text("Slot 1")
      }
      if(_.objByKey(state.session_data._setup.heroes,1)) {
        $(".player-slot-2 h2").text(_.objByKey(state.session_data._setup.heroes,1).account.email || "Slot 2");
      } else {
        $(".player-slot-2 h2").text("Slot 2")
      }
    } else {
      $(".player-slot-1 h2").text("Slot 1")
      $(".player-slot-2 h2").text("Slot 2")
    }

    $(".player-slot-1").toggleClass("slot-taken",state.toggle_slot_1);
    $(".player-slot-2").toggleClass("slot-taken",state.toggle_slot_2);
  }

  this.toggle_turn_modal = function(state) {
    if(state.turn != state.hero_id) {
      $('.modal_turn').show();
    } else {
      $('.modal_turn').hide();
    }
  }

  return {
    update_player_board:this.update_player_board,
    update_turn_modal:this.toggle_turn_modal
  }
}
