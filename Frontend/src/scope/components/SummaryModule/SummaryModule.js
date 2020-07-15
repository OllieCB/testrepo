export default (function Summary(spec) {
	const { summary } = spec;
	const readmore = summary.querySelector('.js-summary-readmore');
	const text = summary.querySelector('.js-summary-text');

	const toggleReadmore = () => {
		text.classList.toggle('expanded');
		readmore.setAttribute('aria-expanded', !JSON.parse(readmore.getAttribute('aria-expanded')));
		readmore.innerHTML = readmore.innerHTML === readmore.dataset.more
			? readmore.dataset.less
			: readmore.dataset.more;
	};

	const showReadmore = () => {
		readmore.classList.remove('hidden');
	};

	const hideReadmore = () => {
		readmore.classList.add('hidden');
		readmore.setAttribute('aria-expanded', true);
	};

	const checkHeights = () => {
		if (text.querySelector('p').offsetHeight > 180) {
			return true;
		}

		return false;
	};

	const toggleReadmoreBtn = () => {
		if (checkHeights()) {
			showReadmore();
		} else {
			hideReadmore();
		}
	};

	const init = () => {
		readmore.addEventListener('click', toggleReadmore);

		toggleReadmoreBtn();

		window.addEventListener('resize', toggleReadmoreBtn);
	};

	return Object.freeze({
		init,
	});
});
