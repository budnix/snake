
define(function() {

  function SnakeElement() {

    var
      _ctx,
      _dir = 'r',
      _x = 0, _y = 0,
      _alpha = 1,
      _size = 10;

    this.init = function(ctx, size) {
      _ctx = ctx;
      _size = size || _size;
    };

    this.render = function() {
      _ctx.fillStyle = "rgba(0,0,0," + _alpha + ")";
      _ctx.fillRect(_x, _y, _size, _size);
      _ctx.strokeStyle = "rgba(255,255,255,1)";
      _ctx.strokeRect(_x, _y, _size, _size);
    };

    this.link = function(element) {
      var size, pos, dir;

      size = element.getSize();
      pos = element.getPosition();
      dir = element.getDirection();

      this.setDirection(dir);

      if (dir === 'r') {
        this.setPosition(pos.x - size, pos.y);

      } else if (dir === 'l') {
        this.setPosition(pos.x + size, pos.y);

      } else if (dir === 'u') {
        this.setPosition(pos.x, pos.y + size);

      } else if (dir === 'd') {
        this.setPosition(pos.x, pos.y - size);
      }
    };

    this.getPosition = function() {
      return {
        x: _x,
        y: _y
      }
    };

    this.setPosition = function(x, y) {
      _x = x;
      _y = y;
    };

    this.getSize = function() {
      return _size;
    };

    this.setAlpha = function(alpha) {
      _alpha = alpha;
    };

    this.getAlpha = function() {
      return _alpha;
    };

    this.getDirection = function() {
      return _dir;
    };

    this.setDirection = function(dir) {
      _dir = dir;

      return this;
    };

    if (this instanceof SnakeElement) {
      this.init.apply(this, arguments);
    }
  }

  return SnakeElement;
});