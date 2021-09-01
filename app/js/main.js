// $ - Сначала html
$(function(){

    $(".rate-star").rateYo({
        rating: 3.5,
        starWidth: "12px",
        readOnly: true
    });

    $(".product-slider__inner").slick({ // slick слайдер
        slidesToShow: 4,
        slidesToScroll: 4,
        dots: true,
        arrows: false,
    });

    var mixer = mixitup('.products__inner-box');
});