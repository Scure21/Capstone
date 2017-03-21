export default function Food(p, scl) {
  this.vec = p.randomVector().mult(scl);

  this.x = function() {
    return this.vec.x;
  }

  this.y = function() {
    return this.vec.y;
  }

  this.draw = function() {
    p.fill(255, 0, 100);
    p.rect(this.x(), this.y(), scl, scl);
  }

  this.eaten = function() {
    console.log("****", arguments)
    this.vec = p.randomVector().mult(scl);
  }
}
