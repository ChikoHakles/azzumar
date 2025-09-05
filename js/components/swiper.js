var $win = $(window);
$win.load(function(){
    // Swiper Clients
    var swiper = new Swiper('.swiper-clients', {
        speed: 5000,
        autoplay: 1,
        autoplayDisableOnInteraction: false,
        grabCursor: true,
        slidesPerView: 5,
        spaceBetween: 50,
        loop: true,
        breakpoints: {
            1024: {
                slidesPerView: 4,
                spaceBetween: 50
            },
            992: {
                slidesPerView: 3,
                spaceBetween: 40
            },
            768: {
                slidesPerView: 3,
                spaceBetween: 30
            },
            600: {
                slidesPerView: 2,
                spaceBetween: 30
            },
            480: {
                slidesPerView: 1,
                spaceBetween: 0
            }
        }
    });

    // Swiper Clients
    var swiper = new Swiper('.swiper-testimonials', {
        speed: 1000,
        autoplay: 10000,
        slidesPerView: 1,
        loop: true,
    });
});
function debounce(fn, delay){
    var t; return function(){ clearTimeout(t); t = setTimeout(fn, delay); };
}

$win.on('resize orientationchange', debounce(function(){
    if (!swiper) return;
    try {
      swiper.update(true);       
      swiper.stopAutoplay && swiper.stopAutoplay(); 
      swiper.startAutoplay && swiper.startAutoplay(); 
    } catch(e) { /* no-op */ }
}, 200));