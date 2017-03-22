import p from 'p5'

export const scl = 20
console.log('THIS IS P IN UTILS', p)
export const randomVector = {
  cols: function () {
    return p.floor(p.width / scl)
  },

  rows: function () {
    return p.floor(p.height / scl)
  },

  randomVector: function () {
    return p.createVector(p.floor(p.random(this.cols())), p.floor(p.random(this.rows())))
  }
}
