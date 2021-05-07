
const serverUrl = 'https://grillivery.com.ua/api';


function setCountBasketIcon(count) {
	if ($('.basket-icon__count').text() == '0') {
		$('.basket-icon').show();
	}
	$('.basket-icon__count').html(count);
}

function getCategories() {

	$.ajax({
		type: "GET",
		url: `${serverUrl}/positions`,
		success: function (data) {
			let categories = data;
			console.log(categories)


			for (let category of categories) {

				if (category['category']['items'] !== null) {
					$('.third__items').append(
						`<h3 class="third__title">${category['category']['title']}</h3>
				<div class="third__items-wrap"></div>`
					);
					for (let item of category['category']['items']) {
						if (item['positions'].length == 1) {
							$('.third__items-wrap').append(
								`
					<div class="third__item item-third">
					<a href="popup-first" data-category="${category['category']['id']}" data-product="${item['id']}" class="item-third__img popup__link" style="background: url('${item['image']}') center / cover no-repeat"></a>
									<a href="popup-first" data-category="${category['category']['id']}" data-product="${item['id']}" class="item-third__name popup__link">${item['title']}</a>
									<div class="item-third__price-weight">
								<span class="item-third__weight">${item['priceInfo']}</span>
								<span class="item-third__price">${item['price']} грн</span>
							</div>
							<div class="item-third__count-wrap">
								<button class="item-third__count-btn item-third__count-btn--plus">+</button>
								<p class="item-third__count-value">${1}</p>
								<button class="item-third__count-btn item-third__count-btn--minus">-</button>
							</div>
							<button data-category="${category['category']['id']}" data-product="${item['id']}" class="item-third__add-btn">ДОДАТИ</button>
					`
							)
						} else {
							$('.third__items-wrap').append(
								`
					<div class="third__item item-third">
					<a href="popup-first" data-category="${category['category']['id']}" data-product="${item['id']}" class="item-third__img popup__link" style="background: url('${item['image']}') center / cover no-repeat"></a>
									<a href="popup-first" data-category="${category['category']['id']}" data-product="${item['id']}" class="item-third__name popup__link">${item['title']}</a>
									<div class="item-third__price-weight">
								<span class="item-third__weight">${item['priceInfo']}</span>
								<span class="item-third__price">${item['price']} грн</span>
							</div>
							<button href="popup-first" data-category="${category['category']['id']}" data-product="${item['id']}" class="item-third__add-btn popup__link">детальніше</button>
					`
							)
						}

					}
				}


			}
			$('.item-third__count-btn--plus').click(function (e) {
				let count = +$(this).next().text();

				$(this).next().html(count + 1);
			});

			$('.item-third__count-btn--minus').click(function (e) {
				let count = +$(this).prev().text();

				if (count > 1) {
					$(this).prev().html(count - 1);

				}
			});

			$('.popup__link').click(function (e) {
				let id = $(this).data('product');
				let catId = $(this).data('category');
				let cat = categories.find(x => x['category']['id'] == catId);
				let prod = cat['category']['items'].find(el => el['id'] == id);
				let count = +$(this).closest('.third__item').find('.item-third__count-value').text();
				openProductPopup(prod, count, catId);
				e.preventDefault();
			});

			$('.item-third__add-btn').click(function (e) {
				if (!$(this).hasClass('popup__link')) {
					let id = $(this).data('product');
					let catId = $(this).data('category');
					let cat = categories.find(x => x['category']['id'] == catId);
					let prod = cat['category']['items'].find(el => el['id'] == id);
					let count = +$(this).closest('.third__item').find('.item-third__count-value').text();
					let buf = [];
					let isRepeatProd = false;
					if (sessionStorage.getItem('products')) {
						buf = JSON.parse(sessionStorage.getItem('products'));

					}

					for (let item of buf) {
						console.log(item);
						if (item['prod']['id'] == prod['id']) {

							item['count'] = item['count'] + count;
							isRepeatProd = true;
						}
					}
					if (!isRepeatProd) {
						buf.push({ prod, count });

					}
					sessionStorage.setItem('products', JSON.stringify(buf));
					setCountBasketIcon(buf.length);

					console.log(JSON.parse(sessionStorage.getItem('products')))

				}
			})


		},
		error: function (errMsg) {
			console.log("Error: ", errMsg)
		},
		contentType: "application/json; charset=utf-8",
		dataType: "json",
	});
}

function openProductPopup(product, count, categoryId) {
	console.log(product);
	console.log(count);
	if (product['positions'].length == 1) {
		console.log('go')
		$('.popup__wrap').html(
			`<div class="third__item item-third">
			<div class="item-third__img" style="background: url('${product['image']}') center / cover no-repeat"></div>
			<p class="item-third__name">${product['title']}</p>
						<p class="item-third__text">${product['positions'][0]['description']}</p>
						<div class="item-third__count-wrap">
						<button class="item-third__count-btn item-third__count-btn--plus">+</button>
						<p class="item-third__count-value">${count == 0 ? 1 : count}</p>
						<button class="item-third__count-btn item-third__count-btn--minus">-</button>
					</div>
					<div class="item-third__price-weight">
						<span class="item-third__weight">${product['priceInfo']}</span>
						<span class="item-third__price">${product['price']} грн</span>
					</div>
					<button data-category="${categoryId}" data-product="${product['id']}" class="item-third__add-btn">ДОДАТИ</button>
					</div>
			`
		);
	} else {
		$('.popup__wrap').html(
			`<div class="third__item item-third">
			<div class="item-third__img" style="background: url('${product['image']}') center / cover no-repeat"></div>
			<p class="item-third__name">${product['title']}</p>
						<p class="item-third__text">${product['positions'][0]['description']}</p>
						<select data-select="${product['positions'][0]['id']}" class="select" name="select">
					
					</select>
						<div class="item-third__count-wrap">
						<button class="item-third__count-btn item-third__count-btn--plus">+</button>
						<p class="item-third__count-value">${count == 0 ? 1 : count}</p>
						<button class="item-third__count-btn item-third__count-btn--minus">-</button>
					</div>
					<div class="item-third__price-weight">
						<span class="item-third__weight">${product['priceInfo']}</span>
						<span class="item-third__price">${product['price']} грн</span>
					</div>
					<button data-category="${categoryId}" data-product="${product['id']}" class="item-third__add-btn">ДОДАТИ</button>
					</div>
			`
		);
		$('.select').select2({
			minimumResultsForSearch: Infinity
		});

		$('.select').on("select2:select", function (e) {
			console.log(e);
			console.log(e.params.data);
			$('.popup__wrap').find('.item-third__text').html(
				`
				${product['positions'].find(el => el.id == e.params.data.id)['description']}
				`
			);
			$('.popup__wrap').find('.item-third__count-value').html('1');
			$(this).data('select', e.params.data.id);
		});
		$.each(product['positions'], function (index, position) {
			if (index == 0) {
				$('.select').append(
					`
					<option selected value="${position['id']}">${position['type']}</option>
					`
				)
			} else {
				$('.select').append(
					`
					<option value="${position['id']}">${position['type']}</option>
					`
				)
			}
		})




	}


	$('.popup-black').addClass('open');
	$('#popup-first').addClass('open');
	$('body').addClass('_lock');

	$('.popup').find('.item-third__count-btn--plus').click(function (e) {
		let count = +$(this).next().text();
		console.log(count);
		$(this).next().html(count + 1);
	});

	$('.popup').find('.item-third__count-btn--minus').click(function (e) {
		let count = +$(this).prev().text();
		console.log(count);
		if (count > 1) {
			$(this).prev().html(count - 1);

		}
	});

	$('.popup').find('.item-third__add-btn').click(function (e) {
		if (!$(this).hasClass('popup__link')) {
			let id = $(this).data('product');
			// let catId = $(this).data('category');
			// let cat = categories.find(x => x['category']['id'] == catId);
			let prod = product;
			let count = +$(this).closest('.third__item').find('.item-third__count-value').text();

			let buf = [];
			let isRepeatProd = false;

			if (sessionStorage.getItem('products')) {
				buf = JSON.parse(sessionStorage.getItem('products'));

			}
			if (prod['positions'].length > 1) {
				let type = $('.popup').find('.select').data('select');
				console.log(type);

				for (let item of buf) {
					console.log(item);
					if (item['prod']['id'] == prod['id'] && item['type'] == type) {

						item['count'] = item['count'] + count;
						isRepeatProd = true;
					}
				}

				if (!isRepeatProd) {
					buf.push({ prod, count, type });

				}

			} else {

				for (let item of buf) {
					console.log(item);
					if (item['prod']['id'] == prod['id']) {

						item['count'] = item['count'] + count;
						isRepeatProd = true;
					}
				}

				if (!isRepeatProd) {
					buf.push({ prod, count });

				}

			}
			sessionStorage.setItem('products', JSON.stringify(buf));
			setCountBasketIcon(buf.length);

			closePopup();
			console.log(JSON.parse(sessionStorage.getItem('products')))
		}

	})


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
			$('.third__link--phone').attr('href', `tel:${data['CONFIG_PHONE']}`);
			$('.third__link--telegram').attr('href', `${data['CONFIG_TG']}`);


		},
		error: function (errMsg) {
			console.log("Error: ", errMsg)
		},
		contentType: "application/json; charset=utf-8",
		dataType: "json",
	});
}

function getPromotions() {
	$.ajax({
		type: "GET",
		url: `${serverUrl}/promotions`,
		success: function (data) {
			console.log(data);
			for (let promotion of data) {
				$('.second__items').append(
					`
					<div class="second__item item">
					<div class="item__img"><img src="${promotion['image']}"
								alt=""></div>
								<div class="item__body">
							<div class="item__description">
								<p>${promotion['title']}</p>
							</div>
							<p class="item__price">${promotion['subtitle']}</p>
							<button data-link="#third" class="item__button link-btn">ЗАМОВИТИ</button>
						</div>
					</div>
					`
				)
			}
			$('.second__items').slick({
				arrows: false,
				dots: true,
				fade: true,
				speed: 500,
				cssEase: 'linear',
				autoplay: true
			});

			$('.link-btn').click(function () {
				var linkID = $(this).data('link');
				$('html, body').animate({
					scrollTop: $(linkID).offset().top
				}, 'slow');
			})
		},
		error: function (errMsg) {
			console.log("Error: ", errMsg)
		},
		contentType: "application/json; charset=utf-8",
		dataType: "json",
	});
}

function closePopup() {
	$('.popup').removeClass('open');
	$('.popup-black').removeClass('open');
	$('body').removeClass('_lock');
}

$(document).ready(function () {

	sessionStorage.setItem('products', []);

	getCategories();

	getContacts();

	getPromotions();

	// $('.first-button').click(function () {
	// 	var linkID = $(this).data('link');
	// 	$('html, body').animate({
	// 		scrollTop: $(linkID).offset().top
	// 	}, 'slow');
	// })


	function ibg() {

		$.each($('.ibg'), function (index, val) {

			if ($(this).find('img').length > 0) {
				$(this).css('background-image', 'url("' + $(this).find('img').attr('src') + '")');
			}

		});
	}



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

	// $('.popup__link').click(function (e) {
	// 	e.preventDefault();
	// 	let link = $(this).attr('href');
	// 	$('.popup-black').addClass('open');
	// 	$('#' + link).addClass('open');
	// 	$('body').addClass('_lock');

	// 	console.log(link);
	// });

	$('.popup-black').click(function () {

		closePopup();
	});

	$('.popup__close').click(function () {
		closePopup();

	})

	$('.select').select2({
		minimumResultsForSearch: Infinity
	});


	let elementsLeftTop = $('.parallax-img-left-top');
	let elementsRightTop = $('.parallax-img-right-top');
	let elementsLeftbottom = $('.parallax-img-left-bottom');
	let elementsRightbottom = $('.parallax-img-right-bottom');



	$(document).mousemove(function (e) {

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

