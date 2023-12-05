

document.body.style.height = window.innerHeight + 'px';
window.addEventListener('resize', function () {
  document.body.style.height = window.innerHeight + 'px';
});
document.querySelector('button').addEventListener('dblclick', function (event) {
  event.preventDefault();
});


function loadGame() {
  const loadItems = document.querySelectorAll('.load_bar__item');
  let index = 0;
  const interval = setInterval(() => {
    loadItems[index].classList.add('active_item');
    index++;
    if (index >= loadItems.length) {
      clearInterval(interval);
      document.querySelector(".loadscreen").classList.add('hidden');
      document.querySelector(".authorization").classList.remove('hidden')

    }
  }, 150);
}
loadGame();



// обновление и убавление жизней тест
const life = document.getElementById('life');
let lifeCoins = life.textContent;
updateLife();

function updateLife() {
  life.innerHTML = lifeCoins;
  document.querySelectorAll('.life').forEach(life => {
    life.innerHTML = lifeCoins;
  })
}
function updateLife(lifeItem) {
  document.querySelectorAll('.life').forEach(life => {
    life.innerHTML = lifeItem;
  })
}

function removeOneLife() {
  if (life.textContent > 0) {
    lifeCoins = (lifeCoins - 1);
    updateLife();

    life.closest('.screen').classList.add('hidden');
    document.querySelector('.game_over').classList.remove('hidden');

  }
}
//обновление и добавление монет 100
const coin = document.getElementById('coin');
let coinItems = coin.textContent;
updateCoin();

function updateCoin() {
  coin.innerHTML = coinItems;
  document.querySelectorAll('.coin').forEach(coin => {
    coin.innerHTML = coinItems;
  })
}

function updateCoin(coinItem) {
  document.querySelectorAll('.coin').forEach(coin => {
    coin.innerHTML = coinItem;
  })
}

function getCoins() {
  coinItems = +coinItems + 100;
  updateCoin();
}
//копирование промо 
function copyPromo() {
  let promo = document.getElementById('promo_code').textContent;

  navigator.clipboard.writeText(promo)
    .then(() => {

    })
    .catch(err => {
      console.log('Something went wrong', err);
    });
}

// клик на скачивание 
function goClickedLink(e) {
  let pageUrl = e.getAttribute('data-page-url');
  window.location.href = pageUrl;
}



// активные карточки
const shopCards = document.querySelectorAll('.shop_card');
getActiveCards();
function getActiveCards() {
  let coins = document.getElementById('coin').textContent;
  document.getElementById('coin_shop').innerHTML = coins;


  shopCards.forEach(card => {
    if (+coins >= +card.getAttribute("data-price")) {
      card.classList.add('card_active');
    } else {
      card.classList.remove('card_active')
    }
  })
}
// выбор из активных карточек
shopCards.forEach(card => {
  card.addEventListener('click', () => {
    if (card.classList.contains('card_active')) {
      let coins = document.getElementById('coin').textContent;
      card.classList.toggle("choise");
      //активация кнопки обмена
      if (+coins >= 1000) {
        document.querySelector('.btn_trade').classList.add('trade_active');
        document.querySelector('.btn_trade').addEventListener("click", () => {
          document.querySelector('.shop').classList.add("hidden");
          if (autorization === false) {

            document.querySelector('.authorization').classList.remove("hidden");

            let autorizationScreen = document.querySelector('.authorization');
            autorizationScreen.querySelector('.header').style.display = 'none';

            let registrationScreen = autorizationScreen.nextElementSibling;

            registrationScreen.querySelector('.header').style.display = 'none';
            registrationScreen.querySelector('.btn_test_pin').removeAttribute('onclick');

            registrationScreen.querySelector('.btn_test_pin').addEventListener('click', () => {
              autorization = true;
              document.querySelector('.registration').classList.add("hidden");
              document.querySelector('.promo_code').classList.remove('hidden');
            })
          } else { document.querySelector('.promo_code').classList.remove('hidden'); }
        })
      } else {
        document.querySelector('.btn_trade').classList.remove('trade_active');
      }
      shopCards.forEach(otherCard => {
        if (otherCard !== card) {
          otherCard.classList.remove("choise");
        }
      });
    }

  })
})




// переключение
function next(close, open) {
  close.closest('.screen').classList.add('hidden');
  document.querySelector(open).classList.remove('hidden');

}
function next(close, open, bool) {
  close.closest('.screen').classList.add('hidden');
  document.querySelector(open).classList.remove('hidden');

  if (bool === true) {
    setTimeout(function () {
      document.querySelector(open).classList.add('hidden');
      document.querySelector(".question_exchange").classList.remove('hidden');

    }, 4000);
  }
}
function againGame(elem) {
  elem.closest('.screen').classList.add('hidden')
  if (lifeCoins > 0) {
    document.querySelector('.game_go').classList.remove('hidden');
  } else {
    document.querySelector('.game_end_lifes').classList.remove('hidden');
  }

}


// пауза
function gamePaused(element) {
  element.style.opacity = "0";
  document.querySelector('.game_paused').style.display = 'block';
}

function gamePlayGo(element) {
  element.style.display = 'none';
  document.querySelector('.paused').style.opacity = '1';
}

// клик на крестик мыслей осткрывается экран с игрой (а если жизней нет, то открыватся окно "лимит жизней")
function closeWordCloud(elem) {
  elem.closest(".screen").classList.add('hidden')
  if (lifeCoins > 0) {
    document.querySelector('.game_go').classList.remove('hidden');
  } else {
    document.querySelector('.game_over').classList.remove('hidden');
  }
}




let input = document.getElementById('phone');
let btnNext = document.getElementById('btn_next');




// авторизация

let autorization = false;

function registration(e) {
  autorization = e;
}
//mask телефона
document.addEventListener("DOMContentLoaded", function () {
  var eventCalllback = function (e) {
    var el = e.target,
      clearVal = el.dataset.phoneClear,
      pattern = el.dataset.phonePattern,
      matrix_def = "+7(___) ___ __ __",
      matrix = pattern ? pattern : matrix_def,
      i = 0,
      def = matrix.replace(/\D/g, ""),
      val = e.target.value.replace(/\D/g, "");
    if (clearVal !== 'false' && e.type === 'blur') {
      if (val.length < matrix.match(/([\_\d])/g).length) {
        e.target.value = '';
        return;
      }
    }
    if (def.length >= val.length) val = def;
    e.target.value = matrix.replace(/./g, function (a) {
      return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a
    });
  }
  var phone_inputs = document.querySelectorAll('[data-phone-pattern]');
  for (let elem of phone_inputs) {
    for (let ev of ['input', 'blur', 'focus']) {
      elem.addEventListener(ev, eventCalllback);
    }
  }
});

let phoneNumberSave;

// добавил onInputPhone
function checkPhoneNumber() {
  let phoneNumber = document.getElementById('phone').value;
  phoneNumber = phoneNumber.replace(/\s+/g, '');
  let button = document.getElementById('btn_next');
  let input = document.getElementById('phone');

  const keydownHandler = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      // onInputPhone(phoneNumber.replace(/[\s()]/g, "")); c app
      input.blur();
    }
  };
  const clickHandler = (event) => {
    // onInputPhone(phoneNumber.replace(/[\s()]/g, "")); c app
    button.classList.remove("active_btn");
    nextRegistration(); //del
  };


  if (phoneNumber.length > 13) {
    button.classList.add("active_btn");
    input.addEventListener("keydown", keydownHandler);
    button.onclick = clickHandler;
  } else {
    
    input.removeEventListener("keydown", keydownHandler);
    button.onclick = "";
    button.classList.remove("active_btn");
  }
}

function nextRegistration() {
  document.querySelector('.screen.authorization').classList.add('hidden');
  document.querySelector('.screen.authorization.registration').classList.remove('hidden');
  startTimer();
  phoneNumberSave = document.getElementById('phone').value;
  document.getElementById('tel_spam').innerHTML = phoneNumberSave;

}

// добавил onInputcode
let inputs = document.querySelectorAll(".input");
let unlocked = false;
let pinSet = false;
let nums_pin = [];

for (let i = 0; i < inputs.length; i++) {
  setInputFilter(inputs[i], function (value) {
    return /^\d*$/.test(value) && (value === "" || parseInt(value) <= 9);
  });
  inputs[i].addEventListener('input', function () {
    if (unlocked) { return }
    if (inputs[i].value.length > 0) {
      inputs[i].value = inputs[i].value.slice(0, 1);
      nums_pin[i] = inputs[i].value;
      if (i < inputs.length - 1) {
        inputs[i + 1].focus();
      } else if (i === inputs.length - 1) {
        document.getElementById('btn_test_pin').style.display = "block"; //del
        document.querySelector('.btn_next.registration').classList.add('active_btn')

        // onInputCode(nums_pin.join(''));  с апп
      }
    }
  })
  inputs[i].addEventListener('keydown', function (e) {
    if (unlocked) { return }
    let key = e.which || e.keyCode || 0;
    if (key === 8) {
      this.value = '';
      if ((i - 1) < 0) { return }
      else {
        inputs[i - 1].focus();
      }
    }
  });
}
function setInputFilter(textbox, inputFilter) {
  ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function (event) {
    textbox.addEventListener(event, function () {
      if (inputFilter(this.value)) {
        this.oldValue = this.value;
        this.oldSelectionStart = this.selectionStart;
        this.oldSelectionEnd = this.selectionEnd;
      } else if (this.hasOwnProperty("oldValue")) {
        this.value = this.oldValue;
        this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
      }
    });
  });
}



var timerText = document.getElementById('timerText');
var timerValueElement = document.getElementById('timerValue');
var resendLink = document.getElementById('resendLink');
var resendButton = document.getElementById('resendButton');

var timer;

function startTimer() {
  timerValue = 59;

  timerText.style.display = 'block';
  resendLink.style.display = 'none';

  timer = setInterval(function () {
    timerValue--;
    timerValueElement.textContent = timerValue;

    if (timerValue === 0) {
      clearInterval(timer);
      timerText.style.display = 'none';
      resendLink.style.display = 'block';
    }
  }, 1000);
}
resendButton.addEventListener('click', function (event) {
  event.preventDefault();
  startTimer();
});

