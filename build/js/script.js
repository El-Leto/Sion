const navButton = document.querySelector('.nav__dropdown-button');
const navDropdown = document.querySelector('.nav__dropdown');
const navExtra = document.querySelector('.nav__extra');
const phoneButton = document.querySelector('.contacts__button--phone');
const mailButton = document.querySelector('.contacts__button--mail');
const phoneList = document.querySelector('.contacts-list-phone');
const mailList = document.querySelector('.contacts-list-mail');
const phoneWrap = document.querySelector('.contacts__phone-wrap');
const mailWrap = document.querySelector('.contacts__mail-wrap');
const sliderBorder = document.querySelectorAll('.slider__border');
const animateItems =  document.querySelectorAll('.animation');
const modalArea = document.querySelector('.modal');
const modalWrapper = document.querySelector('.modal__wrapper');
const orders = document.querySelectorAll('.order');

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
  phoneList.classList.remove('contacts-list-phone--closed');
  phoneList.classList.add('contacts-list-phone--opened');
  phoneButton.classList.add('contacts__button--phone-opened');
});

phoneWrap.addEventListener('mouseleave', function() {
  phoneList.classList.add('contacts-list-phone--closed');
  phoneList.classList.remove('contacts-list-phone--opened');
  phoneButton.classList.remove('contacts__button--phone-opened');
});

mailWrap.addEventListener('mouseenter', function() {
  mailList.classList.remove('contacts-list-mail--closed');
  mailList.classList.add('contacts-list-mail--opened');
  mailButton.classList.add('contacts__button--phone-opened');
});

mailWrap.addEventListener('mouseleave', function() {
  mailList.classList.add('contacts-list-mail--closed');
  mailList.classList.remove('contacts-list-mail--opened');
  mailButton.classList.remove('contacts__button--phone-opened');
});

for (let i = 0; i < orders.length; i++) {
  orders[i].addEventListener ('click', function(evt) {
    evt.preventDefault();
    modalArea.classList.add('modal--open');
  });
}

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
      const animationStart = 8;

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

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('form');

  form.addEventListener('submit', formSend);

  async function formSend(evt) {
    evt.preventDefault();

    let error = formValidate(form);

    let formData = new FormData(form);

    if(error === 0) {
      modalWrapper.classList.add('sending');
      let response = await fetch('sendmail.php', {
        method: 'POST',
        body: formData
      });
      if (response.ok) {
        let result = await response.json();
        alert(result.message);
        form.reset();
        modalWrapper.classList.remove('sending');
      } else {
          alert('Ошибка');
          modalWrapper.classList.remove('sending');
      }
    } else {
        alert('Заполните обязательные поля');
    }
  }

  function formValidate(form) {
    let error = 0;
    let formReq = document.querySelectorAll('.required')

    for (let i = 0; i < formReq.length; i++) {
      const input = formReq[i];
      formRemoveError(input);
      
      if(input.classList.contains('phone')) {
        if (phoneTest(input)) {
          formAddError(input);
          error++;
        }
      } else {
        if (input.value === '') {
          formAddError(input);
          error++;
        }
      }
    }
    return error;
  }
  

  function formAddError(input) {
    input.parentElement.classList.add('error');
    input.classList.add('error');
  }

  function formRemoveError(input) {
    input.parentElement.classList.remove('error');
    input.classList.remove('error');
  }

  function phoneTest(input) {
    return !/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/.test(input.value);
  }
});

//closeModal
modalArea.onmousedown = function (evt) {
  let target = evt.target;
  let modalWrapper = modalArea.getElementsByClassName('modal__wrapper')[0];
  if (target.closest('.' + modalWrapper.className) === null) {
    this.classList.remove('modal--open');
  }
};

document.addEventListener("keydown", (evt) => {
  if (evt.key === "Escape") {
    modalArea.classList.remove('modal--open');
  }
});
  
