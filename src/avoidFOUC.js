// Avoid FOUC on load
document.body.style.display = 'none';
let now = Date.now();
let interval = setInterval(() => {
  if (
    getComputedStyle(document.body).fontFamily.length > 100 ||
    Date.now() - now > 2000
  ) {
    clearInterval(interval);
    document.body.style.display = '';
  }
}, 50);
 