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
  for (var index = 0; index < Math.round(Math.random() * (max - min) + min); index++) {
    propertyOne[index] = property[Math.round(Math.random() * (max - min) + min)];
  }
  return propertyOne;
};

var photosChoise = function () {
  var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var compareRandom = function () {
    return Math.random() - 0.5;
  };
  photos.sort(compareRandom);
  return photos;
};

/*  Функция создания объекта  */

var objCreate = function (serialNumber) {
  var obj = {
    author: {
      avatar: createAvatar()[serialNumber],
    },
    offer: {
      title: titleAdvertise[serialNumber],
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
  for (var serialNumber = 0; serialNumber < objNumber; serialNumber++) {
    array [serialNumber] = objCreate(serialNumber);
  }
  return array;
};

var arrayElement = createArray();

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
  elementCard.setAttribute('style', 'display: ' + 'none' + ';');
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
  for (var i = 1; i <= 2; i++) {
    var popupPhoto = elementCard.querySelector('.popup__photo').cloneNode(true);
    popupPhoto.src = arrayElement[indexCard].offer.photos[i];
    elementCard.querySelector('.popup__photos').appendChild(popupPhoto);
  }
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

// Делает поля неактивными
var adForm = document.querySelector('.ad-form');
var mapFilters = document.querySelector('.map__filters');

mapFilters.classList.add('ad-form--disabled');
var fieldsetAll = adForm.querySelectorAll('fieldset');
var fieldsetAllArray = Array.prototype.slice.call(fieldsetAll);
fieldsetAllArray.forEach(function (val) {
  val.setAttribute('disabled', true);
});


// Возвращает активность полям (вызывает функцию создания меток и карточек, и все последующие действия происходят внутри этой функции)
var map = document.querySelector('.map');
var mapPin = document.querySelector('.map__pin--main');
var addressId = document.querySelector('#address');
var createActiveElement = function () {
  createButtons();
  createCards();
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  mapFilters.classList.remove('ad-form--disabled');
  fieldsetAllArray.forEach(function (val) {
    val.removeAttribute('disabled', true);
  });
  addressId.setAttribute('placeholder', '570, 375');

  var mapPinAll = document.querySelectorAll('.map__pin');
  var mapCardAll = document.querySelectorAll('.map__card');
  var mapPinAllArray = Array.prototype.slice.call(mapPinAll);
  var mapCardAllArray = Array.prototype.slice.call(mapCardAll);

  // ИСКЛЮЧАЕТ ИЗ МАССИВА ГЛАВНУЮ МЕТКУ
  mapPinAllArray.splice(0, 1);

  // Функция открытия карточки
  var openCard = function (index) {
    mapCardAllArray.forEach(function (value) {
      value.setAttribute('style', 'display: ' + 'none' + ';');
    });
    mapCardAllArray[index].setAttribute('style', 'display: ' + 'block' + ';');
  };

  // Функция закрытия карточки
  var buttonClose = document.querySelectorAll('.popup__close');
  var popupClose = function () {
    mapCardAllArray.forEach(function (value) {
      value.setAttribute('style', 'display: ' + 'none' + ';');
    });
  };

  // Проходит по массиву меток и слушает события (открытия/закрытия карточек)
  mapPinAllArray.forEach(function callback(currentValue, index) {
    currentValue.addEventListener('mouseup', function () {
      openCard(index);
    });
    currentValue.addEventListener('keydown', function (evt) {
      if (evt.keyCode === 13) {
        openCard(index);
      }
    });
    buttonClose[index].addEventListener('keydown', function (evt) {
      if (evt.keyCode === 13) {
        popupClose();
      }
      if (evt.keyCode === 27) {
        popupClose();
      }
    });
    buttonClose[index].addEventListener('mouseup', function () {
      popupClose();
    });
  });
};


// Вызывает актиивацию карты по клику и кейдауну
mapPin.addEventListener('mouseup', function () {
  // Перенесено в функцию движения метки (код ниже можно сделать аналогично, но пока оставила так)
});
mapPin.addEventListener('keydown', function (evt) {
  if (map.classList.contains('map--faded')) {
    if (evt.keyCode === 13) {
      createActiveElement();
    }
  }
});

// Фильтры объявлений
// Синхронизация количества комнат и гостей

var capacity = document.querySelector('#capacity').querySelectorAll('option');
var roomNumber = document.querySelector('#room_number');
var capacitySelect = document.querySelector('#capacity');

roomNumber.addEventListener('change', function () {
  capacity.forEach(function (val) {
    val.removeAttribute('disabled');
  });
  var optionIndex = roomNumber.selectedIndex;
  if (optionIndex === 2) {
    capacity[3].setAttribute('disabled', true);
  } else if (optionIndex === 3) {
    capacity.forEach(function (val) {
      val.setAttribute('disabled', true);
    });
    capacity[3].removeAttribute('disabled');
  } else if (optionIndex === 0) {
    capacity.forEach(function (val) {
      val.setAttribute('disabled', true);
    });
    capacity[2].removeAttribute('disabled');
  } else if (optionIndex === 1) {
    capacity[3].setAttribute('disabled', true);
    capacity[0].setAttribute('disabled', true);
  }
});


// Валидация формы


var buttonSubmit = document.querySelector('.ad-form__submit');

buttonSubmit.addEventListener('click', function () {
  var optionIndex = capacitySelect.selectedIndex;
  if (capacitySelect[optionIndex].disabled === true) {
    capacitySelect.setCustomValidity('Выберете подходящее количество мест');
  } else {
    capacitySelect.setCustomValidity('');
  }
});

capacitySelect.addEventListener('click', function () {
  capacitySelect.setCustomValidity('');
});

//  Плейсхолдер цены в зависимости от типа жилья
var typeHouse = document.querySelector('#type');
var price = document.querySelector('#price');

typeHouse.addEventListener('change', function () {
  if (typeHouse.value === 'house') {
    price.placeholder = '5000';
  }
  if (typeHouse.value === 'bungalo') {
    price.placeholder = '0';
  }
  if (typeHouse.value === 'flat') {
    price.placeholder = '1000';
  }
  if (typeHouse.value === 'palace') {
    price.placeholder = '10 000';
  }
});

// Перетаскивание метки

var dialogHandle = document.querySelector('.map__pin--main');

dialogHandle.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    var pointTop = dialogHandle.offsetTop - shift.y;
    if (pointTop < 130) {
      pointTop = 130;
    }
    if (pointTop > 630) {
      pointTop = 630;
    }
    // Вычисляет ширину карты (для правой границы), но в таком случае метка тупит на границе, дергается, решить эту проблему можно, но подольше по времени
    // var card = document.querySelector('.map__pins');
    // var widthMap = card.clientWidth || card.offsetWidth;

    var pointLeft = dialogHandle.offsetLeft - shift.x;
    if (pointLeft < 10) {
      pointLeft = 10;
    }
    if (pointLeft > 1120) {
      pointLeft = 1120;
    }

    dialogHandle.style.top = (pointTop) + 'px';
    dialogHandle.style.left = (pointLeft) + 'px';
    if (map.classList.contains('map--faded')) {
      createActiveElement();
    }
    var adress1 = pointTop + 12;
    var adress2 = pointLeft + 7;
    addressId.setAttribute('placeholder', adress1 + ',' + ' ' + adress2);
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});
