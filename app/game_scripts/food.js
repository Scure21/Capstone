import { scl, utils } from './utils'


// CW --- not sure what this code does?  You will need to draw the food on the gameboard on the front end,
// but the logic -- where to generate it, where it is, how the snake interacts with it (ie, gets points, grows bigger, etc) -- can all be in the server code.  

// the server side code can be the "brain."  the browser code just needs to 1) submit playerMoves (for mobile devices) and 2) render the current game board state (projector-computer) including possibly animations (when snake eats food, when snakes collide ... )


export default function Food (p) {
  this.vec = utils.randomVector(p).mult(scl)
  this.scl = scl
}

Food.prototype.x = function () {
  return this.vec.x
}

Food.prototype.y = function () {
  return this.vec.y
}

Food.prototype.draw = function (p) {
  p.fill(255, 0, 100)
  p.rect(this.x(), this.y(), this.scl, this.scl)
}

Food.prototype.eaten = function (p) {
  this.vec = utils.randomVector(p).mult(this.scl)
}
