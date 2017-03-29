import { scl, utils } from './utils'

export default function Food (p, fruits) {
  this.img = fruits[Math.floor(Math.random() * fruits.length)]
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
  p.image(this.img, this.x(), this.y(), scl, scl)
}

Food.prototype.eaten = function (p) {
  this.vec = utils.randomVector(p).mult(this.scl)
}
