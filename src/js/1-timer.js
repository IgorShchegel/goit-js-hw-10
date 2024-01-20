import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const inputDate = document.querySelector('#datetime-picker');
const buttonStart = document.querySelector('button[data-start]');
const daysTimer = document.querySelector('[data-days]');
const hoursTimer = document.querySelector('[data-hours]');
const minutesTimer = document.querySelector('[data-minutes]');
const secondsTimer = document.querySelector('[data-seconds]');

let userSelectedDate;
let countdown;
buttonStart.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose: function (selectedDates) {
    const currentDate = new Date();
    userSelectedDate = selectedDates[0];

    if (userSelectedDate <= currentDate) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        position: 'topRight',
      });
      buttonStart.disabled = true;
      clearInterval(countdown);
      displayTime(0, 0, 0, 0);
      return;
    } else {
      buttonStart.disabled = false;
    }
  },
};

buttonStart.addEventListener('click', () => {
  if (!userSelectedDate || userSelectedDate <= new Date()) {
    iziToast.error({
      title: 'Error',
      message: 'Please choose a date in the future',
      position: 'topRight',
    });
    return;
  }

  buttonStart.disabled = true;

  const countdown = setInterval(e => {
    const timeDifference = userSelectedDate.getTime() - Date.now();
    if (timeDifference <= 0) {
      inputDate.disabled = false;
    } else {
      inputDate.disabled = true;
    }

    if (timeDifference <= 0) {
      clearInterval(countdown);
      displayTime(0, 0, 0, 0);
      return;
    }
    const timeParts = convertMs(timeDifference);
    displayTime(
      timeParts.days,
      timeParts.hours,
      timeParts.minutes,
      timeParts.seconds
    );
  }, 1000);
});

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function displayTime(days, hours, minutes, seconds) {
  daysTimer.textContent = addLeadingZero(days);
  hoursTimer.textContent = addLeadingZero(hours);
  minutesTimer.textContent = addLeadingZero(minutes);
  secondsTimer.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

flatpickr('#datetime-picker', options);
