const serverUrl = 'https://grillivery.com.ua/api';


$(document).ready(function () {
	$('.header__burger').click(function (event) {
		$('.header__burger,.burger__menu,.header').toggleClass('_active')
		$('body').toggleClass('_lock');
	});



	getItems();

	getContacts();

	getSum();


	$('.form').submit(function (e) {
		sendOrder();
		e.preventDefault();
	});
});

function getSum() {
	let items = $('.item-basket__price');
	let sum = 0;
	if (items.length > 0) {
		for (let item of items) {
			sum = sum + +$(item).text();
		}
		console.log(sum)
		$('.basket__sum-wrap').html(
			`
			<div class="basket__sum-content">
					Cума: ${sum} грн.
				</div>
			`
		)
	} else {
		$(location).attr('href', 'https://grillivery.com.ua');

		$('.basket__sum-content').remove();
	}
}

function getItems() {
	let items = JSON.parse(sessionStorage.getItem('products'));
	console.log(items);

	for (let item of items) {
		console.log(item);


		if (item['type']) {
			let typeItem = item['prod']['positions'].find(x => x.id == item['type']);
			let typeName = typeItem['type'];
			let typeId = typeItem['id'];

			$('.basket__items').append(
				`
				<div data-id="${typeId}" class="item-basket">
						<p class="item-basket__name">${item['prod']['title']} ${typeName}</p>
						<p class="item-basket__price">${item['prod']['price'] * item['count']}</p>
						<div class="item-third__count-wrap">
							<button class="item-third__count-btn item-third__count-btn--plus">+</button>
							<p data-price="${item['prod']['price']}" class="item-third__count-value">${item['count']}</p>
							<button class="item-third__count-btn item-third__count-btn--minus">-</button>
						</div>
						<button class="item-third__add-btn delete-btn">ВИЛУЧИТИ</button>
	
					</div>
				`
			);
		} else {
			let typeId = item['prod']['positions'][0]['id'];
			$('.basket__items').append(
				`
				<div data-id="${typeId}" class="item-basket">
						<p class="item-basket__name">${item['prod']['title']}</p>
						<p class="item-basket__price">${item['prod']['price'] * item['count']}</p>
						<div class="item-third__count-wrap">
							<button class="item-third__count-btn item-third__count-btn--plus">+</button>
							<p data-price="${item['prod']['price']}" class="item-third__count-value">${item['count']}</p>
							<button class="item-third__count-btn item-third__count-btn--minus">-</button>
						</div>
						<button class="item-third__add-btn delete-btn">ВИЛУЧИТИ</button>
	
					</div>
				`
			);
		}

	}

	$('.delete-btn').click(function () {
		$(this).closest('.item-basket').remove();
		getSum();


	});

	$('.item-third__count-btn--plus').click(function (e) {
		let countWrap = $(this).next();
		let count = +$(countWrap).text() + 1;

		$(countWrap).html(count);
		let priceWrap = $(this).closest('.item-third__count-wrap').prev();

		$(priceWrap).html(count * +$(countWrap).data('price'));
		getSum();
	});

	$('.item-third__count-btn--minus').click(function (e) {
		let countWrap = $(this).prev();
		let priceWrap = $(this).closest('.item-third__count-wrap').prev();

		let count = +$(countWrap).text();

		if (count > 1) {
			count = count - 1;
			$(countWrap).html(count);

			$(priceWrap).html(count * +$(countWrap).data('price'));
			getSum();

		}
	});
}

function sendOrder() {
	let name = $('#name').val();
	let address = $('#street').val() + ' ' + $('#house').val() + ' ' + $('#flat').val();
	let time = $('#time').val();
	let comment = $('#comment').val();
	let phone = $('#phone').val();

	let positions = [];

	let items = $('.item-basket');

	if (items.length > 0) {
		for (let item of items) {
			console.log(item);
			let itemId = $(item).data('id');
			let itemCount = +$(item).find('.item-third__count-value').text();

			positions.push({ 'position_id': itemId, 'count': itemCount });
		}

		let dataToSend = {
			'name': name,
			'address': address,
			'time': time,
			'comment': comment,
			'positions': positions,
			'phone': phone
		}

		console.log(dataToSend);

		$.ajax({
			type: "POST",
			url: `${serverUrl}/add_order`,
			data: dataToSend,
			success: function (msg) {
				console.log(msg);
				$('.popup').addClass('open');
				$('.popup-black').addClass('open');
				$('body').addClass('_lock');

				setTimeout(function () {
					$(location).attr('href', 'https://grillivery.com.ua');

				}, 1200);
			},
			error: function (errMsg) {
				console.log("Error: ", errMsg)
			}
		});


	} else {
		console.log('not items')
	}


}

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
