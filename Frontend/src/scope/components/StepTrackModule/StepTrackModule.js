export default (function StepTracker(spec) {
	const { tracker, pubsub } = spec;
	const state = {
		current: 0,
	};

	const outer = tracker.querySelector('.js-tracker-out');
	const inner = tracker.querySelector('.js-tracker-in');
	const items = tracker.querySelectorAll('.js-tracker-item');
	const ariaLabel = tracker.querySelector('.js-tracker-aria-label');

	const drawline = () => {
		const total = outer.offsetWidth;
		const width = items[state.current].querySelector('.js-tracker-circle').getBoundingClientRect().left -
			items[0].querySelector('.js-tracker-circle').getBoundingClientRect().left;

		inner.style.width = `${(width / total) * 100}%`;
	};

	const next = () => {
		state.current += 1;
		ariaLabel.setAttribute('aria-label', `step ${state.current + 1} of ${items.length} ${items[state.current].textContent}`);
		setTimeout(() => {
			items[state.current].classList.add('visited');
		}, 300); // Transision time in css for drawline is 300
		drawline();
	};

	const prev = () => {
		state.current -= 1;
		ariaLabel.setAttribute('aria-label', `step ${state.current + 1} of ${items.length} ${items[state.current].textContent}`);
		items[state.current + 1].classList.remove('visited');
		drawline();
	};

	const init = () => {
		pubsub.on('steptracker-next', next);
		pubsub.on('steptracker-prev', prev);
	};

	return Object.freeze({
		init,
	});
});
