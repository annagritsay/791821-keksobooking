// Создает данные

'use strict';
(function () {
  window.onError = function (message) {
    // eslint-disable-next-line no-console
    console.error(message);
  };
  window.onLoad = function (data) {
    // eslint-disable-next-line no-console
    console.log(data);
  };
  window.load();
})();
