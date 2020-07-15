export default (function Summary(spec) {
	const { accordion } = spec;
	const readmores = accordion.querySelectorAll('.js-accordion-toggle');

	const toggleReadmore = readmore => {
		const text = readmore.querySelector('.js-accordion-text');

		if (readmore.classList.contains('expanded')) {
			readmore.classList.remove('expanded');
			readmore.querySelector('.open').focus();
		} else {
			readmore.classList.add('expanded');
			text.focus({ preventScroll: true });
		}
	};

	const handleEsc = (readmore, e) => {
		if (e.keyCode === 27) {
			readmore.classList.remove('expanded');
			readmore.querySelector('.open').focus();
		}
	};

	const init = () => {
		[].forEach.call(readmores, readmore => {
			readmore.addEventListener('click', toggleReadmore.bind(null, readmore));

			readmore.addEventListener('keyup', handleEsc.bind(null, readmore));
		});
	};

	return Object.freeze({
		init,
	});
});
