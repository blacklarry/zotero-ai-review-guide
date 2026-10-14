(() => {
  'use strict';
  let closedDetails = [];
  window.addEventListener('beforeprint', () => {
    closedDetails = [...document.querySelectorAll('#app details:not([open])')];
    closedDetails.forEach(detail => { detail.open = true; });
  });
  window.addEventListener('afterprint', () => {
    closedDetails.forEach(detail => { detail.open = false; });
    closedDetails = [];
  });
  document.addEventListener('click', event => {
    if (event.target.closest('[data-print]')) window.print();
  });
})();
