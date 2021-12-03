import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  timeStartBtn: document.querySelector('[data-start]'),
  inputData: document.querySelector('#datetime-picker'),
  timeDays: document.querySelector('[data-days]'),
  timeHours: document.querySelector('[data-hours]'),
  timeMinutes: document.querySelector('[data-minutes]'),
  timeSeconds: document.querySelector('[data-seconds]'),
};

refs.timeStartBtn.addEventListener('click', startTime);
refs.timeStartBtn.disabled = true;

let selectedInput = null;
let differensData = null;
const dateNow = Date.now();

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedInput = selectedDates[0].getTime();

    if (fp.now.getTime() > selectedInput) {
      refs.timeStartBtn.disabled = true;
      Notify.failure('Please choose a date in the future');
      // window.alert('Please choose a date in the future');
      return;
    }

    refs.timeStartBtn.disabled = false;

    differensData = selectedInput - dateNow;
    addTimeFormat(differensData);
  },
};

const fp = flatpickr(refs.inputData, options);

function startTime() {
  refs.timeStartBtn.disabled = true;

  differensData = selectedInput - dateNow;
  let el = 0;

  const addInterval = setInterval(() => {
    if (differensData < 999) {
      getAlertFinish(el);
      el += 1;
      refs.inputData.disabled = false;
      clearInterval(addInterval);
      return;
    }

    differensData -= 1000;

    addTimeFormat(differensData);

    refs.inputData.disabled = true;
  }, 1000);
}

function getAlertFinish(el) {
  if (el === 0) {
    Notify.success('Your timecode has finished');
  }
  return;
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function addTimeFormat(numUTC) {
  const numSetInt = convertMs(numUTC);

  refs.timeDays.textContent = addLeadingZero(numSetInt.days);
  refs.timeHours.textContent = addLeadingZero(numSetInt.hours);
  refs.timeMinutes.textContent = addLeadingZero(numSetInt.minutes);
  refs.timeSeconds.textContent = addLeadingZero(numSetInt.seconds);
}

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
