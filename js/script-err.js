$(document).ready(function () {
	$('.header__burger').click(function (event) {
		$('.header__burger,.burger__menu').toggleClass('_active')
		$('body').toggleClass('_lock');
	});

	$('.basket').scroll(function () {

		if ($(this).scrollTop() > 0) {
			$('.header').css('background', "rgba(0, 0, 0, 0.5)");
		} else {
			$('.header').css('background', "transparent");

		}
	});
});