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
const page = document.querySelector('.page');
const modalClose = document.querySelector('.modal__close');
const menuButton = document.querySelector('.header__menu-button');
const nav = document.querySelector('.nav');
const navList = document.querySelector('.nav__list');
const navDrop = document.querySelector('.nav__dropdown');
const navLink = document.querySelector('.nav__link--drop');

const body = document.querySelector('body');

let isMobile = {
	Android: function() {return navigator.userAgent.match(/Android/i);},
	BlackBerry: function() {return navigator.userAgent.match(/BlackBerry/i);},
	iOS: function() {return navigator.userAgent.match(/iPhone|iPad|iPod/i);},
  isIpad: function() {return navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1;},
	Opera: function() {return navigator.userAgent.match(/Opera Mini/i);},
	Windows: function() {return navigator.userAgent.match(/IEMobile/i);},
	any: function() {return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows() || isMobile.isIpad());}
};

isMobile.any() ? (body.classList.add('touch'), navDropdown.addEventListener('click', function() {
  if (phoneList.classList.contains('contacts-list-phone--open') || mailList.classList.contains('contacts-list-mail--open')) {
    phoneList.classList.remove('contacts-list-phone--open');
    phoneButton.classList.remove('contacts__button--phone-opened');
    mailList.classList.remove('contacts-list-mail--open');
    mailButton.classList.remove('contacts__button--phone-opened');
  }
  navExtra.classList.toggle('nav__extra--open');
  navButton.classList.toggle('nav__dropdown-button--opened');
})) : body.classList.add('mouse');

isMobile.any() ? (body.classList.add('touch'), phoneWrap.addEventListener('click', function() {
  if (navExtra.classList.contains('nav__extra--open') || mailList.classList.contains('contacts-list-mail--open')) {
    navExtra.classList.remove('nav__extra--open');
    navButton.classList.remove('nav__dropdown-button--opened');
    mailList.classList.remove('contacts-list-mail--open');
    mailButton.classList.remove('contacts__button--phone-opened');
  }
  phoneList.classList.toggle('contacts-list-phone--open');
  phoneButton.classList.toggle('contacts__button--phone-opened');
})) : body.classList.add('mouse');

isMobile.any() ? (body.classList.add('touch'), mailWrap.addEventListener('click', function() {
  if (phoneList.classList.contains('contacts-list-phone--open') || navExtra.classList.contains('nav__extra--open')) {
    phoneList.classList.remove('contacts-list-phone--open');
    phoneButton.classList.remove('contacts__button--phone-opened');
    navExtra.classList.remove('nav__extra--open');
    navButton.classList.remove('nav__dropdown-button--opened');
  }
  mailList.classList.toggle('contacts-list-mail--open');
  mailButton.classList.toggle('contacts__button--phone-opened');
})) : body.classList.add('mouse');



//add Modal

for (let i = 0; i < orders.length; i++) {
  orders[i].addEventListener ('click', function(evt) {
    evt.preventDefault();
    modalArea.classList.add('modal--open');
    page.classList.add('page-modal');
  });
}

//slider
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

//animation
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

//menu-open

const toggle = () => {
  menuButton.classList.toggle('header__menu-button--closed');
  nav.classList.toggle('nav--opened');
  navExtra.classList.remove('nav__extra--open');
  console.log('test');
}

const close = () => {
  menuButton.classList.add('header__menu-button--closed');
  nav.classList.remove('nav--opened');
  navExtra.classList.remove('nav__extra--open');
  console.log('test1');
}

document.addEventListener('click', function(evt) {
  const target = evt.target;

  console.log(target);

  target === menuButton ? toggle() : target !== navLink ? close() : false;
});


// //send formModal?
// document.addEventListener('DOMContentLoaded', function () {
//   const form = document.getElementById('form');

//   form.addEventListener('submit', formSend);

//   async function formSend(evt) {
//     evt.preventDefault();

//     let error = formValidate(form);

//     let formData = new FormData(form);

//     if (error === 0) {
//       modalWrapper.classList.add('sending');
//       let response = await fetch('sendmail.php', {
//         method: 'POST',
//         body: formData
//       });
//       if (response.ok) {
//         let result = await response.json();
//         alert(result.message);
//         form.reset();
//         modalWrapper.classList.remove('sending');
//       } else {
//           alert(response.status);
//           modalWrapper.classList.remove('sending');
//       }
//     } else {
//       alert('Test');
//     }
//   }

//   function formValidate(form) {
//     let error = 0;
//     let formReq = document.querySelectorAll('.required')

//     for (let i = 0; i < formReq.length; i++) {
//       const input = formReq[i];
//       formRemoveError(input);
      
//       if(input.classList.contains('phone')) {
//         if (phoneTest(input)) {
//           formAddError(input);
//           error++;
//         }
//       } else {
//         if (input.value === '') {
//           formAddError(input);
//           error++;
//         }
//       }
//     }
//     return error;
//   }
  

//   function formAddError(input) {
//     input.parentElement.classList.add('error');
//     input.classList.add('error');
//   }

//   function formRemoveError(input) {
//     input.parentElement.classList.remove('error');
//     input.classList.remove('error');
//   }

//   function phoneTest(input) {
//     return !/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/.test(input.value);
//   }
// });

// //send formFooter
// document.addEventListener('DOMContentLoaded', function () {
//   const form = document.getElementById('formfooter');

//   form.addEventListener('submit', formSend);

//   async function formSend(evt) {
//     evt.preventDefault();

//     let error = formValidate(form);

//     let formData = new FormData(form);

//     if (error === 0) {
//       let response = await fetch('sendmail.php', {
//         method: 'POST',
//         body: formData
//       });
//       if (response.ok) {
//         let result = await response.json();
//         alert(result.message);
//         form.reset();
//       } else {
//           alert(response.status);
//       }
//     } else {
//       alert('Test');
//     }
//   }

//   function formValidate(form) {
//     let error = 0;
//     let formReq = document.querySelectorAll('.required-footer')

//     for (let i = 0; i < formReq.length; i++) {
//       const input = formReq[i];
//       formRemoveError(input);
      
//       if(input.classList.contains('phone')) {
//         if (phoneTest(input)) {
//           formAddError(input);
//           error++;
//         }
//       } else {
//         if (input.value === '') {
//           formAddError(input);
//           error++;
//         }
//       }
//     }
//     return error;
//   }
  

//   function formAddError(input) {
//     input.parentElement.classList.add('error');
//     input.classList.add('error');
//   }

//   function formRemoveError(input) {
//     input.parentElement.classList.remove('error');
//     input.classList.remove('error');
//   }

//   function phoneTest(input) {
//     return !/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/.test(input.value);
//   }
// });

//closeModal
modalArea.onmousedown = function (evt) {
  let target = evt.target;
  let modalWrapper = modalArea.getElementsByClassName('modal__wrapper')[0];
  if (target.closest('.' + modalWrapper.className) === null) {
    this.classList.remove('modal--open');
    page.classList.remove('page-modal');
  }
};

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    modalArea.classList.remove('modal--open');
    page.classList.remove('page-modal');
  }
});

modalClose.addEventListener('click', (evt) => {
  modalArea.classList.remove('modal--open');
  page.classList.remove('page-modal');
});
  
