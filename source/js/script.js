const navButton = document.querySelector('.nav__dropdown-button');
const navDropdown = document.querySelector('.nav__dropdown');
const navExtra = document.querySelector('.nav__extra');
const phoneButton = document.querySelector('.contacts__button--phone');
const phoneList = document.querySelector('.contacts-list');
const phoneWrap = document.querySelector('.contacts__phone-wrap');
const sliderBorder = document.querySelectorAll('.slider__border');
const animateItems =  document.querySelectorAll('.animation');

navDropdown.addEventListener('mouseenter', function() {
  navExtra.classList.remove('nav__extra--closed');
  navExtra.classList.add('nav__extra--opened');
  navButton.classList.add('nav__dropdown-button--opened');
});

navDropdown.addEventListener('mouseleave', function() {
  navExtra.classList.add('nav__extra--closed');
  navExtra.classList.remove('nav__extra--opened');
  navButton.classList.remove('nav__dropdown-button--opened');
});

phoneWrap.addEventListener('mouseenter', function() {
  phoneList.classList.remove('contacts-list--closed');
  phoneList.classList.add('contacts-list--opened');
  phoneButton.classList.add('contacts__button--phone-opened');
});

phoneWrap.addEventListener('mouseleave', function() {
  phoneList.classList.add('contacts-list--closed');
  phoneList.classList.remove('contacts-list--opened');
  phoneButton.classList.remove('contacts__button--phone-opened');
});

function initSlider(elem, duration) {
  let img = document.querySelectorAll('.slider__image');
  let i = 0;
  Array.prototype.forEach.call(img, function (e) {
      if(i === 0){
          e.style.display = 'block';
          e.classList.add('slider__image--active');
      }else{
          e.style.display = 'none';
      }
      i++;
  });

  setTimeout(function() {    
      i = 0;             
      slideImage();
  }, duration);
  
  function slideImage() {
      img = document.querySelectorAll('.slider__image');
      img[i].classList.remove('slider__image--active');
      setTimeout(function() {                 
          img[i].style.display = 'none';
          i++;
          if(i === img.length) { i = 0; }
          img[i].style.display = 'block';
          setTimeout(function() {                 
              img[i].classList.add('slider__image--active');
          }, 0);
         
      }, 0);
      setTimeout(function() {                 
          slideImage();
      }, duration);
  }
}

initSlider('.slider', 2000);

if (animateItems.length > 0) {
  window.addEventListener('scroll', animationOnScroll);
  function animationOnScroll() {
    for (let i = 0; i < animateItems.length; i++) {
      const animationItem = animateItems[i];
      const animationItemHeight = animationItem.offsetHeight;
      const animationItemOffset = offset(animationItem).top;
      const animationStart = 4;

      let animationPoint = window.innerHeight - animationItemHeight / animationStart;
      if (animationItemHeight > window.innerHeight) {
        animationPoint = window.innerHeight - window.innerHeight / animationStart;
      }

      if ((scrollY > animationItemOffset - animationPoint) && scrollY < (animationItemOffset + animationItemHeight)) {
        animationItem.classList.add('active');
      } else {
        if (!animationItem.classList.contains('animation-no-repeat')) {
          animationItem.classList.remove('active');
        }
      }
    }
  }

  function offset(el) {
    const rect = el.getBoundingClientRect(),
       scrollLeft = window.scrollX || document.documentElement.scrollLeft,
       scrollTop = window.scrollY || document.documentElement.scrollTop;
    return {
       top: rect.top + scrollTop,
       left: rect.left + scrollLeft
    }
 }

 setTimeout(() => {
  animationOnScroll();
 }, 100);
}
