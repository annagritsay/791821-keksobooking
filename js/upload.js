'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksobooking';

  window.upload = function (data) {
    var xhv = new XMLHttpRequest();

    xhv.addEventListener('load', function () {
      if (xhv.status === 200) {
        window.onLoad(xhv.response);
        window.successMassage();
      } else {
        window.onError('Cтатус ответа: ' + xhv.status + ' ' + xhv.statusText);
        window.errorMassage();
      }
    });

    xhv.open('POST', URL);
    xhv.send(data);
  };
})();
