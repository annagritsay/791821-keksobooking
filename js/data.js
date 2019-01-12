// Создает данные

'use strict';
(function () {
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

  window.objNumber = 8;

  /*  Функция создания массива объектов  */
  var createArray = function () {
    var array = [];
    for (var serialNumber = 0; serialNumber < window.objNumber; serialNumber++) {
      array [serialNumber] = objCreate(serialNumber);
    }
    return array;
  };

  window.arrayElement = createArray();
})();
