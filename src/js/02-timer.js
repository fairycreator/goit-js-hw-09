import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from "notiflix";

const options = {
    onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const currentDate = new Date();
    if (selectedDate <= currentDate) {
        Notiflix.Notify.failure("Please choose a date in the future");
    } else {
        document.querySelector("[data-start]").disabled = false;
    }
},
};

const flatpickrInstance = flatpickr("#datetime-picker", options);

document.querySelector("[data-start]").addEventListener("click", () => {
    const selectedDate = flatpickrInstance.selectedDates[0];
    const currentDate = new Date();
    const timeDifference = selectedDate.getTime() - currentDate.getTime();
    if (timeDifference <= 0) {
        return;
}

const timerInterval = setInterval(() => {
    const { days, hours, minutes, seconds } = convertMs(timeDifference);
    document.querySelector("[data-days]").textContent = addLeadingZero(days);
    document.querySelector("[data-hours]").textContent = addLeadingZero(hours);
    document.querySelector("[data-minutes]").textContent = addLeadingZero(minutes);
    document.querySelector("[data-seconds]").textContent = addLeadingZero(seconds);

    timeDifference -= 1000;

    if (timeDifference < 0) {
        clearInterval(timerInterval);
        Notiflix.Notify.success("Timer has finished!");
    }
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

function addLeadingZero(value) {
    return value < 10 ? `0${value}` : value;
}
