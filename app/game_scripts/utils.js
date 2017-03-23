

export const scl = 20

export const randomVector = {
  cols: function (p) {
    return p.floor(p.width / scl)
  },

  rows: function (p) {
    return p.floor(p.height / scl)
  },

  randomVector: function (p) {
    return p.createVector(p.floor(p.random(this.cols())), p.floor(p.random(this.rows())))
  }
}
