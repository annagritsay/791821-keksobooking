// Создает данные

'use strict';
(function () {
  window.onError = function (message) {
    console.error(message);
  };
  window.onLoad = function (data) {
    console.log(data);
  };
  window.load();
})();
