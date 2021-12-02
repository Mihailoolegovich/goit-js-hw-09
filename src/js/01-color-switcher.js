const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

let timerId = null;
stopBtn.disabled = true;

startBtn.addEventListener('click', setIntervalBtn);

function rondomColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function setIntervalBtn() {
  timerId = setInterval(() => {
    document.body.style.backgroundColor = rondomColor();
  }, 1000);
  
  startBtn.disabled = true;
  stopBtn.disabled = false;

  stopBtn.addEventListener('click', clearIntervalBtn);
}

function clearIntervalBtn() {
  clearInterval(timerId);

  startBtn.disabled = false;
  stopBtn.disabled = true;
}

