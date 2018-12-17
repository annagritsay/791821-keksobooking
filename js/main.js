'use strict';

var createAvatar = function () {
  var avatarImage = [];
  for (var i = 0; i <= 7; i++) {
    avatarImage[i] = 'img/avatars/user' + 0 + (i + 1) + '.png';
  }
  return avatarImage;
};

var titleAdvertise = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];

var type = ['palace', 'flat', 'house', 'bungalo'];

var randomVar = function (min, max) {
  return Math.round(Math.random() * (max - min) + min);
};

var randomVarTwo = function (min, max) {
  var valueX = Math.round(Math.random() * (max - min) + min);
  var valueY = Math.round(Math.random() * (max - min) + min);
  return valueX + ' -' + ' ' + valueY;
};

var timeCheck = ['12:00', '13:00', '14:00'];

var features = function (min, max) {
  var property = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var propertyOne = [];
  for (var index = 0; index < 3; index++) {
    propertyOne[index] = property[Math.round(Math.random() * (max - min) + min)];
  }
  return propertyOne;
};

var photosChoise = function (min, max) {
  var photosCopy = [];
  var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  photosCopy[0] = photos[randomVar(min, max)];
  do {
    photosCopy[1] = photos[randomVar(min, max)];
  } while (photosCopy[0] === photosCopy[1]);
  do {
    photosCopy[2] = photos[randomVar(min, max)];
  } while (photosCopy[0] === photosCopy[2] || photosCopy[1] === photosCopy[2]);
  return photosCopy;
};

/*  Функция создания объекта  */

var objCreate = function (b) {
  var obj = {
    author: {
      avatar: createAvatar()[b],
    },
    offer: {
      title: titleAdvertise[b],
      address: randomVarTwo(100, 900),
      price: randomVar(1000, 1000000),
      type: type[randomVar(0, 3)],
      rooms: randomVar(1, 5),
      guests: randomVar(2, 20),
      checkin: timeCheck[randomVar(0, 2)],
      checkout: timeCheck[randomVar(0, 2)],
      features: features(0, 5),
      description: ' ',
      photos: photosChoise(0, 2)
    },
    location: {
      x: randomVar(100, 1000),
      y: randomVar(130, 630)
    }
  };
  return obj;
};

var objNumber = 8;

/*  Функция создания массива объектов  */
var createArray = function () {
  var array = [];
  for (var b = 0; b < objNumber; b++) {
    array [b] = objCreate(b);
  }
  return array;
};

var arrayElement = createArray();

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var template = document.querySelector('#pin');
var button = template.content.querySelector('button');
var fragment = document.createDocumentFragment();

/*  Функция создания одной метки на карте  */
var createButton = function (indexButton) {
  var element = button.cloneNode(true);
  element.setAttribute('style', 'left: ' + arrayElement[indexButton].location.x + 'px; ' + 'top: ' + arrayElement[indexButton].location.y + 'px;');
  element.querySelector('img').alt = arrayElement[indexButton].offer.title;
  element.querySelector('img').src = arrayElement[indexButton].author.avatar;
  fragment.appendChild(element);
};

var mapPins = document.querySelector('.map__pins');

/*  Функция создания всех меток на карте  */
var createButtons = function () {
  for (var indexButton = 0; indexButton < objNumber; indexButton++) {
    createButton(indexButton);
  }
  mapPins.appendChild(fragment);
};

createButtons();

var templateCard = document.querySelector('#card');
var mapCard = templateCard.content.querySelector('.popup');
var fragmentCard = document.createDocumentFragment();

/*  Функция создания одной карточки  */
var createCard = function (indexCard) {
  var elementCard = mapCard.cloneNode(true);
  elementCard.querySelector('.popup__avatar').src = arrayElement[indexCard].author.avatar;
  elementCard.querySelector('.popup__title').textContent = arrayElement[indexCard].offer.title;
  elementCard.querySelector('.popup__text--address').textContent = arrayElement[indexCard].offer.address + ' Tōkyō-to, Chiyoda-ku, Ichibanchō, 14−3';
  elementCard.querySelector('.popup__text--price').textContent = arrayElement[indexCard].offer.price + ' ₽/ночь';
  if (arrayElement[indexCard].offer.type === 'palace') {
    var typeVar = 'Дворец';
  }
  if (arrayElement[indexCard].offer.type === 'flat') {
    typeVar = 'Квартира';
  }
  if (arrayElement[indexCard].offer.type === 'house') {
    typeVar = 'Дом';
  }
  if (arrayElement[indexCard].offer.type === 'bungalo') {
    typeVar = 'Бунгало';
  }
  elementCard.querySelector('.popup__type').textContent = typeVar;
  elementCard.querySelector('.popup__text--capacity').textContent = arrayElement[indexCard].offer.rooms + ' комнаты для ' + arrayElement[indexCard].offer.guests + ' гостей';
  elementCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + arrayElement[indexCard].offer.checkin + ' выезд до ' + arrayElement[indexCard].offer.checkout;

  //  Скрываю все классы у преимуществ
  var popupFeature = elementCard.querySelectorAll('.popup__feature');
  for (var indexFeature = 0; indexFeature < popupFeature.length; indexFeature++) {
    popupFeature[indexFeature].setAttribute('style', 'display: ' + 'none' + ';');
  }
  //  Добавляю классы имеющихся преимуществ
  for (var indexFeatureAvailable = 0; indexFeatureAvailable < arrayElement[indexCard].offer.features.length; indexFeatureAvailable++) {
    elementCard.querySelector('.popup__feature' + '--' + arrayElement[indexCard].offer.features[indexFeatureAvailable]).setAttribute('style', 'display: ' + 'inline-block' + ';');
  }
  elementCard.querySelector('.popup__description').textContent = arrayElement[indexCard].offer.description;
  elementCard.querySelector('.popup__photo').src = arrayElement[indexCard].offer.photos[0];
  var popupPhoto2 = elementCard.querySelector('.popup__photo').cloneNode(true);
  popupPhoto2.src = arrayElement[indexCard].offer.photos[1];
  elementCard.querySelector('.popup__photos').appendChild(popupPhoto2);
  var popupPhoto3 = elementCard.querySelector('.popup__photo').cloneNode(true);
  popupPhoto3.src = arrayElement[indexCard].offer.photos[2];
  elementCard.querySelector('.popup__photos').appendChild(popupPhoto3);
  fragmentCard.appendChild(elementCard);
};

var containerCard = document.querySelector('.map');
var filtersContainer = document.querySelector('.map__filters-container');

/*  Функция создания всех карточек  */
var createCards = function () {
  for (var indexCard = 0; indexCard < objNumber; indexCard++) {
    createCard(indexCard);
  }
  containerCard.insertBefore(fragmentCard, filtersContainer);
};

createCards();
