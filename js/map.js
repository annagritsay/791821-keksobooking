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
})();
