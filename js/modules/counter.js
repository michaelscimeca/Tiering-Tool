'use strict';
module.exports = function (sections, totals) {
  const tier = document.querySelector(`${totals} #overall-tier span`);
  let sectionEls = [];
  // Create Objects for each form
  for (let i = 0; i < sections.length; i++) {
    sectionEls[i] = {
      // Loop through and select all inputs in two array
      'inputs': document.querySelectorAll(`${sections[i]} input`),
      // Loop through and grab scores
      'scoreEl': document.querySelector(`${sections[i]} .score`),
      // Loop through and grab levels
      'levelEl': document.querySelector(`${sections[i]} .level`),
      // Loop through and grab summary of the scores
      'summaryScoreEl': document.querySelector(`.score[data-id=${sections[i].slice(1)}]`),
      'summarylevelEl': document.querySelector(`.level[data-id=${sections[i].slice(1)}]`),
      // Create and Object to store info
      'selectedValues': {},
      // Store total score
      'total': 0
    };
  }
  // Loop twice through each object form
  for (let i = 0; i < sectionEls.length; i++) {
    // Loop all inputs for eacy object
    for (let j = 0; j < sectionEls[i].inputs.length; j++) {
      // Create Key for each input and set a key and number
      sectionEls[i].selectedValues[sectionEls[i].inputs[j].name] = 0;
      // Set each input to 0 or 1 based on which form your inside.
      sectionEls[i].inputs[j].setAttribute('data-i', i);
      // Set a listern event on each input.
      sectionEls[i].inputs[j].addEventListener('click', onClick);
    }
  }

  function updateScores (total, scoreElm, scoreLevelElm, summaryScoreElm, summaryLevel) {
    if (total !== 0) {
      scoreElm.innerHTML = total;
    } else {
      scoreElm.innerHTML = '';
    }
    if (total === 0) {
      scoreLevelElm.innerHTML = '';
      summaryScoreElm.innerHTML = '';
    } else if (total > 0 && total <= 5) {
      scoreLevelElm.innerHTML = 'Low';
      summaryScoreElm.innerHTML = 'Low';
    } else if (total >= 6 && total <= 9) {
      scoreLevelElm.innerHTML = 'Medium';
      summaryScoreElm.innerHTML = 'Medium';
    } else {
      scoreLevelElm.innerHTML = 'High';
      summaryScoreElm.innerHTML = 'High';
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
      console.log(sectionEls[index]);
      sectionEls[index].selectedValues[e.target.name] = parseInt(e.target.value);
      updateSummary(e.target.name, e.target.value);
      // strategicListForm[e.target.name] = parseInt(e.target.value);
    } else {
      sectionEls[index].selectedValues[e.target.name] = 0;
      // strategicListForm[e.target.name] = 0;
    }
    sectionEls[index].total = getTotal(sectionEls[index].selectedValues);
    // strategicTotal = getTotal(strategicListForm);
    updateScores(sectionEls[index].total, sectionEls[index].scoreEl, sectionEls[index].levelEl, sectionEls[index].summaryScoreEl, sectionEls[index].summarylevelEl);
    // updateScores(strategicTotal, strategicScore, strategicRange, overallRangeScore, overallStrategicScore);
    updateTier();
  }
};
