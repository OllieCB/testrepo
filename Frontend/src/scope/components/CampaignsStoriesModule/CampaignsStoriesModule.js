const template = require('../../common/PageItemModule/PageItemModule.hbs');

export default (function CampaignsStories(spec) {
	const { campStories, setLazy } = spec;
	const hotContainer = campStories.querySelector('.js-listing-hotContainer');
	const topContainer = campStories.querySelector('.js-listing-topContainer');
	const loadMoreBtn = campStories.querySelector('.js-listing-loadMore');
	const filters = campStories.querySelector('.js-campStories-filters');
	const mobileFilters = campStories.querySelector('.js-campStories-mobile-filter');
	const moreCount = campStories.querySelector('.js-more-count');

	const state = {
		filter: 'all',
		matchCount: undefined,
		matchVisible: 0,
		page: 0,
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
			loadMoreBtn.classList.remove('hidden');
		} else {
			loadMoreBtn.classList.add('hidden');
		}
	};

	const forEach = (cb, arr) => {
		for (let i = 0; i < arr.length; i += 1) {
			cb(arr[i]);
		}
	};

	const queryLazyImages = () => {
		const els = campStories.querySelectorAll('.lazy');
		forEach(setLazy, els);
	};

	const loadMore = () => {
		loadMoreBtn.classList.add('loading');
		moreCount.innerHTML = loadMoreBtn.dataset.msg;

		fetch(`${campStories.dataset.baseUrl}&filter=${state.filter}&page=${state.page + 1}`)
			.then(res => res.json())
			.then(data => {
				moreCount.innerHTML = `${data.stories.reduce((acc, cur) => acc + cur.length, 0)} more items loaded`;

				setTimeout(() => {
					moreCount.innerHTML = ''; // This is a trick for screen readers to update aria-live regions
				}, 1000);

				return data.stories;
			})
			.then(buildTop)
			.then(queryLazyImages)
			.then(() => {
				state.page += 1;
				topContainer
					.querySelector('.PageItemListing__page:last-of-type')
					.querySelector('a')
					.focus();

				loadMoreBtn.classList.remove('loading');
			});
	};

	const render = () => {
		fetch(`${campStories.dataset.baseUrl}&filter=${state.filter}&page=0`)
			.then(res => res.json())
			.then(data => {
				state.matchCount = data.matchCount;

				buildHot(data.hotStories);
				topContainer.innerHTML = '';
				buildTop(data.topStories);

				filters.querySelector('[aria-pressed=true]').setAttribute('aria-pressed', false);
				filters.querySelector('.current button').setAttribute('aria-pressed', true);
			})
			.then(queryLazyImages);
	};

	const swapCurrent = () => {
		campStories.querySelector('.current').classList.remove('current');
		campStories.querySelector(`[data-type=${state.filter}]`).parentElement.classList.add('current');
		campStories.querySelector('.js-campStories-mobile-filter').value = state.filter;
	};

	const filter = type => () => {
		state.filter = type || '';
		state.matchCount = undefined;
		state.matchVisible = 0;
		state.page = 0;

		swapCurrent();
		render();
	};

	const init = () => {
		state.matchCount = Number(campStories.dataset.matchCount);
		state.matchVisible = campStories.querySelectorAll('.PageItem__item').length;

		if (loadMoreBtn) {
			loadMoreBtn.addEventListener('click', loadMore);
		}

		if (filters) {
			filters.addEventListener('click', e => filter(e.target.dataset.type)());
		}
		if (mobileFilters) {
			mobileFilters.addEventListener('change', e => filter(e.target.value)());
		}
	};

	return Object.freeze({
		init,
	});
});
