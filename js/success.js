'use strict';

(function () {
  window.successMassage = function () {
    var template = document.querySelector('#success');
    var conteiner = document.querySelector('main');
    var massage = template.content.querySelector('.success').cloneNode(true);
    conteiner.appendChild(massage);

    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.util.ESC_KEYCODE) {
        massage.setAttribute('style', 'display: ' + 'none' + ';');
      }
    });
    document.addEventListener('click', function () {
      massage.setAttribute('style', 'display: ' + 'none' + ';');
    });
  };
})();
