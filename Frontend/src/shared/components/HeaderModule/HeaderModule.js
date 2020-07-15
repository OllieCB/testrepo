const Typeahead = require('../../scripts/typeahead.js');

export default (function Header({ header }) {
	const navHandle = header.querySelector('.js-nav-handle');
	const navClose = header.querySelector('.js-nav-close');
	const navOverlay = header.querySelector('.js-nav-overlay');
	const searchbar = header.querySelector('.js-searchbar');
	const queryInput = searchbar.querySelector('input[name=query]');
	const autocompleteEndpoint = `https://${searchbar.dataset.search}.search.windows.net/indexes/${searchbar.dataset.index}/docs/autocomplete?api-version=2017-11-11-Preview`;
	const dropdowns = header.querySelectorAll('.js-dropdown-handle');

	const restrictScroll = () => {
		document.body.classList.add('noscroll');
	};

	const restoreScroll = () => {
		document.body.classList.remove('noscroll');
	};

	const typeaheadScrollHandler = () => {
		const typeaheadContainer = document.querySelector('#topBarSuggestions');
		typeaheadContainer.style.top = `${queryInput.getBoundingClientRect().bottom}px`;
	};

	const openHandler = () => {
		navOverlay.classList.add('opened');
		restrictScroll();
		navOverlay.focus();
		navOverlay.addEventListener('scroll', typeaheadScrollHandler);
	};

	const closeHandler = () => {
		navOverlay.classList.remove('opened');
		restoreScroll();
		navHandle.focus();
		navOverlay.removeEventListener('scroll', typeaheadScrollHandler);
	};

	const searchHandler = e => {
		if (e.keyCode === 13) { // ENTER
			searchbar.querySelector('input').focus();
		} else if (e.keyCode === 27) { // ESCAPE
			searchbar.focus();
		}
	};

	const forEach = (arr, cb) => {
		for (let i = 0; i < arr.length; i += 1) {
			cb(arr[i]);
		}
	};

	const bodyClickHandler = e => {
		if (!header.querySelector('.js-dropdown-parent.opened').contains(e.target)) {
			closeDropdowns(); // eslint-disable-line
		}
	};

	const closeDropdowns = () => {
		forEach(dropdowns, dropdown => {
			dropdown.setAttribute('aria-expanded', false);
			dropdown.parentElement.classList.remove('opened');
		});

		document.removeEventListener('click', bodyClickHandler, true);
	};

	const handleEsc = e => {
		if (e.keyCode === 27) { // ESCAPE
			e.currentTarget.querySelector('.js-dropdown-handle').focus();
			closeDropdowns();
		}
	};

	const handleDropdownExit = e => {
		if (e.keyCode === 9 && !e.getModifierState('Shift')) { // TAB
			closeDropdowns();
		}
	};

	const toggleDropdown = e => {
		const container = e.currentTarget.parentElement;
		container.classList.toggle('opened');

		if (container.classList.contains('opened')) {
			e.currentTarget.setAttribute('aria-expanded', true);

			document.addEventListener('click', bodyClickHandler, true);
		} else {
			e.currentTarget.setAttribute('aria-expanded', false);

			document.removeEventListener('click', bodyClickHandler, true);
		}
	};

	const initTypeahead = () => {
		Typeahead(queryInput, {
			autoselect: false,
			selector: queryInput,
			minLength: 2,
			menu: '<ul id="topBarSuggestions" class="TopBar__search--typeahead hidden" role="listbox" aria-labelledby="topbar-search-label"></ul>',
			source: (query, result) => {
				fetch(autocompleteEndpoint, {
					method: 'POST',
					headers: new Headers({
						'api-key': `${searchbar.dataset.searchKey}`,
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
		navHandle.addEventListener('click', openHandler);
		navClose.addEventListener('click', closeHandler);
		searchbar.addEventListener('keyup', searchHandler);
		initTypeahead();

		forEach(dropdowns, dropdown => {
			dropdown.addEventListener('click', toggleDropdown);

			dropdown.parentElement.addEventListener('keydown', handleEsc);
			dropdown.nextElementSibling.lastChild.addEventListener('keydown', handleDropdownExit);
		});

		searchbar.addEventListener('focusin', () => {
			if (searchbar.contains(document.activeElement) && searchbar !== document.activeElement) {
				document.querySelector('.TopBar').classList.add('search-open');
				searchbar.querySelector('button[type=submit]').setAttribute('tabindex', '0');
			}
		});

		['focusin', 'focusout']
			.map(event => searchbar
				.addEventListener(event, () => {
					const submitButton = searchbar.querySelector('button[type=submit]');
					const input = searchbar.querySelector('input');
					const isFocusIn = searchbar.contains(document.activeElement);

					if (isFocusIn && searchbar !== document.activeElement) {
						document.querySelector('.TopBar').classList.add('search-open');
						submitButton.setAttribute('tabindex', '0');
						input.setAttribute('tabindex', '0');
					} else if (!isFocusIn || searchbar === document.activeElement) {
						document.querySelector('.TopBar').classList.remove('search-open');
						submitButton.setAttribute('tabindex', '-1');
						input.setAttribute('tabindex', '-1');
					}
				}));

		window.addEventListener('resize', () => {
			if (window.innerWidth <= 900 && navOverlay.classList.contains('opened')) {
				restrictScroll();
			} else {
				restoreScroll();
			}
		});
	};

	return Object.freeze({
		init,
	});
});
