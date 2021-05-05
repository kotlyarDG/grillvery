$(document).ready(function () {
	$('.header__burger').click(function (event) {
		$('.header__burger,.burger__menu').toggleClass('_active')
		$('body').toggleClass('_lock');
	});

	let items = JSON.parse(sessionStorage.getItem('products'));
	console.log(items);
});