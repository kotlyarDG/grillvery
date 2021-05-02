

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
		$('.header__burger,.burger__menu,.header').toggleClass('_active')
		$('body').toggleClass('_lock');
	});



	ibg();

	AOS.init({
		once: true

	}
	);

	$('.first__bg-img').addClass('open');

	$('.popup__link').click(function (e) {
		e.preventDefault();
		let link = $(this).attr('href');
		$('.popup-black').addClass('open');
		$('#' + link).addClass('open');
		$('body').addClass('_lock');

		console.log(link);
	});

	$('.popup-black').click(function () {
		$('.popup').removeClass('open');
		$('.popup-black').removeClass('open');
		$('body').removeClass('_lock');

	});

	$('.popup__close').click(function () {
		$('.popup').removeClass('open');
		$('.popup-black').removeClass('open');
		$('body').removeClass('_lock');

	})

	$('.select').select2({
		minimumResultsForSearch: Infinity
	});

	console.log($('#l1').data('top'));

	let elementsLeftTop = $('.parallax-img-left-top');
	let elementsRightTop = $('.parallax-img-right-top');
	let elementsLeftbottom = $('.parallax-img-left-bottom');
	let elementsRightbottom = $('.parallax-img-right-bottom');



	$(document).mousemove(function (e) {
		// $('#l1').css({
		// 	'top': 70 - (e.pageY / 100),
		// 	'left': 100 - (e.pageX / 100)
		// });

		// console.log($('#l1').data('top'))


		// $('.parallax-img').css({
		// 	'top': +$(this).data('top') - (e.pageY / 100),
		// 	'left': +$(this).data('left') - (e.pageX / 100)
		// })

		$.each(elementsLeftTop, function () {
			$(this).css({
				'top': $(this).data('top') - (e.pageY / 30),
				'left': $(this).data('left') + (e.pageX / 90)
			})
		});

		$.each(elementsRightTop, function () {
			$(this).css({
				'top': $(this).data('top') - (e.pageY / 70),
				'right': $(this).data('right') - (e.pageX / 40)
			})
		});

		$.each(elementsLeftbottom, function () {
			$(this).css({
				'bottom': $(this).data('bottom') + (e.pageY / 210),
				'left': $(this).data('left') - (e.pageX / 20)
			})
		});

		$.each(elementsRightbottom, function () {
			$(this).css({
				'bottom': $(this).data('bottom') - (e.pageY / 220),
				'right': $(this).data('right') - (e.pageX / 150)
			})
		});
	})
});