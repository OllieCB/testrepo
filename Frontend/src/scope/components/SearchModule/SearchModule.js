const Typeahead = require('../../../shared/scripts/typeahead.js');

export default (function Search(spec) {
	const { search } = spec;
	const form = search.querySelector('.js-search-form');
	const queryInput = form.querySelector('input[name=query]');
	const autocompleteEndpoint = `https://${form.dataset.search}.search.windows.net/indexes/${form.dataset.index}/docs/autocomplete?api-version=2017-11-11-Preview`;

	const initTypeahead = () => {
		Typeahead(queryInput, {
			autoselect: false,
			selector: queryInput,
			minLength: 2,
			menu: '<ul id="searchSuggestions" class="Search__typeahead hidden" role="listbox" aria-labelledby="search-title"></ul>',
			source: (query, result) => {
				fetch(autocompleteEndpoint, {
					method: 'POST',
					headers: new Headers({
						'api-key': `${form.dataset.searchKey}`,
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
		initTypeahead();
	};

	return Object.freeze({
		init,
	});
});
