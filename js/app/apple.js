
define(function() {

  function Apple() {

    var
      _ctx,
      _canvasWidth, _canvasHeight,
      _x = 0, _y = 0,
      _alpha = 0.9,
      _size = 10;

    this.init = function(game, size) {
      _ctx = game.getContext();
      _canvasWidth = game.getWidth();
      _canvasHeight = game.getHeight();
      _size = size || _size;
      this.randomCoordinates();
    };

    this.render = function() {
      _ctx.fillStyle = "rgba(255,0,0," + _alpha + ")";
      _ctx.fillRect(_x, _y, _size, _size);
      _ctx.strokeStyle = "rgba(255,255,255,1)";
      _ctx.strokeRect(_x, _y, _size, _size);
    };

    this.randomCoordinates = function() {
      var
        rangeX = _canvasWidth / _size,
        rangeY = _canvasHeight / _size;

      _x = (Math.random() * rangeX >> 0) * _size;
      _y = (Math.random() * rangeY >> 0) * _size;
    };

    this.getPosition = function() {
      return {
        x: _x,
        y: _y
      }
    };

    this.getSize = function() {
      return _size;
    };

    this.setAlpha = function(alpha) {
      _alpha = alpha;
    };

    if (this instanceof Apple) {
      this.init.apply(this, arguments);
    }
  }

  return Apple;
});