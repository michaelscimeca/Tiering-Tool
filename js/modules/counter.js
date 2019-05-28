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

  function values (form, total, scoreElm, scoreRange, overallScore, overallScoreElm) {
    total = 0;
    for (let val in form) {
      if (form.hasOwnProperty(val)) {
        total += form[val];
      }
    }
    if (total !== 0) {
      scoreElm.innerHTML = total;
    } else {
      scoreElm.innerHTML = '';
    }
    if (total === 0) {
      scoreRange.innerHTML = '';
      overallScore.innerHTML = '';
    } else if (total > 0 && total <= 5) {
      scoreRange.innerHTML = 'Low';
      overallScore.innerHTML = 'Low';
    } else if (total >= 6 && total <= 9) {
      scoreRange.innerHTML = 'Medium';
      overallScore.innerHTML = 'Medium';
    } else {
      scoreRange.innerHTML = 'High';
      overallScore.innerHTML = 'high';
    }
    setTier(total, complexityTotal);
    overallScoreElm.innerHTML = strategicTotal;
  }

  function setTier (total, complexityTotal) {
    if ((total + complexityTotal) > 19) {
      tier.innerHTML = 1;
    } else if ((total + complexityTotal) > 15) {
      tier.innerHTML = 2;
    } else if ((total + complexityTotal) > 8) {
      tier.innerHTML = 3;
    } else if ((total + complexityTotal) > 0) {
      tier.innerHTML = 4;
    }
  }

  function onClick (e) {
    if (e.target.checked) {
      strategicListForm[e.target.name] = parseInt(e.target.value);
    } else {
      strategicListForm[e.target.name] = 0;
    }
    values(strategicListForm, strategicTotal, strategicScore, strategicRange, overallRangeScore, overallStrategicScore);
  }
  for (let i = 0; i < strategicList.length; i++) {
    strategicListForm[strategicList[i].name] = 0;
    strategicList[i].addEventListener('click', onClick);
  }

  function complexityAddValues (form) {
    complexityTotal = 0;
    for (let val in form) {
      if (form.hasOwnProperty(val)) {
        complexityTotal += form[val];
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
  }
  function onClickComplexity (e) {
    if (e.target.checked) {
      complexityListForm[e.target.name] = parseInt(e.target.value);
    } else {
      complexityListForm[e.target.name] = 0;
    }
    values(complexityListForm, complexityTotal, complexityScore, complexityRange, overallComplexityRange, overallComplexityScore);
  }
  for (let i = 0; i < complexityList.length; i++) {
    complexityListForm[complexityList[i].name] = 0;
    complexityList[i].addEventListener('click', onClickComplexity);
  }
};
