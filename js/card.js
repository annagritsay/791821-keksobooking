// Создание карточки объявлений
'use strict';
(function () {
  var templateCard = document.querySelector('#card');
  var mapCard = templateCard.content.querySelector('.popup');
  var fragmentCard = document.createDocumentFragment();

  /*  Функция создания одной карточки  */
  var createCard = function (indexCard) {
    var elementCard = mapCard.cloneNode(true);
    elementCard.querySelector('.popup__avatar').src = window.arrayElement[indexCard].author.avatar;
    elementCard.querySelector('.popup__title').textContent = window.arrayElement[indexCard].offer.title;
    elementCard.querySelector('.popup__text--address').textContent = window.arrayElement[indexCard].offer.address + ' Tōkyō-to, Chiyoda-ku, Ichibanchō, 14−3';
    elementCard.querySelector('.popup__text--price').textContent = window.arrayElement[indexCard].offer.price + ' ₽/ночь';
    elementCard.setAttribute('style', 'display: ' + 'none' + ';');
    if (window.arrayElement[indexCard].offer.type === 'palace') {
      var typeVar = 'Дворец';
    }
    if (window.arrayElement[indexCard].offer.type === 'flat') {
      typeVar = 'Квартира';
    }
    if (window.arrayElement[indexCard].offer.type === 'house') {
      typeVar = 'Дом';
    }
    if (window.arrayElement[indexCard].offer.type === 'bungalo') {
      typeVar = 'Бунгало';
    }
    elementCard.querySelector('.popup__type').textContent = typeVar;
    elementCard.querySelector('.popup__text--capacity').textContent = window.arrayElement[indexCard].offer.rooms + ' комнаты для ' + window.arrayElement[indexCard].offer.guests + ' гостей';
    elementCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + window.arrayElement[indexCard].offer.checkin + ' выезд до ' + window.arrayElement[indexCard].offer.checkout;

    //  Скрываю все классы у преимуществ
    var popupFeature = elementCard.querySelectorAll('.popup__feature');
    for (var indexFeature = 0; indexFeature < popupFeature.length; indexFeature++) {
      popupFeature[indexFeature].setAttribute('style', 'display: ' + 'none' + ';');
    }
    //  Добавляю классы имеющихся преимуществ
    for (var indexFeatureAvailable = 0; indexFeatureAvailable < window.arrayElement[indexCard].offer.features.length; indexFeatureAvailable++) {
      elementCard.querySelector('.popup__feature' + '--' + window.arrayElement[indexCard].offer.features[indexFeatureAvailable]).setAttribute('style', 'display: ' + 'inline-block' + ';');
    }
    elementCard.querySelector('.popup__description').textContent = window.arrayElement[indexCard].offer.description;

    elementCard.querySelector('.popup__photo').src = window.arrayElement[indexCard].offer.photos[0];
    for (var i = 1; i <= 2; i++) {
      var popupPhoto = elementCard.querySelector('.popup__photo').cloneNode(true);
      popupPhoto.src = window.arrayElement[indexCard].offer.photos[i];
      elementCard.querySelector('.popup__photos').appendChild(popupPhoto);
    }
    fragmentCard.appendChild(elementCard);
  };

  var containerCard = document.querySelector('.map');
  var filtersContainer = document.querySelector('.map__filters-container');

  /*  Функция создания всех карточек  */
  window.createCards = function () {
    for (var indexCard = 0; indexCard < window.objNumber; indexCard++) {
      createCard(indexCard);
    }
    containerCard.insertBefore(fragmentCard, filtersContainer);
  };
})();
