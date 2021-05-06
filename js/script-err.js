$(document).ready(function () {
	$('.header__burger').click(function (event) {
		$('.header__burger,.burger__menu').toggleClass('_active')
		$('body').toggleClass('_lock');
	});

	getContacts();

});

function getContacts() {
	$.ajax({
		type: "GET",
		url: `${serverUrl}/configs`,
		success: function (data) {
			console.log(data);
			$('.header__contact-phone').html(`${data['CONFIG_PHONE']}`);
			$('.header__contact-phone').attr('href', `tel:${data['CONFIG_PHONE']}`);
			$('.header__contact-item--insta').attr('href', `${data['CONFIG_INSTA']}`);
			$('.header__contact-item--facebook').attr('href', `${data['CONFIG_VK']}`);
			$('.header__contact-item--telegram').attr('href', `${data['CONFIG_TG']}`);



		},
		error: function (errMsg) {
			console.log("Error: ", errMsg)
		},
		contentType: "application/json; charset=utf-8",
		dataType: "json",
	});
}