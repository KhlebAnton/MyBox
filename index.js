document.body.style.height = window.innerHeight + 'px';
window.addEventListener('resize', function() {
  document.body.style.height = window.innerHeight + 'px';
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
    }, 100);
}
loadGame();


function gamePaused(element) {
  element.style.opacity = "0";
  document.querySelector('.game_paused').style.display = 'block';
}

function gamePlayGo(element) {
  element.style.display = 'none'; 
  document.querySelector('.paused').style.opacity = '1';
}





let input = document.getElementById('phone');
let btnNext = document.getElementById('btn_next');
input.onfocus = function () {
    document.body.style.height = document.documentElement.clientHeight + 'px';
    document.body.style.overflow = "hidden";
    btnNext.style.top = "400px";

}
input.onblur = function () {
    document.body.style.height = window.innerHeight + 'px';
    btnNext.style.top = "";
}





let phoneNumberSave;

function checkPhoneNumber() {
    let phoneNumber = document.getElementById('phone').value;
    phoneNumber = phoneNumber.replace(/\s+/g, '');
    let button = document.getElementById('btn_next');
    if (phoneNumber.length > 10) {
        button.classList.add("active_btn");
        input.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                event.preventDefault();
                input.blur();
            }

        })
        button.addEventListener("click", () => {
            nextRegistration();
        })
    } else {
        button.classList.remove("active_btn");
    }
}
function nextRegistration() {
    document.querySelector('.screen.authorization').classList.add('hidden');
    document.querySelector('.screen.authorization.registration').classList.remove('hidden');
    phoneNumberSave = document.getElementById('phone').value;
    document.getElementById('tel_spam').innerHTML = phoneNumberSave;

}


let inputs = document.querySelectorAll(".input");
let unlocked = false;
let pinSet = false;
function next (close, open) {
    document.querySelector(close).classList.add('hidden');
    document.querySelector(open).classList.remove('hidden');
    
}

for ( let i = 0; i < inputs.length; i++ ) {
    setInputFilter(inputs[i], function(value) {
      return /^\d*$/.test(value) && (value === "" || parseInt(value) <= 9);
    });
    inputs[i].addEventListener('input', function() {
      if ( unlocked ) { return }
      if ( inputs[i].value.length > 0 ) {
        inputs[i].value = inputs[i].value.slice(0, 1);
        if ( i < inputs.length - 1 ) {
          inputs[i + 1].focus();
        } else if ( i === inputs.length - 1 ) {
          next('.screen.authorization.registration', '.screen.game_start');
        }
      }
    })
    inputs[i].addEventListener('keydown', function(e) {
      if ( unlocked ) { return }
      let key = e.which || e.keyCode || 0;
      if ( key === 8  ) {
        this.value = '';
        if ( (i - 1) < 0  ) { return }
        else {
          inputs[ i - 1 ].focus();
        }
      }
    });
  }
  function setInputFilter(textbox, inputFilter) {
    ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function(event) {
      textbox.addEventListener(event, function() {
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

startTimer();