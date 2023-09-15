Index = {
  init: function(){


    // Dark mode

    $(".darkmode-trigger").click(function(e) {
      $("body").toggleClass("darkmode-skin");
      $(".community-light, .community-dark, .professional-light, .professional-dark, .contractor-light, .contractor-dark, .logo-black, .logo-white").toggle();
      e.stopPropagation();
    });


    // Mobile menu

    $(".menu-trigger").click(function(e) {
      $("header nav").toggle();
      e.stopPropagation();
    });


    // Slider

    $('.flexslider').flexslider({
      animation: "slide"
    });


    // Header

    function resizeHeaderOnScroll() {

      var jsheader = $('#js-header');

      const distanceY = window.pageYOffset || document.documentElement.scrollTop,
      shrinkOn = 120;

      if (distanceY > shrinkOn) {
        jsheader.removeClass("home-header fade-in");
      }

      else {
        jsheader.addClass("home-header fade-in");
      }
    }

    window.addEventListener('scroll', resizeHeaderOnScroll);

  }
}

$(document).ready(function() {
  Index.init();
});
