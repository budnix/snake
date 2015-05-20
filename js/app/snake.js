
define('app/snake', ['app/element'], function(SnakeElement) {

  function Snake() {

    var
      _ctx,
      _defaultLength = 20,
      _defaultX = 20, _defaultY = 1,
      _defaultDir = 'r',
      _step = 10,

      _length = 20,
      _dir,
      _canvasWidth, _canvasHeight,
      _posX, _posY,
      _collision = false,
      _elements = [],
      _brakeMarkers = [],

      _buildElements, _getHeadElement, _renderElements, _move;


    this.init = function(game) {
      _ctx = game.getContext();
      _canvasWidth = game.getWidth();
      _canvasHeight = game.getHeight();
      this.reset();
    };

    this.appendElement = function() {
      var
        element = new SnakeElement(_ctx),
        prev = _elements[_elements.length - 1];

      element.setAlpha(prev.getAlpha());
      element.link(prev);
      _elements.push(element);
    };

    this.render = function() {
      _renderElements();
    };

    this.getPosition = function() {
      return _getHeadElement().getPosition();
    };

    this.reset = function() {
      _elements = [];
      _brakeMarkers = [];
      _posX = _defaultX * _step;
      _posY = _defaultY * _step;
      _collision = false;
      _dir = _defaultDir;

      _buildElements();
    };

    this.isHitWall = function() {
      var
        pos = _getHeadElement().getPosition(),
        size = _getHeadElement().getSize();

      return pos.x + size > _canvasWidth || pos.x < 0 || pos.y + size > _canvasHeight || pos.y < 0;
    };

    this.isDetectCollision = function() {
      return _collision;
    };

    this.isCollision = function(x, y) {
      var pos = _getHeadElement().getPosition();

      return pos.x == x && pos.y == y;
    };

    this.moveUp = function() {
      if (_dir == 'u' || _dir == 'd') {
        return;
      }
      _dir = 'u';
      _move();
    };
    this.moveRight = function() {
      if (_dir == 'r' || _dir == 'l') {
        return;
      }
      _dir = 'r';
      _move();
    };
    this.moveDown = function() {
      if (_dir == 'd' || _dir == 'u') {
        return;
      }
      _dir = 'd';
      _move();
    };
    this.moveLeft = function() {
      if (_dir == 'l' || _dir == 'r') {
        return;
      }
      _dir = 'l';
      _move();
    };


    _getHeadElement = function() {
      return _elements[0];
    };

    _buildElements = function() {
      var i = 0, element, alpha;

      for (; i < _defaultLength; i++) {
        alpha = Math.max(1 - i / _defaultLength, 0.2);
        element = new SnakeElement(_ctx);

        if (i === 0) { // head
          element.setDirection(_dir);
          element.setPosition(_posX, _posY);
          element.setAlpha(1);
        } else {
          element.link(_elements[i - 1]);
          element.setAlpha(alpha);
        }
        element.render();
        _elements.push(element);
      }
    };

    _renderElements = function() {
      var i = 0, j = 0, pos, dir;

      _length = _elements.length;

      for (; i < _length; i++) {
        pos = _elements[i].getPosition();

        if (_brakeMarkers.length) {
          for (j = 0; j < _brakeMarkers.length; j++) {
            if ( _brakeMarkers[j].x == pos.x && _brakeMarkers[j].y == pos.y ) {
              _elements[i].setDirection(_brakeMarkers[j].d);

              if ( i == _length - 1 ) {
                _brakeMarkers.splice(j, 1);
              }
            }
          }
        }
        dir = _elements[i].getDirection();

        if (i !== 0 && this.isCollision(pos.x, pos.y)) {
          _collision = true;
        }

        if (dir === 'r') {
          _elements[i].setPosition(pos.x + _step, pos.y);

        } else if (dir === 'l') {
          _elements[i].setPosition(pos.x - _step, pos.y);

        } else if (dir === 'u') {
          _elements[i].setPosition(pos.x, pos.y - _step);

        } else if (dir === 'd') {
          _elements[i].setPosition(pos.x, pos.y + _step);
        }
        _elements[i].render();
      }
    }.bind(this);

    _move = function() {
      var h = _getHeadElement();

      _getHeadElement().setDirection(_dir);
      _brakeMarkers.push({
        x: h.getPosition().x,
        y: h.getPosition().y,
        d: h.getDirection()
      });
    };

    if ( this instanceof Snake ) {
      this.init.apply(this, arguments);
    }
  }

  return Snake;
});
