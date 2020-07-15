require('element-closest');
const template = require('./Column/Column.hbs');

export default (function ContentCore(spec) {
	const { contentCore, pubsub, setLazy } = spec;

	const slice = arr => [].slice.call(arr);

	const state = {
		containers: slice(contentCore.querySelectorAll('.js-contentCore-column')),
		animateThirdColumn: true,
	};

	const last = arr => arr[arr.length - 1];

	const forEach = (cb, arr) => [].forEach.call(arr, cb);

	const indexOf = (el, arr) => [].indexOf.call(arr, el);

	const queryLazyImages = () => {
		const els = contentCore.querySelectorAll('.lazy');
		forEach(setLazy, els);
	};

	const disableLinks = cb => e => {
		if (!e.currentTarget.dataset.enabled) {
			e.preventDefault();

			cb(e.currentTarget);
		}
	};

	const getSelectedOrFirstAnchor = column =>
		column.querySelector('.js-contentCore-item a.selected')
			|| column.querySelector('.js-contentCore-item a');

	const setColumnFocus = column => column && getSelectedOrFirstAnchor(column).focus();

	const isFocusInContainer = container => container.contains(document.activeElement);

	const revealFirstColumn = () => {
		state.containers[1].classList.remove('leftArranged');
	};

	const selectPrevColumnSelected = column => {
		setColumnFocus(state.containers[state.containers.indexOf(column) - 1]);

		if (isFocusInContainer(state.containers[0]) && state.containers.length === 3) {
			revealFirstColumn();
		}
	};

	const removeColumn = col => {
		if (isFocusInContainer(col)) {
			selectPrevColumnSelected(col);
		}

		return contentCore.removeChild(col);
	};

	const removeLastColumn = () => {
		if (state.containers.length > 1) {
			removeColumn(last(state.containers));
			state.containers = state.containers.slice(0, -1);

			if (state.containers[1]) {
				state.containers[1].classList.remove('leftArranged');
			}
		}
	};

	const columnExists = i => state.containers[i];

	const toBreadcrumbFormat = container => ({
		title: container.querySelector('a.selected').title,
		url: container.querySelector('a.selected').href,
	});

	const buildColumn = (i, data) => {
		pubsub.emit('historyMustChange', {
			prop: columnExists(i + 1) ? 'replaceState' : 'pushState',
			indexClicked: i,
			length: state.containers.length,
		});

		if (columnExists(i + 1)) {
			forEach(removeColumn, state.containers.slice(i + 1)); // Bad slice
			state.containers = state.containers.slice(0, i + 1); // Good slice
		}

		state.containers[i].insertAdjacentHTML('afterend', template(data));
		state.containers.push(state.containers[i].nextSibling);

		return state.containers[i + 1];
	};

	const setSelectedElement = (i, el, column) => {
		const currentSelected = state.containers[i].querySelector('.selected');

		if (currentSelected) {
			currentSelected.classList.remove('selected');
			currentSelected.setAttribute('aria-expanded', false);
		}

		el.classList.add('selected');
		el.setAttribute('aria-expanded', true);

		return column;
	};

	const setBreadCrumb = () => {
		pubsub.emit('urlchange', state.containers.slice(0, -1).map(toBreadcrumbFormat));
	};

	const setThirdColumnAnimationRequirement = arg => {
		state.animateThirdColumn = !(state.containers.length === 3);

		return arg;
	};

	const arrangeColumns = column => {
		if (state.containers.length === 3) {
			state.containers[1].classList.add('leftArranged');

			if (state.animateThirdColumn) {
				state.containers[2].classList.add('animateThirdColumn');
			}
		}

		return column;
	};

	const replaceHistory = el => window.history.replaceState(null, null, el.href);

	const addBackListener = (el = last(state.containers).querySelector('.js-contentCore-back')) => {
		el.addEventListener('click', removeLastColumn);
	};

	const fetchColumn = i => el => {
		fetch(el.dataset.endpoint)
			.then(res => res.json())
			.then(setThirdColumnAnimationRequirement)
			.then(buildColumn.bind(null, i))
			.then(column => {
				forEach(a => {
					a.addEventListener('click', disableLinks(fetchColumn(i + 1)));
				}, column.querySelectorAll('.js-contentCore-item a'));

				return column;
			})
			.then(arrangeColumns)
			.then(setColumnFocus)
			.then(setSelectedElement.bind(null, i, el))
			.then(replaceHistory.bind(null, el))
			.then(addBackListener)
			.then(setBreadCrumb)
			.then(setThirdColumnAnimationRequirement)
			.then(queryLazyImages);
	};

	const selectNextColumn = column => {
		setColumnFocus(state.containers[state.containers.indexOf(column) + 1]);
		arrangeColumns();
	};

	const isActiveFirstInColumn = column =>
		column.querySelector('.js-contentCore-item a') === document.activeElement;

	const isActiveLastInColumn = column =>
		column.querySelector('.js-contentCore-list:last-of-type .js-contentCore-item:last-of-type a') === document.activeElement;

	const selectInColumn = direction => column => {
		const currentItem = document.activeElement.closest('.js-contentCore-item');
		const lists = column.querySelectorAll('.js-contentCore-list');
		const currentList = document.activeElement.closest('.js-contentCore-list');

		const prev = () => {
			const prevItem = currentItem.previousElementSibling;
			const prevList = lists[indexOf(currentList, lists) - 1];

			return (prevItem && prevItem.querySelector('a'))
				|| (prevList && prevList.querySelector('.js-contentCore-item:last-of-type a'));
		};

		const next = () => {
			const nextItem = currentItem.nextElementSibling;
			const nextList = lists[indexOf(currentList, lists) + 1];

			return (nextItem && nextItem.querySelector('a'))
				|| (nextList && nextList.querySelector('.js-contentCore-item a'));
		};

		const focusable = direction === 'prev' ? prev() : next();

		if (focusable) {
			focusable.focus();
		}
	};

	const handleShiftTab = column =>
		isActiveFirstInColumn(column) && selectPrevColumnSelected(column);

	const handleTab = e => column => {
		if (e.getModifierState('Shift')) {
			handleShiftTab(column);
		} else if (isActiveLastInColumn(column) && !isFocusInContainer(last(state.containers))) {
			e.preventDefault();
			selectNextColumn(column);
		}
	};

	const keydownHandler = e => {
		const keyMap = {
			9: handleTab(e), // TAB
			27: removeLastColumn, // ESCAPE
			37: selectPrevColumnSelected, // LEFT ARROW
			38: selectInColumn('prev'), // UP ARROW
			39: selectNextColumn, // RIGHT ARROW
			40: selectInColumn('next'), // DOWN ARROW
			72: selectPrevColumnSelected, // H
			74: selectInColumn('next'), // J
			75: selectInColumn('prev'), // K
			76: selectNextColumn, // L
		};

		const activeColumn = state.containers
			.filter(isFocusInContainer)[0];

		const shouldPreventDefault = () =>
			(e.keyCode !== 9 && Object.keys(keyMap).indexOf(String(e.keyCode)) !== -1)
				|| (e.keyCode === 9 && e.getModifierState('Shift') && !isFocusInContainer(state.containers[0]) && isActiveFirstInColumn(activeColumn)); // eslint-disable-line

		if (shouldPreventDefault()) {
			e.preventDefault();
		}

		if (keyMap[e.keyCode]) {
			keyMap[e.keyCode](activeColumn);
		}
	};

	const init = () => {
		pubsub.emit('initBreadcrumb', state.containers.slice(0, -1).map(toBreadcrumbFormat));

		forEach((container, i) => {
			const items = container.querySelectorAll('.js-contentCore-item a');

			forEach(item => {
				item.addEventListener('click', disableLinks(fetchColumn(i)));
			}, items);
		}, state.containers);

		contentCore.addEventListener('keydown', keydownHandler);
		forEach(addBackListener, contentCore.querySelectorAll('.js-contentCore-back'));
	};

	return Object.freeze({
		init,
	});
});
