document.addEventListener('DOMContentLoaded', e => {
  document.querySelector('.wrapper').classList.add('loaded');

  //MENU BURGER
  document.querySelector('.icon-menu').addEventListener('click', e => {
    e.target.closest('.icon-menu').classList.toggle('active');
    document.querySelector('.header__body').classList.toggle('active');
    document.querySelector('body').classList.toggle('lock');
  });
  $('.mobile-menu li').on('click', () => {
    $('.icon-menu').removeClass('active');
    $('.header__body').removeClass('active');
    $('body').removeClass('lock');
  });

  sliderWithIsotope();
  initSliders();
  window.addEventListener('load', function () {
    swiperMode();
  });
  window.addEventListener('resize', function () {
    swiperMode();
  });
  modalActions();
  linkTo();
  $("#phone").inputmask({ "mask": "+7(999) 999-9999" });
})
const arrow = document.querySelector('.goTop');

document.addEventListener('scroll', e => {
  if (document.documentElement.scrollTop > 1500) {
    if (!arrow.matches('.active')) {
      arrow.classList.add('active');
    }
  } else {
    if (arrow.matches('.active')) {
      arrow.classList.remove('active');

    }
  }
})

$(".goTop__inner").click(function () {
  $("html, body").animate({ scrollTop: 0 }, "slow");
  return false;
});

function sliderWithIsotope() {
  let mobile = window.matchMedia('(min-width: 0px) and (max-width: 768px)');
  let tablet = window.matchMedia('(min-width: 769px) and (max-width: 1024px)');
  let desktop = window.matchMedia('(min-width: 1025px)');

  let length = $('.best .best__row .swiper-slide:not(.swiper-slide-duplicate)').length;
  let loop = true;
  let slidesPerView = 4;


  function setUpSettingForSlider() {
    length = $('.best .best__row .swiper-slide:not(.swiper-slide-duplicate)').length;
    if (mobile.matches) {
      loop = false;
      slidesPerView = 1;
      $('.best .best__row .swiper-slide-duplicate').remove();
    }
    if (tablet.matches) {
      slidesPerView = 2;
      loop = true;
      if (length <= 2) {
        loop = false;
        $('.best .best__row .swiper-slide-duplicate').remove();
      }
    }
    if (desktop.matches) {
      slidesPerView = 4;
      loop = true;
      if (length <= 4) {
        loop = false;
        $('.best .best__row .swiper-slide-duplicate').remove();
      }
    }
  }
  setUpSettingForSlider();

  let bestSlider = new Swiper('.best .best__row', {
    // Optional parameters
    direction: 'horizontal',

    loop,
    // Navigation arrows
    navigation: {
      nextEl: '.best .arrR',
      prevEl: '.best  .arrL',
    },
    preventClicks: false,
    preventClicksPropagation: false,
    spaceBetween: 30,
    autoHeight: true,
    breakpoints: {
      320: {
        slidesPerView,
        spaceBetween: 50,
        allowTouchMove: true,
      },
      769: {
        slidesPerView,
        allowTouchMove: false,

      },
      1201: {
        slidesPerView,
        allowTouchMove: false,
      },
    },
    on: {
      init: function () {
        $('.best .youtube-link').grtyoutube();
      },
    },
  });

  window.addEventListener('resize', e => {
    bestSlider.destroy();
    setUpSettingForSlider();
    bestSlider = new Swiper('.best .best__row', {
      // Optional parameters
      direction: 'horizontal',
      allowTouchMove: false,

      loop,
      // Navigation arrows
      navigation: {
        nextEl: '.best .arrR',
        prevEl: '.best  .arrL',
      },
      spaceBetween: 30,
      autoHeight: true,
      breakpoints: {
        320: {
          slidesPerView,
          spaceBetween: 50,
        },
        769: {
          slidesPerView,
        },
        1201: {
          slidesPerView,
        },
      }
    });
    $('.best .swiper-slide-duplicate .youtube-link').grtyoutube();
  });

  let parent = '.best';
  $(".best__filter button").on("click", function () {
    let filter = $(this).data('filter-name').toLowerCase();
    $(".best__filter button")
    $(".best__filter button").removeClass("active");
    $(this).addClass("active");
    if (filter == "all") {
      length = document.querySelectorAll('.best .best__row .item:not(.swiper-slide-duplicate)').length;
      $(`${parent} [data-filter]`).removeClass("non-swiper-slide").addClass(`${parent} swiper-slide`).show();

      setUpSettingForSlider()

      bestSlider.destroy();
      bestSlider = new Swiper('.best .best__row', {
        // Optional parameters
        direction: 'horizontal',

        loop,
        // Navigation arrows
        navigation: {
          nextEl: '.best .arrR',
          prevEl: '.best  .arrL',
        },
        preventClicks: false,
        preventClicksPropagation: false,
        spaceBetween: 30,
        autoHeight: true,
        breakpoints: {
          320: {
            slidesPerView,
            spaceBetween: 50,
            allowTouchMove: true,
          },
          769: {
            slidesPerView,
            allowTouchMove: false,

          },
          1201: {
            slidesPerView,
            allowTouchMove: false,
          },
        }
      });
      $('.best .swiper-slide-duplicate .youtube-link').grtyoutube();

    }
    else {
      $(`${parent} .swiper-slide`).not("[data-filter='" + filter + "']").addClass("non-swiper-slide").removeClass(`swiper-slide`).hide(10);
      $(`${parent} .swiper-slide-duplicate.non-swiper-slide`).remove();
      $("[data-filter='" + filter + "']").removeClass("non-swiper-slide").addClass("swiper-slide").attr("style", null).show();

      setUpSettingForSlider();

      bestSlider.destroy();
      bestSlider = new Swiper('.best .best__row', {
        // Optional parameters
        direction: 'horizontal',

        loop,
        // Navigation arrows
        navigation: {
          nextEl: '.best .arrR',
          prevEl: '.best  .arrL',
        },
        preventClicks: false,
        preventClicksPropagation: false,
        spaceBetween: 30,
        autoHeight: true,
        breakpoints: {
          320: {
            slidesPerView,
            spaceBetween: 50,
            allowTouchMove: true,
          },
          769: {
            slidesPerView,
            allowTouchMove: false,

          },
          1201: {
            slidesPerView,
            allowTouchMove: false,
          },
        }
      });
      $('.best .swiper-slide-duplicate .youtube-link').grtyoutube();

    }
  })
}

function initSliders() {
  swiperMerch = new Swiper('.merch .merch__slider', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,

    // Navigation arrows
    navigation: {
      nextEl: '.merch .arrR',
      prevEl: '.merch  .arrL',
    },
    spaceBetween: 28,

    breakpoints: {
      320: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      1200: {
        slidesPerView: 4,
      },
    }
  });
  swiperTraining = new Swiper('.tutors .tutors__slider', {
    // Optional parameters
    loop: true,

    direction: 'horizontal',
    // Navigation arrows
    navigation: {
      nextEl: '.tutors .arrR',
      prevEl: '.tutors .arrL',
    },

    breakpoints: {

      1200: {
        slidesPerView: 3,
        spaceBetween: 182,

      },
    }
  });

  const specOfferSlider = new Swiper('.spec-offer__row', {
    // Optional parameters
    direction: 'horizontal',
    // Navigation arrows
    navigation: {
      nextEl: '.spec-offer  .arrR',
      prevEl: '.spec-offer  .arrL',
    },
    spaceBetween: 10,
    breakpoints: {
      320: {
        slidesPerView: 1,
        slidesPerGroup: 1,
      },
      769: {
        slidesPerGroup: 2,
        slidesPerView: 2,
        spaceBetween: 30
      },
    }
  });

  const eventsSlider = new Swiper('.events .events__carusel', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    spaceBetween: 28,

    // Navigation arrows
    navigation: {
      nextEl: '.events .arrR',
      prevEl: '.events  .arrL',
    },
    breakpoints: {
      320: {
        slidesPerView: 1,

      },
      769: {
        slidesPerView: 2,
      },
      1201: {
        slidesPerView: 4,
      },
    }
  });

  document.querySelectorAll('.vr-go__sliders .slider').forEach((slider, key) => {
    key = key + 1;
    let parent = `.vr-go__sliders .slider:nth-last-child(${key})`;
    new Swiper(`${parent + ' .slider__carusel'}`, {
      // Optional parameters
      direction: 'horizontal',
      loop: true,
      // cssMode: true,
      effect: "creative",
      creativeEffect: {
        prev: {
          // shadow: true,
          opacity: 0,
          translate: ["-20%", 0, -1]
        },
        next: {
          translate: ["100%", 0, 0]
        }
      },
      navigation: {
        nextEl: `${parent} .arrR`,
        prevEl: `${parent} .arrL`,
      },
      breakpoints: {
        320: {
          slidesPerView: 1,
          slidesPerGroup: 1,
        },
        768: {
          slidesPerView: 2,
          slidesPerGroup: 2,
        }
      }
    });
  });
}
let swiperSubscribe = '';
let swiperHeadsets = '';
let swiperRules = '';

let init = false;
function swiperMode() {
  let mobile = window.matchMedia('(min-width: 0px) and (max-width: 768px)');
  let tablet = window.matchMedia('(min-width: 769px) and (max-width: 1024px)');
  let desktop = window.matchMedia('(min-width: 1025px)');
  // Enable (for mobile)
  if (mobile.matches) {
    if (!init) {
      init = true;
      function tooltip() {
        $('.power-vr-man-items .dot').each(function (key, el) {
          tippy(`.power-vr-man-items .item:nth-child(${key + 1}) .dot`, {
            content: $(el).siblings('.text').text(),
            arrow: false,
          });
        });
      }
      tooltip();

      document.querySelectorAll('.merch__slider, .subscribe__gallery, .rules__slider, .headsets__slider').forEach(el => el.classList.add('swiper'));
      document.querySelectorAll('.merch__row, .subscribe__gallery .row, .rules__row, .headsets__row').forEach(el => el.classList.add('swiper-wrapper'));
      document.querySelectorAll('.merch .merch__item, .subscribe__gallery .row .item, .rules__row .item, .headsets__item').forEach(el => el.classList.add('swiper-slide'));


      swiperHeadsets = new Swiper('.headsets .headsets__slider', {
        // Optional parameters
        direction: 'horizontal',

        // Navigation arrows
        navigation: {
          nextEl: '.headsets .arrR',
          prevEl: '.headsets .arrL',
        },
        breakpoints: {
          320: {
            slidesPerView: 1,
            spaceBetween: 40
          },
        }
      });
      swiperRules = new Swiper('.rules .rules__slider', {
        // Optional parameters
        direction: 'horizontal',

        // Navigation arrows
        navigation: {
          nextEl: '.rules .arrR',
          prevEl: '.rules .arrL',
        },
        breakpoints: {
          320: {
            slidesPerView: 1,
            spaceBetween: 40
          },
        }
      });
      swiperSubscribe = new Swiper('.subscribe .subscribe__gallery', {
        // Optional parameters
        direction: 'horizontal',

        // Navigation arrows
        navigation: {
          nextEl: '.subscribe .arrR',
          prevEl: '.subscribe .arrL',
        },
        breakpoints: {
          320: {
            slidesPerView: 1,
            spaceBetween: 10
          },
        }
      });
    }
  }

  else if (tablet.matches || desktop.matches) {
    if (swiperSubscribe || swiperHeadsets || swiperRules) {
      swiperSubscribe.destroy();
      swiperHeadsets.destroy();
      swiperRules.destroy();

      document.querySelectorAll('.subscribe__gallery, .rules__slider, .headsets__slider').forEach(el => el.classList.remove('swiper'));
      document.querySelectorAll(' .subscribe__gallery .row, .rules__row, .headsets__row').forEach(el => el.classList.remove('swiper-wrapper'));
      document.querySelectorAll('.subscribe__gallery .row .item, .rules__row .item, .headsets__item').forEach(el => el.classList.remove('swiper-slide'));
      init = false;
    }
  }
}


function linkTo() {
  document.querySelectorAll('[data-href]').forEach(link => link.addEventListener('click', e => {
    window.location.href = `${e.currentTarget.getAttribute('data-href')}`;
  }));
}

function structureModal(e) {
  const img = e.querySelector('img');
  const date = e.querySelector('.date');
  const title = e.querySelector('.title');
  const subtitle = e.querySelector('.subtitle');
  const detailtitle = e.querySelector('.detailtitle');

  return {
    img,
    date,
    title,
    subtitle,
    detailtitle
  }
}

function modalActions() {
  const modal = document.querySelector('.modal');
  const inner = modal.querySelector('.modal__inner');
  document.querySelectorAll('[data-modal]').forEach(el => el
    .addEventListener('click', e => {
      modal.classList.add('active');
      document.body.classList.add('lock');

      if (e.currentTarget.getAttribute('data-modal') == 'event') {
        inner.classList.add('modal__inner_events');
        const { img, date, title, subtitle, detailtitle } = structureModal(e.currentTarget);

        modal.querySelector('.div img').src = img.src;
        modal.querySelector('.div .date').textContent = date.textContent;
        modal.querySelector('.div h3').textContent = title.textContent;
        modal.querySelector('.div p').textContent = detailtitle.textContent;

        const paragraph = document.querySelector('.modal p');

        paragraph.innerHTML = paragraph.innerHTML.replace(/(?:\r\n|\r|\n)/g, '<br>');

      }
      else {
        let title = $(e.currentTarget).attr('data-title');

        if (title !== undefined) {
          if (title.length > 0) {
            modal.querySelector('.modal__title').textContent = title;
            $(modal.querySelector('.modal__input_title')).val(title);
          }
        } else {
          modal.querySelector('.modal__title').textContent = 'Оставьте Заявку';
          $(modal.querySelector('.modal__input_title')).val('Оставьте Заявку');
        }
        inner.classList.remove('modal__inner_events');
      }
    })
  );

  document.querySelector('[data-close]')
    .addEventListener('click', e => {
      document.body.classList.remove('lock');
      modal.classList.remove('active')
    });
}

function replaceTextInMobileMenu() {
  let mobile = window.matchMedia('(min-width: 0px) and (max-width: 768px)');
  let tablet = window.matchMedia('(min-width: 769px) and (max-width: 1024px)');
  let desktop = window.matchMedia('(min-width: 1025px)');
  // Enable (for mobile)
  if (mobile.matches) {
    const changedData = [];
    $('.header__menu p').each(function () {
      changedData.push($(this).text());
      $(this.remove());
    });
    $('.header__menu li').eq(1).text(`${changedData[0]} ${changedData[1]}`);
    $('.header__menu li').eq(2).text(`${changedData[2].toLowerCase()} ${changedData[3].toLowerCase()}`);
  }
}
replaceTextInMobileMenu();

$('.youtube-link').grtyoutube();

//Как должен выглядеть блок html
//                       |
//                       |
//                       v
{/* <span class="youtube-link" youtubeid="yPu6qV5byu4">Open Video 1 - (dark theme - autoplay enabled)</span> */ }



$(function () {
  $('.vr-go__sliders .slider__inner  img').magnificPopup({
    type: 'image',
    closeOnContentClick: true,
    closeBtnInside: false,
    mainClass: 'mfp-no-margins mfp-with-zoom',
    image: {
      verticalFit: true
    },
    gallery: {
      // options for gallery
      enabled: true
    },
    callbacks: {
      elementParse: function (qw) {
        qw.src = qw.el.attr('src');
      }
    },
    zoom: {
      enabled: true,
      duration: 300 // don't foget to change the duration also in CSS
    }
  });
});




