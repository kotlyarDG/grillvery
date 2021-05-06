// const serverUrl = 'https://grillivery.com.ua/api';
const serverUrl = 'http://89.108.65.153:3001/api';


$(document).ready(function () {
	$('.header__burger').click(function (event) {
		$('.header__burger,.burger__menu').toggleClass('_active')
		$('body').toggleClass('_lock');
	});



	getItems();


	$('.form').submit(function (e) {
		sendOrder();
		e.preventDefault();
	});
});

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
							<button class="item-third__count-btn">+</button>
							<p class="item-third__count-value">${item['count']}</p>
							<button class="item-third__count-btn">-</button>
						</div>
						<button class="item-third__add-btn delete-btn">УДАЛИТЬ</button>
	
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
							<button class="item-third__count-btn">+</button>
							<p class="item-third__count-value">${item['count']}</p>
							<button class="item-third__count-btn">-</button>
						</div>
						<button class="item-third__add-btn delete-btn">УДАЛИТЬ</button>
	
					</div>
				`
			);
		}

	}

	$('.delete-btn').click(function () {
		$(this).closest('.item-basket').remove();

	});
}

function sendOrder() {
	let name = $('#name').val();
	let address = $('#street').val() + ' ' + $('#house').val() + ' ' + $('#flat').val();
	let time = $('#time').val();
	let comment = $('#comment').val();

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
			'positions': positions
		}

		console.log(dataToSend);

		$.ajax({
			type: "POST",
			url: `${serverUrl}/add_order`,
			data: dataToSend,
			success: function (msg) {
				console.log(msg);


			},
			error: function (errMsg) {
				console.log("Error: ", errMsg)
			}
		});
	} else {
		console.log('not items')
	}


}