const serialize = require('form-serialize');
const template = require('./SearchResult/SearchResult.hbs');
const noResultTemplate = require('./SearchNoResult/SearchNoResult.hbs');
const Typeahead = require('../../../shared/scripts/typeahead.js');

export default (function SearchPage(spec) {
	const { searchPage, setLazy } = spec;
	const form = searchPage.querySelector('.js-search-page-form');
	const queryInput = form.querySelector('input[name=query]');
	const categoryInput = form.querySelector('select[name=category]');
	const loadMore = searchPage.querySelector('.js-search-page-loadMore');
	const searchResultsContainer = searchPage.querySelector('.js-search-page-results');
	const matchLabel = searchPage.querySelector('.js-search-page-match-label');
	const moreCount = searchPage.querySelector('.js-more-count');
	const autocompleteEndpoint = `https://${searchPage.dataset.search}.search.windows.net/indexes/${searchPage.dataset.index}/docs/autocomplete?api-version=2017-11-11-Preview`;

	const state = {
		matchCount: undefined,
		matchVisible: searchResultsContainer.childElementCount,
		pageIndex: 0,
		query: queryInput.value,
		category: categoryInput.value,
	};

	const forEach = (arr, cb) => {
		for (let i = 0; i < arr.length; i += 1) {
			cb(arr[i]);
		}
	};

	const queryLazyImages = () => {
		const els = searchPage.querySelectorAll('.lazy');
		forEach(els, setLazy);
	};

	const handleItemClick = e => {
		if (!window.appInsights) {
			return;
		}
		window.appInsights.trackEvent('Click', {
			SearchServiceName: `${searchPage.dataset.search}`,
			SearchId: `${e.currentTarget.dataset.searchid}`,
			ClickedDocId: `${e.currentTarget.dataset.azureuniqueid}`,
			Rank: `${[].indexOf.call(searchResultsContainer.querySelectorAll('a'), e.currentTarget)}`,
		});
	};

	const handleResult = data => {
		state.query = queryInput.value;

		if (data.matchLabel) {
			loadMore.classList.remove('loading');
			matchLabel.innerHTML = data.matchLabel;
		}

		if (data.results && data.results.length > 0) {
			forEach(searchResultsContainer.querySelectorAll('a'), a => a.removeEventListener('click', handleItemClick));
			searchResultsContainer.innerHTML += data.results.reduce((innerHTML, cur) => innerHTML + template(cur), '');
			forEach(searchResultsContainer.querySelectorAll('a'), a => a.addEventListener('click', handleItemClick));

			state.matchCount = state.matchCount || data.matchCount;
			state.matchVisible += data.results.length;

			if (state.matchCount > state.matchVisible) {
				loadMore.classList.remove('hidden');
			} else {
				loadMore.classList.add('hidden');
			}
		} else {
			searchResultsContainer.innerHTML += noResultTemplate(data.noResults);
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
		searchResultsContainer.innerHTML = '';
		matchLabel.innerHTML = '';
		setLoading();

		state.matchCount = undefined;
		state.matchVisible = 0;
		state.pageIndex = 0;
		state.query = queryInput.value;
		state.category = categoryInput.value;
		state.hasResultHeading = false;

		fetch(form.action, {
			body: serialize(form).replace('+', '%20'),
			method: 'post',
			headers: new Headers({
				'Content-Type': 'application/x-www-form-urlencoded',
			}),
		})
			.then(res => res.json())
			.then(data => {
				window.history.replaceState({}, '', `${window.location.origin}${window.location.pathname}?query=${state.query}`);

				return data;
			})
			.then(handleResult)
			.then(queryLazyImages);
	};

	const handleLoadMore = () => {
		const page = `page=${state.pageIndex + 1}&`;

		setLoading();

		fetch(form.action.concat(serialize(form).replace('+', '%20')).replace(/page=\d+/, page))
			.then(res => res.json())
			.then(data => {
				state.pageIndex += 1;

				moreCount.innerHTML = `${data.results.length} more items found`;

				setTimeout(() => {
					moreCount.innerHTML = ''; // This is a trick for screen readers to update aria-live regions
				}, 1000);

				return data;
			})
			.then(handleResult)
			.then(queryLazyImages)
			.then(() => {
				searchResultsContainer
					.querySelector(`a:nth-child(${(state.pageIndex * 10) + (state.hasResultHeading ? 2 : 1)}n)`)
					.focus();

				loadMore.classList.remove('loading');
			});
	};

	const initTypeahead = () => {
		Typeahead(queryInput, {
			autoselect: false,
			selector: queryInput,
			minLength: 2,
			menu: '<ul id="searchPageSuggestions" class="SearchPage__typeahead hidden" role="listbox" aria-labelledby="search-page-title"></ul>',
			source: (query, result) => {
				fetch(autocompleteEndpoint, {
					method: 'POST',
					headers: new Headers({
						'api-key': `${searchPage.dataset.searchKey}`,
						'Content-Type': 'application/json',
					}),
					body: JSON.stringify({
						suggesterName: 'sg',
						search: query,
						autocompleteMode: 'oneTermWithContext',
					}),
				})
					.then(res => res.json())
					.then(data => {
						if (data.value && data.value.length > 0) {
							result(data.value.map(x => x.queryPlusText));
						}
					})
					.catch(() => {

					});
			},
		});
	};

	const init = () => {
		state.matchCount = Number(searchPage.dataset.matchCount);
		state.matchVisible = searchPage.querySelectorAll('.SearchResult').length;

		form.addEventListener('submit', handleSubmit);

		loadMore.addEventListener('click', handleLoadMore);

		forEach(searchResultsContainer.querySelectorAll('a'), a => a.addEventListener('click', handleItemClick));

		initTypeahead();
	};

	return Object.freeze({
		init,
	});
});
