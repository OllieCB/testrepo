/* eslint-disable no-const-assign */
export default (function Progress() {
	const topics = document.querySelectorAll('.form__search--toggle');
	const toggleLists = document.querySelectorAll('.form__search--toggle-list');
	const filters = document.querySelectorAll('.form__search--filter');

	const handleTopics = topic => {
		topic.addEventListener('click', () => {
			const classes = topic.classList;
			// const filter = topic.dataset.filterType;
			// const countHtml = document.body.querySelector(`.form
			// __search--filter[data-toggle-list="${filter}"] .filter-count`).innerHTML;
			// const count = parseInt(countHtml, 10);

			if (!classes.contains('active')) {
				// count += 1;
				topic.classList.add('active');
			} else {
				topic.classList.remove('active');
			}
		}, false);
	};

	const handleFilters = filter => {
		filter.addEventListener('click', () => {
			const classes = filter.classList;
			const targetID = filter.dataset.toggleList;
			const target = document.getElementById(targetID);

			if (!classes.contains('active')) {
				filters.forEach(fltr => {
					fltr.classList.remove('active');
				});

				toggleLists.forEach(lst => {
					lst.classList.remove('active');
				});

				target.classList.add('active');
				filter.classList.add('active');
			} else {
				target.classList.remove('active');
				filter.classList.remove('active');
			}
		}, false);
	};

	const init = () => {
		topics.forEach(topic => {
			handleTopics(topic);
		});

		filters.forEach(filter => {
			handleFilters(filter);
		});
	};

	return Object.freeze({
		init,
	});
});
