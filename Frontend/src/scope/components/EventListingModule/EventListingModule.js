const serialize = require('form-serialize');
const template = require('../../common/PageItemModule/PageItemModule.hbs');

export default (function CampaignsStories(spec) {
	const { eventListing, setLazy } = spec;
	const form = eventListing.querySelector('.js-events-form');
	const hotContainer = eventListing.querySelector('.js-listing-hotContainer');
	const topContainer = eventListing.querySelector('.js-listing-topContainer');
	const loadMore = eventListing.querySelector('.js-listing-loadMore');
	const moreCount = eventListing.querySelector('.js-more-count');
	const matchLabel = eventListing.querySelector('.js-listing-match-label');

	const state = {
		matchCount: undefined,
		matchVisible: 0,
		pageIndex: 0,
	};

	const setLoading = () => {
		loadMore.classList.add('loading');
		moreCount.innerHTML = loadMore.dataset.msg;
	};

	const buildHot = data => {
		hotContainer.innerHTML = template(data);

		state.matchVisible += data.length;
	};

	const buildTop = data => {
		let page = '<div class="PageItemListing__page">';
		data.forEach(d => {
			page += template(d);
		});
		page += '</div>';
		topContainer.innerHTML += page;

		state.matchVisible += data.reduce((acc, cur) => acc + cur.length, 0);

		if (state.matchCount > state.matchVisible) {
			loadMore.classList.remove('hidden');
		} else {
			loadMore.classList.add('hidden');
		}
	};

	const forEach = (cb, arr) => {
		for (let i = 0; i < arr.length; i += 1) {
			cb(arr[i]);
		}
	};

	const queryLazyImages = () => {
		const els = eventListing.querySelectorAll('.lazy');
		forEach(setLazy, els);
	};

	const handleSubmit = e => {
		e.preventDefault();

		loadMore.classList.remove('hidden');
		topContainer.innerHTML = '';
		hotContainer.innerHTML = '';
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
			.then(data => {
				state.matchCount = data.matchCount;
				loadMore.classList.remove('loading');
				matchLabel.innerHTML = data.matchLabel;

				if (data.matchCount > 0) {
					buildHot(data.hotEvents);
					buildTop(data.topEvents);
				} else {
					loadMore.classList.add('hidden');
				}

				moreCount.innerHTML = '';
			})
			.then(queryLazyImages);
	};

	const handleLoadMore = () => {
		setLoading();

		fetch(form.action.concat(`&${serialize(form).replace('+', '%20')}`).replace(/page=\d+/, `page=${state.pageIndex + 1}`))
			.then(res => res.json())
			.then(data => {
				state.pageIndex += 1;

				moreCount.innerHTML = `${data.items.reduce((acc, cur) => acc + cur.length, 0)} more items loaded`;

				setTimeout(() => {
					moreCount.innerHTML = ''; // This is a trick for screen readers to update aria-live regions
				}, 1000);

				return data.items;
			})
			.then(buildTop)
			.then(queryLazyImages)
			.then(() => {
				topContainer
					.querySelector('.PageItemListing__page:last-of-type')
					.querySelector('a')
					.focus();

				loadMore.classList.remove('loading');
			});
	};

	const init = () => {
		state.matchCount = Number(eventListing.dataset.matchCount);
		state.matchVisible = eventListing.querySelectorAll('.PageItem__item').length;

		eventListing
			.querySelector('.js-events-submit')
			.addEventListener('click', handleSubmit);

		loadMore.addEventListener('click', handleLoadMore);
	};

	return Object.freeze({
		init,
	});
});
