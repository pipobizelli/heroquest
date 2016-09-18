var Controllable = function(game) {
  var chosen_sprite;

  this.delegate = function(sprite) {
    chosen_sprite = sprite;
  }

  this.control = function(action_callback) {
    if(game.input.keyboard.downDuration(Phaser.Keyboard.LEFT, 1)) {
      grid.move_left(chosen_sprite);
      action_callback();
    }
    if(game.input.keyboard.downDuration(Phaser.Keyboard.RIGHT, 1)) {
      grid.move_right(chosen_sprite);
      action_callback();
    }
    if(game.input.keyboard.downDuration(Phaser.Keyboard.UP, 1)) {
      grid.move_up(chosen_sprite);
      action_callback();
    }
    if(game.input.keyboard.downDuration(Phaser.Keyboard.DOWN, 1)) {
      grid.move_down(chosen_sprite);
      action_callback();
    }
  }

  return {
    delegate: this.delegate,
    control: this.control
  }
}
