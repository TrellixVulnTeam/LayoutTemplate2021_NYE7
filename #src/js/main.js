document.querySelector('.wrapper').classList.add('loaded');

//MENU BURGER
// document.querySelector('.icon-menu__item').addEventListener('click', e => {
//   e.classList.toggle('active');
//   document.querySelector('.menu__body').classList.toggle('active');
//   document.querySelector('body').classList.toggle('lock');
// });

//INTERACTIVE BACKGROUND
function ibg() {
  document.querySelectorAll('.ibg').forEach(ibg => {
    if (ibg.querySelector('img')) {
      ibg.style.backgroundImage = `url(${ibg.querySelector('img').getAttribute('src')})`;
    }
  });
}
// ibg();




