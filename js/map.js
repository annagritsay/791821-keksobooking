// Управляет карточками объявлений и пинами
'use strict';
(function () {
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
    window.createButtons();
    window.createCards();
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    mapFilters.classList.remove('ad-form--disabled');
    fieldsetAllArray.forEach(function (val) {
      val.removeAttribute('disabled', true);
    });
    addressId.setAttribute('value', '570, 375');

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
        if (evt.keyCode === window.util.ESC_KEYCODE) {
          openCard(index);
        }
      });
      buttonClose[index].addEventListener('keydown', function (evt) {
        if (evt.keyCode === window.util.ESC_KEYCODE) {
          popupClose();
        }
        if (evt.keyCode === window.util.ENTER_KEYCODE) {
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

  //  Синхронизация времени заезда-выезда

  var timein = document.querySelector('#timein').querySelectorAll('option');
  var timeout = document.querySelector('#timeout').querySelectorAll('option');
  var timeinSelect = document.querySelector('#timein');
  var timeoutSelect = document.querySelector('#timeout');

  timeinSelect.addEventListener('change', function () {
    timeout.forEach(function (val) {
      val.removeAttribute('selected');
    });
    var optionIndex = timeinSelect.selectedIndex;
    timeout[optionIndex].setAttribute('selected', true);
    timeoutSelect.value = timeout[optionIndex].value;
  });

  timeoutSelect.addEventListener('change', function () {
    timein.forEach(function (val) {
      val.removeAttribute('selected');
    });
    var optionIndex = timeoutSelect.selectedIndex;
    timein[optionIndex].setAttribute('selected', true);
    timeinSelect.value = timein[optionIndex].value;
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
      if (pointLeft < -20) {
        pointLeft = -20;
      }
      if (pointLeft > 1160) {
        pointLeft = 1160;
      }

      dialogHandle.style.top = (pointTop) + 'px';
      dialogHandle.style.left = (pointLeft) + 'px';
      if (map.classList.contains('map--faded')) {
        createActiveElement();
      }
      var adress1 = pointTop + 12;
      var adress2 = pointLeft + 7;
      addressId.setAttribute('value', adress1 + ',' + ' ' + adress2);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  // Отправка данных на сервер, возвращение неактивного состояния карты

  adForm.addEventListener('submit', function (evt) {
    window.upload(new FormData(adForm));
    adForm.classList.add('ad-form--disabled');
    map.classList.add('map--faded');
    mapPin.setAttribute('style', 'left: ' + 570 + 'px; ' + 'top: ' + 375 + 'px;');
    var mapPinAll = document.querySelectorAll('.map__pin');
    var mapCardAll = document.querySelectorAll('.map__card');
    var mapPinAllArray = Array.prototype.slice.call(mapPinAll);
    mapPinAllArray.splice(0, 1);
    var mapCardAllArray = Array.prototype.slice.call(mapCardAll);
    mapCardAllArray.forEach(function (value) {
      value.remove();
    });
    mapPinAllArray.forEach(function (value) {
      value.remove();
    });
    evt.preventDefault();
    adForm.reset();
  });


  // ФИЛЬТРАЦИЯ МЕТОК

  mapFilters.addEventListener('change', function () {
    window.arrayElement = window.copyArrayElement;
    var housingTypeSelect = document.querySelector('#housing-type');
    var housingPrice = document.querySelector('#housing-price');
    var housingRooms = document.querySelector('#housing-rooms');
    var housingGuests = document.querySelector('#housing-guests');


    if (housingTypeSelect.value === 'any') {
      var newArray1 = window.copyArrayElement;
    } else {
      newArray1 = window.arrayElement.filter(function (it) {
        return it.offer.type === housingTypeSelect.value;
      });
    }
    var mapPinAll = document.querySelectorAll('.map__pin');
    var mapCardAll = document.querySelectorAll('.map__card');
    var mapPinAllArray = Array.prototype.slice.call(mapPinAll);
    mapPinAllArray.splice(0, 1);
    var mapCardAllArray = Array.prototype.slice.call(mapCardAll);

    mapCardAllArray.forEach(function (value) {
      value.remove();
    });
    mapPinAllArray.forEach(function (value) {
      value.remove();
    });


    if (housingPrice.value === 'any') {
      var newArray2 = window.copyArrayElement;
    } else if (housingPrice.value === 'middle') {
      newArray2 = window.arrayElement.filter(function (it) {
        return it.offer.price >= 10000 && it.offer.price <= 50000;
      });
    } else if (housingPrice.value === 'low') {
      newArray2 = window.arrayElement.filter(function (it) {
        return it.offer.price < 10000;
      });
    } else if (housingPrice.value === 'high') {
      newArray2 = window.arrayElement.filter(function (it) {
        return it.offer.price > 50000;
      });
    }

    mapCardAllArray.forEach(function (value) {
      value.remove();
    });
    mapPinAllArray.forEach(function (value) {
      value.remove();
    });


    if (housingRooms.value === 'any') {
      var newArray3 = window.copyArrayElement;
    } else {
      newArray3 = window.arrayElement.filter(function (it) {
        return it.offer.rooms === Number(housingRooms.value);
      });
    }
    mapCardAllArray.forEach(function (value) {
      value.remove();
    });
    mapPinAllArray.forEach(function (value) {
      value.remove();
    });

    if (housingGuests.value === 'any') {
      var newArray4 = window.copyArrayElement;
    } else {
      newArray4 = window.arrayElement.filter(function (it) {
        return it.offer.guests === Number(housingGuests.value);
      });
    }

    mapCardAllArray.forEach(function (value) {
      value.remove();
    });
    mapPinAllArray.forEach(function (value) {
      value.remove();
    });

    var summArray = newArray1.concat(newArray2, newArray3, newArray4);

    var user01 = 0;
    var user02 = 0;
    var user03 = 0;
    var user04 = 0;
    var user05 = 0;
    var user06 = 0;
    var user07 = 0;
    var user08 = 0;
    var user09 = 0;

    summArray.forEach(function (value) {
      if (value.author.avatar === 'img/avatars/user01.png') {
        user01++;
      }
      if (value.author.avatar === 'img/avatars/user02.png') {
        user02++;
      }
      if (value.author.avatar === 'img/avatars/user03.png') {
        user03++;
      }
      if (value.author.avatar === 'img/avatars/user04.png') {
        user04++;
      }
      if (value.author.avatar === 'img/avatars/user05.png') {
        user05++;
      }
      if (value.author.avatar === 'img/avatars/user06.png') {
        user06++;
      }
      if (value.author.avatar === 'img/avatars/user07.png') {
        user07++;
      }
      if (value.author.avatar === 'img/avatars/user08.png') {
        user08++;
      }
      if (value.author.avatar === 'img/avatars/user09.png') {
        user09++;
      }
    });

    var diffNumber = [];
    diffNumber.push(user01, user02, user03, user04, user05, user06, user07, user08, user09);
    var finishArray = [];
    diffNumber.forEach(function callback(value, index) {
      if (value === 4) {
        finishArray.push(window.copyArrayElement[index]);
      }
    });
    window.arrayElement = finishArray;
    createActiveElement();
  });
})();
