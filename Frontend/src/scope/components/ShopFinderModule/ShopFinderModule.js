const serialize = require('form-serialize');
const { default: Popup } = require('../../common/PopupModule/PopupModule');
const template = require('../../common/PageItemModule/PageItemModule.hbs');

export default (function ShopFinder(spec) {
	const { shopFinder, setLazy } = spec;
	const form = shopFinder.querySelector('.js-shop-form');
	const locationField = form.querySelector('.js-shop-location');
	const currentLocation = form.querySelector('.js-shop-current');
	const loadMore = shopFinder.querySelector('.js-listing-loadMore');
	const container = shopFinder.querySelector('.js-listing-result-container');
	const matchLabel = shopFinder.querySelector('.js-listing-match-label');
	const moreCount = shopFinder.querySelector('.js-more-count');

	const state = {
		matchCount: undefined,
		matchVisible: 0,
		pageIndex: 0,
	};

	const forEach = (cb, arr) => {
		for (let i = 0; i < arr.length; i += 1) {
			cb(arr[i]);
		}
	};

	const queryLazyImages = () => {
		const els = shopFinder.querySelectorAll('.lazy');
		forEach(setLazy, els);
	};

	const handleResult = data => {
		if (data.results && data.results.length > 0) {
			if (!data.success) {
				Popup(Object.assign({}, data.popup, {
					return: locationField,
				}));
			}

			if (data.matchLabel) {
				loadMore.classList.remove('loading');
				matchLabel.innerHTML = data.matchLabel;
			}

			container.innerHTML += data.results.reduce((innerHTML, cur) => innerHTML + template(cur), '');

			state.matchCount = state.matchCount || data.matchCount;
			state.matchVisible += data.results.reduce((acc, cur) => acc + cur.length, 0);

			if (state.matchCount > state.matchVisible) {
				loadMore.classList.remove('hidden');
			} else {
				loadMore.classList.add('hidden');
			}
		} else {
			matchLabel.innerHTML = data.matchLabel;
			loadMore.classList.add('hidden');
		}

		moreCount.innerHTML = '';
	};

	const setLoading = () => {
		loadMore.classList.add('loading');
		moreCount.innerHTML = loadMore.dataset.msg;
	};

	const handleSubmit = e => {
		e.preventDefault();

		loadMore.classList.remove('hidden');
		container.innerHTML = '';
		matchLabel.innerHTML = '';
		setLoading();

		state.matchCount = undefined;
		state.matchVisible = 0;
		state.pageIndex = 0;

		fetch(form.action, {
			body: serialize(form).replace('+', '%20'),
			method: 'post',
			headers: new Headers({
				'Content-Type': 'application/x-www-form-urlencoded',
			}),
		})
			.then(res => res.json())
			.then(handleResult)
			.then(queryLazyImages);
	};

	const handleLoadMore = () => {
		setLoading();

		fetch(form.action.concat(`&${serialize(form).replace('+', '%20')}`).replace(/page=\d+/, `page=${state.pageIndex + 1}`))
			.then(res => res.json())
			.then(data => {
				state.pageIndex += 1;

				moreCount.innerHTML = `${data.results.reduce((acc, cur) => acc + cur.length, 0)} more items loaded`;

				setTimeout(() => {
					moreCount.innerHTML = ''; // This is a trick for screen readers to update aria-live regions
				}, 1000);

				return data;
			})
			.then(handleResult)
			.then(queryLazyImages)
			.then(() => {
				container
					.querySelector(`.PageItem:nth-child(${(state.pageIndex * 3) + 1}n) > div`)
					.focus();

				loadMore.classList.remove('loading');
			});
	};

	const autoFillLocation = location => {
		locationField.value = location;
	};

	const fillHiddenFields = (lat, lng) => {
		form.querySelector('[name=latitude]').setAttribute('value', lat);
		form.querySelector('[name=longitude]').setAttribute('value', lng);
	};

	const useCurrentLocation = () => {
		navigator.geolocation.getCurrentPosition(pos => {
			fetch(`${currentLocation.dataset.endpoint}?latitude=${pos.coords.latitude}&longitude=${pos.coords.longitude}`)
				.then(res => res.text())
				.then(autoFillLocation);

			fillHiddenFields(pos.coords.latitude, pos.coords.longitude);
		});
	};

	const init = () => {
		state.matchCount = Number(shopFinder.dataset.matchCount);
		state.matchVisible = shopFinder.querySelectorAll('.PageItem__item').length;

		shopFinder
			.querySelector('.js-shop-submit')
			.addEventListener('click', handleSubmit);

		loadMore.addEventListener('click', handleLoadMore);
		currentLocation.addEventListener('click', useCurrentLocation);
		locationField.addEventListener('keydown', fillHiddenFields.bind(null, '', ''));
	};

	return Object.freeze({
		init,
	});
});
