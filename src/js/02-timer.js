import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from "notiflix";

const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');
const startBtn = document.querySelector("[data-start]");
const dateTimePicker = document.querySelector("#datetime-picker");

let flatpickrInstance;
let timerInterval;

const options = {
    enableTime: true,
    enableSeconds: true,
    onClose(selectedDates) {
        const selectedDate = selectedDates[0];
        const currentDate = new Date();
        if (selectedDate <= currentDate) {
            Notiflix.Notify.failure("Please choose a date in the future");
            startBtn.disabled = true; // Disable start 
            dateTimePicker.disabled = false; // Enable input
        } else {
            startBtn.disabled = false; // Enable start 
            dateTimePicker.disabled = true; // Disable input
        }
    },
};

flatpickrInstance = flatpickr("#datetime-picker", options);

startBtn.addEventListener("click", () => {
    let selectedDate = flatpickrInstance.selectedDates[0];
    const currentDate = new Date();
    let timeDifference = selectedDate.getTime() - currentDate.getTime();
    if (timeDifference <= 0) {
        return;
    }

    startBtn.disabled = true; // Disable start 
    dateTimePicker.disabled = true; // Disable input

    clearInterval(timerInterval);

    timerInterval = setInterval(() => {
        const { days, hours, minutes, seconds } = convertMs(timeDifference);
        dataDays.textContent = addLeadingZero(days);
        dataHours.textContent = addLeadingZero(hours);
        dataMinutes.textContent = addLeadingZero(minutes);
        dataSeconds.textContent = addLeadingZero(seconds);

        timeDifference -= 1000;

        if (timeDifference < 0) {
            clearInterval(timerInterval);
            Notiflix.Notify.success("Timer has finished!");
            startBtn.disabled = false; // Enable start 
            dateTimePicker.disabled = false; // Enable input
        }
    }, 1000);
});

dateTimePicker.addEventListener("click", () => {
    clearInterval(timerInterval);
    startBtn.disabled = false; // Enable start 
    dateTimePicker.disabled = false; // Enable input
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

function addLeadingZero(value) {
    return value.toString().padStart(2, '0');
}
