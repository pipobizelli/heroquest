var GridMovement = function(tile_dimension, tile_quantity) {
  var dimension_array, quantity_array;

  this.init = function(tile_dimension, tile_quantity) {
    dimension_array = tile_dimension.split("x");
    quantity_array = tile_quantity.split("x");
  }

  this.move = function(sprite, x, y) {
    sprite.x = x*dimension_array[0];
    sprite.y = y*dimension_array[1];
  }

  this.get_position = function(sprite) {
    var pos_x = sprite.x/dimension_array[0];
    var pos_y = sprite.y/dimension_array[1];
    return [pos_x, pos_y];
  }

  this.move_increment = function(sprite, inc_x, inc_y) {
    var position_array = this.get_position(sprite);
    var destination_array = [position_array[0]+inc_x, position_array[1]+inc_y];
    this.move(sprite, destination_array[0], destination_array[1]);
  }

  this.move_down = function(sprite) {
    this.move_increment(sprite, 0,+1);
  }

  this.move_left = function(sprite) {
    this.move_increment(sprite, -1,0);
  }

  this.move_right = function(sprite) {
    this.move_increment(sprite, +1,0);
  }

  this.move_up = function(sprite) {
    this.move_increment(sprite, 0,-1);
  }

  this.init(tile_dimension, tile_quantity);

  return {
    move: this.move,
    move_increment: this.move_increment,
    get_position: this.get_position,
    move_down: this.move_down,
    move_up: this.move_up,
    move_left: this.move_left,
    move_right: this.move_right
  }
}
