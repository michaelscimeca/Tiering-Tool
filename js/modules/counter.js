'use strict';
module.exports = function (sections, totals) {
  const tier = document.querySelector(`${totals} #overall-tier span`);
  let mainTotal = document.querySelector(`#total span`);

  let sectionEls = [];

  for (let i = 0; i < sections.length; i++) {
    sectionEls[i] = {
      'inputs': document.querySelectorAll(`${sections[i]} input`),
      'scoreEl': document.querySelector(`${sections[i]} .score`),
      'levelEl': document.querySelector(`${sections[i]} .level`),
      'summaryScoreEl': document.querySelector(`.score[data-id=${sections[i].slice(1)}]`),
      'summarylevelEl': document.querySelector(`.level[data-id=${sections[i].slice(1)}]`),
      'selectedValues': {},
      'total': 0
    };
  }

  for (let i = 0; i < sectionEls.length; i++) {
    for (let j = 0; j < sectionEls[i].inputs.length; j++) {
      sectionEls[i].selectedValues[sectionEls[i].inputs[j].name] = 0;
      sectionEls[i].inputs[j].setAttribute('data-i', i);
      sectionEls[i].inputs[j].addEventListener('click', onClick);
    }
  }

  function updateScores (total, scoreElm, scoreRange, summaryScore, summaryLevel) {
    if (total !== 0) {
      scoreElm.innerHTML = total;
    } else {
      scoreElm.innerHTML = '';
    }
    if (total === 0) {
      scoreRange.innerHTML = '';
      summaryScore.innerHTML = '';
    } else if (total > 0 && total <= 5) {
      scoreRange.innerHTML = 'Low';
      summaryScore.innerHTML = 'Low';
    } else if (total >= 6 && total <= 9) {
      scoreRange.innerHTML = 'Medium';
      summaryScore.innerHTML = 'Medium';
    } else {
      scoreRange.innerHTML = 'High';
      summaryScore.innerHTML = 'High';
    }
    summaryLevel.innerHTML = total;
  }

  function updateSummary (name, val) {
    val = parseInt(val);
    let letter = '';
    if (val === 0) {
      letter = '';
    } else if (val === 1) {
      letter = 'L';
    } else if (val === 2) {
      letter = 'M';
    } else if (val === 3) {
      letter = 'H';
    }
    document.querySelector(`#overall [data-name=${name}]`).innerHTML = letter;
  }

  function updateTier () {
    let total = 0;

    for (let i = 0; i < sectionEls.length; i++) {
      total += sectionEls[i].total;
    }
    if (total > 19) {
      tier.innerHTML = 1;
    } else if (total > 15) {
      tier.innerHTML = 2;
    } else if (total > 8) {
      tier.innerHTML = 3;
    } else if (total > 0) {
      tier.innerHTML = 4;
    }
  }

  function getTotal (sectionForm) {
    let total = 0;
    for (let val in sectionForm) {
      if (sectionForm.hasOwnProperty(val)) {
        total += sectionForm[val];
      }
    }
    return total;
  }

  function onClick (e) {
    const index = e.target.getAttribute('data-i');
    if (e.target.checked) {
      sectionEls[index].selectedValues[e.target.name] = parseInt(e.target.value);
      updateSummary(e.target.name, e.target.value);
    } else {
      sectionEls[index].selectedValues[e.target.name] = 0;
    }
    sectionEls[index].total = getTotal(sectionEls[index].selectedValues);
    updateScores(sectionEls[index].total, sectionEls[index].scoreEl, sectionEls[index].levelEl, sectionEls[index].summaryScoreEl, sectionEls[index].summarylevelEl);
    updateTier();
    for (var i = 0; i < sectionEls.length; i++) {
      console.log(sectionEls[i].total);
      mainTotal += sectionEls[i].total;
    }
    console.log(mainTotal);
  }
};
