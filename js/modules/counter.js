'use strict';
module.exports = function () {
  const list = document.querySelectorAll('form input');
  const showTotalScore = document.querySelector('#totalScore span');
  const Range = document.querySelector('#range span');
  let form = {};
  let total = 0;

  function addValues () {
    total = 0;
    for (let val in form) {
      if (form.hasOwnProperty(val)) {
        total += form[val];
      }
    }
    if (total !== 0) {
      showTotalScore.innerHTML = total;
    } else {
      showTotalScore.innerHTML = '';
    }
    if (total === 0) {
      Range.innerHTML = '';
    } else if (total > 0 && total <= 5) {
      Range.innerHTML = 'Low';
    } else if (total >= 6 && total <= 9) {
      Range.innerHTML = 'Medium';
    } else {
      Range.innerHTML = 'High';
    }
  }

  function onClick (e) {
    if (e.target.checked) {
      form[e.target.name] = parseInt(e.target.value);
    } else {
      form[e.target.name] = 0;
    }
    addValues();
  }
  for (let i = 0; i < list.length; i++) {
    form[list[i].name] = 0;
    list[i].addEventListener('click', onClick);
  }
};
