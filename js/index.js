
define('init/index', ['app/game'], function(Game) {
  var g = new Game();

  document.addEventListener('click', function() {
    g.start();
  }, false);
});