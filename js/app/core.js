
define(function() {
  var
    s = {},
    d = document;

  s.$ = function(id) {
    return d.getElementById(id);
  };

  if (!Function.prototype.bind) {
    Function.prototype.bind = function(toBind) {
      return function() {
        this.apply(toBind, arguments);
      }
    }
  }

  return s;
});