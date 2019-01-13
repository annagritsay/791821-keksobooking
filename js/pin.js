// Создание пина
'use strict';
(function () {
  var template = document.querySelector('#pin');
  var button = template.content.querySelector('button');
  var fragment = document.createDocumentFragment();

  /*  Функция создания одной метки на карте  */
  var createButton = function (indexButton) {
    var element = button.cloneNode(true);
    element.setAttribute('style', 'left: ' + window.arrayElement[indexButton].location.x + 'px; ' + 'top: ' + window.arrayElement[indexButton].location.y + 'px;');
    element.querySelector('img').alt = window.arrayElement[indexButton].offer.title;
    element.querySelector('img').src = window.arrayElement[indexButton].author.avatar;
    fragment.appendChild(element);
  };

  var mapPins = document.querySelector('.map__pins');

  /*  Функция создания всех меток на карте  */
  window.createButtons = function () {
    for (var indexButton = 0; indexButton < window.arrayElement.length && indexButton < 5; indexButton++) {
      createButton(indexButton);
    }
    mapPins.appendChild(fragment);
  };
})();
