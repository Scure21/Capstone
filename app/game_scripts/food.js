import { scl, randomVector } from './utils'

export default function Food (p, scl) {
  this.vec = p.randomVector().mult(scl)
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
  this.vec = p.randomVector().mult(this.scl)
}
