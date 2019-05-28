const counter = require('./modules/counter');
var Modules = {
  init: function () {
    // counter(array of ids of sections, id of where totals large)
    counter(['#strategic','#complexity'], '#overall');
  }
};

module.exports = Modules;
