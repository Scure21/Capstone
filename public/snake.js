function Snake (x, y) {
  if (x && y !== undefined) {
    this.x = x
    this.y = y
  } else {
    const vector = randomVector().mult(scl)
    this.x = vector.x
    this.y = vector.y
  }
  this.xspeed = -1
  this.yspeed = 0
  this.tail = []
  this.points = 0
  this.color = [floor(random(0, 255)), floor(random(0, 255)), floor(random(0, 255))]
}

Snake.prototype.dir = function (x, y) {
  if (x != 0 && this.xspeed != x * (-1) ||
        y != 0 && this.yspeed != y * (-1)) {
    this.xspeed = x
    this.yspeed = y
  }
}

Snake.prototype.eat = function (food) {
  if (this.x === food.x() && this.y === food.y()) {
    food.eaten()
    this.points++
    this.tail.push(createVector(this.x, this.y))
    console.log(this.points + ' points')
  }
}

Snake.prototype.move = function () {
    // put last square of tail in front of the line
  if (this.tail.length > 0) {
    var tipOfTail = this.tail.pop()
    tipOfTail.x = this.x
    tipOfTail.y = this.y
    this.tail.unshift(tipOfTail)
  }

    // move head
  this.x += this.xspeed * scl
  this.y += this.yspeed * scl

    // wrap around right and bottom edges
  this.x %= width
  this.y %= height

    // wrap around left and top edges
  if (this.x < 0) {
    this.x = width - scl
  }
  if (this.y < 0) {
    this.y = height - scl
  }
}

Snake.prototype.draw = function () {
  fill(color(this.color))
  rect(this.x, this.y, scl, scl)
  for (var i = 0; i < this.tail.length; i++) {
    rect(this.tail[i].x, this.tail[i].y, scl, scl)
  }
}
