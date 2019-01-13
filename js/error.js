'use strict';
(function () {
  window.errorMassage = function () {
    var template = document.querySelector('#error');
    var conteiner = document.querySelector('main');
    var massage = template.content.querySelector('.error').cloneNode(true);
    conteiner.appendChild(massage);

    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.util.ESC_KEYCODE) {
        massage.setAttribute('style', 'display: ' + 'none' + ';');
      }
    });
    document.addEventListener('click', function () {
      massage.setAttribute('style', 'display: ' + 'none' + ';');
    });
    document.querySelector('.error__button').addEventListener('click', function () {
      massage.setAttribute('style', 'display: ' + 'none' + ';');
    });
  };
})();
