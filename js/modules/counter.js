'use strict';
module.exports = function () {
  const list = document.querySelectorAll('form input');
  let form = {};
  let total = 0;
  let showTotalElement = document.getElementById('totalPrice');
  let count = 0;
  let myReq;
  function addValues () {
    // Reset values to 0 again, so we don't grab previous values
    total = 0;
    // Go into each form key value and grab it
    for (let val in form) {
      if (form.hasOwnProperty(val)) {
        // Add to the total
        total += form[val];
      }
    }

    // If total doesn't equal 0 Insert total value and add class show to total.
    if (total !== 0) {
      showTotalElement.classList.add('show');
    // if total equals 0 remove total number
    } else {
      showTotalElement.classList.remove('show');
    }
    animatonCount();
  }

  function animatonCount () {
    if (total > count) {
      count++;
      showTotalElement.innerHTML = count + 'k';
      myReq = requestAnimationFrame(animatonCount);
    } else if (total < count) {
      count--;
      showTotalElement.innerHTML = count + 'k';
      myReq = requestAnimationFrame(animatonCount);
    } else {
      cancelAnimationFrame(myReq);
    }
  }

  function onClick (e) {
    // Check if input item is checked and add that value to that key name also add it to the input price Element
    if (e.target.checked) {
      form[e.target.name] = parseInt(e.target.value);
      document.querySelector(`[data-value="${e.target.name}"]`).classList.add('show');
    } else {
      // if unclicked set the name key value to 0 and remove value price element if none is applied
      form[e.target.name] = 0;
      document.querySelector(`[data-value="${e.target.name}"]`).classList.remove('show');
    }
    addValues();
  }

  for (let i = 0; i < list.length; i++) {
    // Set object name keys to 0. Each input will have a name key and a value of 0
    form[list[i].name] = 0;
    list[i].addEventListener('click', onClick);
  }
};
