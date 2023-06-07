// function createPromise(position, delay) {
//   const shouldResolve = Math.random() > 0.3;
//   if (shouldResolve) {
//     // Fulfill
//   } else {
//     // Reject
//   }
// }

import Notiflix from "notiflix";

const form = document.querySelector(".form");

form.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
  event.preventDefault();

  const delay = parseInt(form.elements["delay"].value);
  const step = parseInt(form.elements["step"].value);
  const amount = parseInt(form.elements["amount"].value);

  if (isNaN(delay) || isNaN(step) || isNaN(amount)) {
    return;
  }

  generatePromises(delay, step, amount);
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

function generatePromises(initialDelay, step, amount) {
  let currentDelay = initialDelay;

  for (let i = 0; i < amount; i++) {
    createPromise(i + 1, currentDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });

    currentDelay += step;
  }
}
