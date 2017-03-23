import { scl, utils } from './utils'

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
