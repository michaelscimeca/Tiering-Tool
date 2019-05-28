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

  function values (form, total, scoreElm, range, overalRange, overalTotal, overalElm) {
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
      range.innerHTML = '';
      overalRange.innerHTML = '';
    } else if (total > 0 && total <= 5) {
      range.innerHTML = 'Low';
      overalRange.innerHTML = 'Low';
    } else if (total >= 6 && total <= 9) {
      range.innerHTML = 'Medium';
      overalRange.innerHTML = 'Medium';
    } else {
      range.innerHTML = 'High';
      overalRange.innerHTML = 'high';
    }
    tierSet(total, overalTotal);

    overalElm.innerHTML = total;
  }

  function tierSet (total, overalTotal) {
    if ((total + overalTotal) > 19) {
      tier.innerHTML = 1;
    } else if ((total + overalTotal) > 15) {
      tier.innerHTML = 2;
    } else if ((total + overalTotal) > 8) {
      tier.innerHTML = 3;
    } else if ((total + overalTotal) > 0) {
      tier.innerHTML = 4;
    }
  }

  function onClick (e) {
    if (e.target.checked) {
      strategicListForm[e.target.name] = parseInt(e.target.value);
    } else {
      strategicListForm[e.target.name] = 0;
    }
    values(strategicListForm, strategicTotal, strategicScore, strategicRange, overallRangeScore, complexityTotal, overallStrategicScore);
  }
  for (let i = 0; i < strategicList.length; i++) {
    strategicListForm[strategicList[i].name] = 0;
    strategicList[i].addEventListener('click', onClick);
  }

  function onClickComplexity (e) {
    if (e.target.checked) {
      complexityListForm[e.target.name] = parseInt(e.target.value);
    } else {
      complexityListForm[e.target.name] = 0;
    }
    values(complexityListForm, complexityTotal, complexityScore, complexityRange, overallComplexityRange, complexityTotal, overallComplexityScore);
  }
  for (let i = 0; i < complexityList.length; i++) {
    complexityListForm[complexityList[i].name] = 0;
    complexityList[i].addEventListener('click', onClickComplexity);
  }
};
