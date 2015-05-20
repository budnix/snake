
define('app/game', ['app/core', 'app/snake', 'app/apple'], function(core, Snake, Apple) {

  function Game() {

    var
      _el = null, _ctx = null,
      _timer, _player, _apple,
      d = document, w = window,

      _initEvents, _onKeyDown, _loop, _isEatApple, _renderWelcome, _gameOver;


    this.init = function() {
      _el = core.$('snake');
      _ctx = _el.getContext('2d');

      _renderWelcome();
      _player = new Snake(this);
      _apple = new Apple(this);
      _initEvents.call(this, arguments);
    };

    this.start = function() {
      if (_timer) {
        return;
      }
      _player.reset();
      _timer = setInterval(_loop, 100);
    };

    this.stop = function() {
      clearInterval(_timer);
      _timer = null;
    };

    this.getContext = function() {
      return _ctx;
    };

    this.getWidth = function() {
      return _el.width;
    };

    this.getHeight = function() {
      return _el.height;
    };

    _onKeyDown = function(event) {
      switch (event.keyCode) {
        case 38:
          _player.moveUp();
          break;
        case 39:
          _player.moveRight();
          break;
        case 40:
          _player.moveDown();
          break;
        case 37:
          _player.moveLeft();
          break;
        default:
          break;
      }
    }.bind(this);

    _initEvents = function() {
      d.addEventListener('keydown', _onKeyDown, false);
    }.bind(this);

    _renderWelcome = function() {
      _ctx.fillStyle = "rgb(166, 166, 166)";
      _ctx.font = "24pt Helvetica";
      _ctx.textAlign = "center";
      _ctx.fillText("Click to start", _el.width / 2, _el.height / 2);
    };

    _gameOver = function() {
      _ctx.fillStyle = "rgb(166, 166, 166)";
      _ctx.font = "24pt Helvetica";
      _ctx.textAlign = "center";
      _ctx.fillText("Game over", _el.width / 2, _el.height / 2);
    };

    _isEatApple = function() {
      return _player.getPosition().x == _apple.getPosition().x &&
          _player.getPosition().y == _apple.getPosition().y;
    };

    _loop = function() {
      _ctx.clearRect(0, 0, _el.width, _el.height);
      _player.render();

      if (_isEatApple()) {
        _apple.randomCoordinates();
        _player.appendElement();
      }
      _apple.render();

      if (_player.isHitWall() || _player.isDetectCollision()) {
        _gameOver();
        this.stop();
      }
    }.bind(this);

    if (this instanceof Game) {
      this.init.apply(this, arguments);
    }
  }

  return Game;
});