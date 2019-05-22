'use strict';
module.exports = function () {
  const strategicList = document.querySelectorAll('#strategic input');
  const strategicScore = document.querySelector('#strategic-totalScore span');
  const strategicRange = document.querySelector('#strategic-range span');
  let strategicListForm = {};
  let strategicTotal = 0;
  const complexityList = document.querySelectorAll('#complexity input');
  const complexityScore = document.querySelector('#complexity-totalScore span');
  const complexityRange = document.querySelector('#complexity-range span');

  const overallStrategicScore = document.querySelector('#overall-strategic-score span');
  const overallRangeScore = document.querySelector('#overall-strategic-range span');
  const overallComplexityScore = document.querySelector('#overall-Complexity-score span');
  const overallComplexityRange = document.querySelector('#overall-Complexity-range span');

  const tier = document.querySelector('#overall-tier span');
  let complexityListForm = {};
  let complexityTotal = 0;
  let totalAmount = 0;


  function strategicAddValues () {
    strategicTotal = 0;
    for (let val in strategicListForm) {
      if (strategicListForm.hasOwnProperty(val)) {
        strategicTotal += strategicListForm[val];
      }
    }
    if (strategicTotal !== 0) {
      strategicScore.innerHTML = strategicTotal;
    } else {
      strategicScore.innerHTML = '';
    }
    if (strategicTotal === 0) {
      strategicRange.innerHTML = '';
      overallRangeScore.innerHTML = '';
    } else if (strategicTotal > 0 && strategicTotal <= 5) {
      strategicRange.innerHTML = 'Low';
      overallRangeScore.innerHTML = 'Low';
    } else if (strategicTotal >= 6 && strategicTotal <= 9) {
      strategicRange.innerHTML = 'Medium';
      overallRangeScore.innerHTML = 'Medium';
    } else {
      strategicRange.innerHTML = 'High';
      overallRangeScore.innerHTML = 'high';
    }

    if ((strategicTotal + complexityTotal) > 19) {
      tier.innerHTML = 1;
    } else if ((strategicTotal + complexityTotal) > 15) {
      tier.innerHTML = 2;
    } else if ((strategicTotal + complexityTotal) > 8) {
      tier.innerHTML = 3;
    } else if ((strategicTotal + complexityTotal) > 0) {
      tier.innerHTML = 4;
    }
    totalAmount = strategicTotal + complexityTotal;
    overallStrategicScore.innerHTML = strategicTotal;
  }
  function onClick (e) {
    if (e.target.checked) {
      strategicListForm[e.target.name] = parseInt(e.target.value);
    } else {
      strategicListForm[e.target.name] = 0;
    }
    strategicAddValues();
  }
  for (let i = 0; i < strategicList.length; i++) {
    strategicListForm[strategicList[i].name] = 0;
    strategicList[i].addEventListener('click', onClick);
  }

  function complexityAddValues () {
    complexityTotal = 0;
    for (let val in complexityListForm) {
      if (complexityListForm.hasOwnProperty(val)) {
        complexityTotal += complexityListForm[val];
      }
    }
    if (complexityTotal !== 0) {
      complexityScore.innerHTML = complexityTotal;
      overallComplexityScore.innerHTML = complexityTotal;
    } else {
      complexityScore.innerHTML = '';
      overallComplexityScore.innerHTML = '';
    }
    if (complexityTotal === 0) {
      complexityRange.innerHTML = '';
      overallComplexityRange.innerHTML = '';
    } else if (complexityTotal > 0 && complexityTotal <= 5) {
      complexityRange.innerHTML = 'Low';
      overallComplexityRange.innerHTML = 'Low';
    } else if (complexityTotal >= 6 && complexityTotal <= 9) {
      complexityRange.innerHTML = 'Medium';
      overallComplexityRange.innerHTML = 'Medium';
    } else {
      complexityRange.innerHTML = 'High';
      overallComplexityRange.innerHTML = 'High';
    }

    if ((strategicTotal + complexityTotal) > 19) {
      tier.innerHTML = 1;
    } else if ((strategicTotal + complexityTotal) > 15) {
      tier.innerHTML = 2;
    } else if ((strategicTotal + complexityTotal) > 8) {
      tier.innerHTML = 3;
    } else if ((strategicTotal + complexityTotal) > 0) {
      tier.innerHTML = 4;
    }
    totalAmount = strategicTotal + complexityTotal;
  }
  function onClickComplexity (e) {
    if (e.target.checked) {
      complexityListForm[e.target.name] = parseInt(e.target.value);
    } else {
      complexityListForm[e.target.name] = 0;
    }
    complexityAddValues();
  }
  for (let i = 0; i < complexityList.length; i++) {
    complexityListForm[complexityList[i].name] = 0;
    complexityList[i].addEventListener('click', onClickComplexity);
  }
};
