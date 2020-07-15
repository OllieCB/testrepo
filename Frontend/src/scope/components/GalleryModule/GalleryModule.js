export default (function Gallery(spec) {
	const { gallery } = spec;
	const imgs = gallery.querySelectorAll('.js-gallery-slide');
	const slider = gallery.querySelector('.js-gallery-slider');
	const counter = gallery.querySelector('.js-gallery-counter');
	const captions = gallery.querySelectorAll('.js-gallery-captions');
	const prevBtn = gallery.querySelector('.js-prev');
	const nextBtn = gallery.querySelector('.js-next');

	const state = {
		currentSlide: 0,
	};

	const hideCaptions = () => {
		[].forEach.call(captions, caption => {
			caption.classList.remove('current');
			caption.setAttribute('aria-hidden', true);
		});
	};

	const showCaption = caption => {
		caption.classList.add('current');
		caption.setAttribute('aria-hidden', false);
	};

	const handleBtnsVisibility = () => {
		if (state.currentSlide === 0) {
			prevBtn.classList.add('hidden');
			nextBtn.focus();
		} else if (state.currentSlide === imgs.length - 1) {
			nextBtn.classList.add('hidden');
			prevBtn.focus();
		} else {
			prevBtn.classList.remove('hidden');
			nextBtn.classList.remove('hidden');
		}
	};

	const render = index => {
		counter.querySelector('span').innerHTML = index + 1;
		counter.setAttribute('aria-label', '');
		counter.setAttribute('aria-label', `${index + 1} of 3`);
		slider.style.left = `-${index}00%`;

		[].forEach.call(slider.querySelectorAll('.js-gallery-slide'), slide => {
			slide.setAttribute('aria-hidden', true);
		});
		slider.querySelector(`.js-gallery-slide:nth-of-type(${index + 1}n)`).setAttribute('aria-hidden', false);

		hideCaptions();
		showCaption(captions[index]);
		handleBtnsVisibility();
	};

	const previous = () => {
		if (state.currentSlide > 0) {
			state.currentSlide -= 1;
			render(state.currentSlide);
		}
	};

	const next = () => {
		if (state.currentSlide < imgs.length - 1) {
			state.currentSlide += 1;
			render(state.currentSlide);
		}
	};

	const handleClicks = e => {
		const sliderOffsetLeft = slider.getBoundingClientRect().left +
			(state.currentSlide * slider.getBoundingClientRect().width);

		if (e.pageX - sliderOffsetLeft > slider.offsetWidth / 2) {
			next();
		} else {
			previous();
		}
	};

	const init = () => {
		slider.addEventListener('click', handleClicks);

		prevBtn.addEventListener('click', previous);
		nextBtn.addEventListener('click', next);

		showCaption(captions[state.currentSlide]);
	};

	return Object.freeze({
		init,
		previous,
		next,
	});
});
