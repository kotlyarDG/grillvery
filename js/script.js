

$(document).ready(function () {

	function ibg() {

		$.each($('.ibg'), function (index, val) {

			if ($(this).find('img').length > 0) {
				$(this).css('background-image', 'url("' + $(this).find('img').attr('src') + '")');
			}

		});
	}

	$('.second__items').slick({
		arrows: false,
		dots: true,
		fade: true,
		speed: 500,
		cssEase: 'linear',
		autoplay: true
	});

	$('.header__burger').click(function (event) {
		$('.header__burger,.burger__menu').toggleClass('_active')
		$('body').toggleClass('_lock')
	});


	$(window).scroll(function () {

		if ($(this).scrollTop() > 0) {
			$('.header').css('background', "rgba(0, 0, 0, 0.5)");
		} else {
			$('.header').css('background', "transparent");

		}
	});

	ibg();

	AOS.init();

	$('.first__bg-img').addClass('open');
});