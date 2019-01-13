'use strict';
(function () {
  var URL = 'https://js.dump.academy/keksobooking/data';

  window.load = function () {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.open('GET', URL);
    xhr.send();

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        window.onLoad(xhr.response);
        window.arrayElement = xhr.response;
        window.copyArrayElement = window.arrayElement;
      } else {
        window.onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      window.onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      window.onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000; // 10s
  };
})();
