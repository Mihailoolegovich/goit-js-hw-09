import { Notify } from 'notiflix/build/notiflix-notify-aio';
const refs = {
  formDelay: document.querySelector('.form'),
  firstDelay: document.querySelector('input[name="delay"]'),
  stepDelay: document.querySelector('input[name="step"]'),
  amount: document.querySelector('input[name="amount"]'),
};

refs.formDelay.addEventListener('submit', getPopup);

function getPopup(event) {
  event.preventDefault();

  let numInfirst = Number(refs.firstDelay.value);
  let numInstep = Number(refs.stepDelay.value);
  let numInAmount = Number(refs.amount.value);

  for (let i = 1, d = numInfirst; i <= numInAmount ; i++, d += numInstep) {
    createPromise(i, d)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        // console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        // console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
