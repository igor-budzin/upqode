$(document).ready(function() {
  $('body').addClass('js');
    var $menu = $('#menu'),
        $menulink = $('.menu-link'),
        $menuTrigger = $('.has-subnav');

  $menulink.click(function(e) {
    e.preventDefault();
    $menulink.toggleClass('active');
    $menu.toggleClass('active');
  });

  $menuTrigger.click(function(e) {
    e.preventDefault();
    var $this = $(this);
    $this.toggleClass('active').next('ul').toggleClass('active');
  });

  $(window).resize(function() {
    var viewportWidth = $(window).width();
      if (viewportWidth > 925) {
        $("#menu").removeClass("active");
      }
  });

  function animateBar() {
    $('.about__progress .bar').each(function() {
      var persent = $(this).closest('.about__progress').data('persent');
      var _this = this;

      $(this).animate({
        width: persent + '%'
      }, 4000);

      $({ countNum: 0 }).animate({ countNum: persent }, {
        duration: 4000,
        easing: 'linear',
        step: function() {
          $(_this).closest('.about__progress').find('.persent').text(Math.round(this.countNum) + '%')
        }
      });
  });
  }

  var $window = $(window);
  var $elem = $(".about")

  function isScrolledIntoView($elem, $window) {
    var docViewTop = $window.scrollTop();
    var docViewBottom = docViewTop + $window.height();

    var elemTop = $elem.offset().top;
    var elemBottom = elemTop + $elem.height();

    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
  }

  $(document).on("scroll", function () {
    if(isScrolledIntoView($elem, $window) && !$elem.hasClass('animate')) {
      animateBar();
      $elem.addClass("animate");
    }
  });

  $('nav ul > li a').on('click', function(event) {
    event.preventDefault();
    var navHeight = $('header').outerHeight();

    $('html, body').animate({
      scrollTop: $('#' + $(this).data('section')).offset().top - navHeight + 20
    }, 500);
    
    return false;
  });


  $(window).on('scroll', function () {
    var scrollTop = $(this).scrollTop();

    $('section').each(function() {
      var top = $(this).offset().top - $('nav').outerHeight(),
          bottom = top + $(this).outerHeight();
      
      if (scrollTop >= top && scrollTop <= bottom) {
        $('nav').find('a').removeClass('active');
        $('section').removeClass('current');
        
        $(this).addClass('current');
        $('nav').find('a[data-section="' + $(this).attr('id') + '"]').addClass('active');
      }
    });
  });

  $('.hero__slider').slick({
    dots: true,
    autoplaySpeed: Math.floor(Math.random() * 3000 + 4000),
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    dotsClass: 'hero__hero-dots',
    initialSlide: 1,
    prevArrow: $('.hero__btn-prev'),
    nextArrow: $('.hero__btn-next'),
  });

  $('.products__slider').slick({
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    dotsClass: 'products__dots',
    initialSlide: 1,
    arrows: false
  });

  $("#contact-from").validate();

});