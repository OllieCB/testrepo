const serialize = require('form-serialize');
const template = require('../../common/PageItemModule/PageItemModule.hbs');

export default (function OpportunityFinder(spec) {
	const { opportunityFinder, setLazy } = spec;
	const form = opportunityFinder.querySelector('.js-opportunity-form');
	const loadMore = opportunityFinder.querySelector('.js-listing-loadMore');
	const container = opportunityFinder.querySelector('.js-listing-result-container');
	const matchLabel = opportunityFinder.querySelector('.js-listing-match-label');
	const backButton = opportunityFinder.querySelector('.js-opportunity-back');
	const moreCount = opportunityFinder.querySelector('.js-more-count');

	const state = {
		resizeHandlerSet: false,
		matchCount: undefined,
		matchVisible: 0,
		pageIndex: 0,
	};

	const restrictScroll = () => {
		document.body.classList.add('noscroll');
	};

	const restoreScroll = () => {
		document.body.classList.remove('noscroll');
	};

	const forEach = (cb, arr) => {
		for (let i = 0; i < arr.length; i += 1) {
			cb(arr[i]);
		}
	};

	const queryLazyImages = () => {
		const els = opportunityFinder.querySelectorAll('.lazy');
		forEach(setLazy, els);
	};

	const handleResult = data => {
		if (data.results && data.results.length > 0) {
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
		const serialiazedForm = serialize(form).replace('+', '%20');

		setLoading();

		fetch(form.action.concat(serialiazedForm ? `&${serialiazedForm}` : '').replace(/page=\d+/, `page=${state.pageIndex + 1}`))
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
					.querySelector(`.PageItem:nth-child(${(state.pageIndex * 3) + 1}n) > a`)
					.focus();

				loadMore.classList.remove('loading');
			});
	};

	const init = () => {
		state.matchCount = Number(opportunityFinder.dataset.matchCount);
		state.matchVisible = opportunityFinder.querySelectorAll('.PageItem__item').length;

		form.addEventListener('submit', handleSubmit);

		opportunityFinder
			.querySelector('.js-opportunity-more')
			.addEventListener('click', () => {
				opportunityFinder
					.classList
					.add('open');

				if (window.innerWidth <= 900) {
					restrictScroll();

					backButton.focus();
				} else {
					opportunityFinder
						.querySelector('.js-opportunity-fields input[type=checkbox]')
						.focus();
				}

				if (!state.resizeHandlerSet) {
					window.addEventListener('resize', () => {
						if (window.innerWidth <= 900) {
							restrictScroll();
						} else {
							restoreScroll();
						}
					});

					state.resizeHandlerSet = true;
				}

				if (!state.backHandlerSet) {
					backButton.addEventListener('click', () => {
						opportunityFinder
							.classList
							.remove('open');

						restoreScroll();
					});

					state.backHandlerSet = true;
				}
			});

		opportunityFinder
			.querySelector('.js-opportunity-less')
			.addEventListener('click', () => {
				opportunityFinder
					.classList
					.remove('open');

				document.body.classList.remove('noscroll');
			});

		loadMore.addEventListener('click', handleLoadMore);
	};

	return Object.freeze({
		init,
	});
});

