// Описан в документации
import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';
// import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const timeStartBtn = document.querySelector('[data-start]');
timeStartBtn.disabled = true;

const inputData = document.querySelector('#datetime-picker');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (fp.now.getTime() > selectedDates[0].getTime()) {
        Notify.failure('Please choose a date in the future');
    //   window.alert('Please choose a date in the future');
    }
    timeStartBtn.disabled = false;
  },
};

const fp = flatpickr(inputData, options);

// перевести дані з інпута в спани 
// зробити ітерацію до нуля 

const timeDays = document.querySelector('[data-days]');
const timeHours = document.querySelector('[data-hours]');
const timeMinutes = document.querySelector('[data-minutes]');
const timeSeconds = document.querySelector('[data-seconds]');

timeStartBtn.addEventListener('click', startTime);
// () => {
//     console.log("convertMs" , convertMs(inputData.value));
//     console.log('inputData.value', inputData.value);
//     // console.log('dataInconvert', callback(inputData));
// })

function startTime() {
  console.log('convertMs', convertMs(inputData.value));
  console.log('inputData.value', inputData.value);
  const inputInform = convertMs(inputData.value);
  // inputInform.join("");
  // console.log('inputData.value', inputInform.days);

  console.log('objeckt', Object.values(inputInform));
  // inputInform.forEach(({days, hours, minutes, seconds}) => {
  //     console.log('seconds', seconds);
  //     console.log('minutes', minutes);
  //     console.log('hours', hours);
  //     console.log('days', days);

  // });
  console.log('inputInform', inputInform);

  // timeDays.textContent =
}

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// Для подсчета значений используй готовую функцию convertMs, где ms - разница между конечной и текущей датой в миллисекундах.
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
