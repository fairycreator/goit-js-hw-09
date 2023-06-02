const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

let intervalId;

startBtn.addEventListener('click', startColorChange);

function startColorChange() {
    startBtn.disabled = true;
    intervalId = setInterval(changeBackgroundColor, 1000);
}

function changeBackgroundColor() {
    const randomColor = getRandomHexColor();
    document.body.style.backgroundColor = randomColor;
}

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
}

stopBtn.addEventListener('click', stopColorChange);

function stopColorChange() {
    clearInterval(intervalId);
    startBtn.disabled = false;
}
