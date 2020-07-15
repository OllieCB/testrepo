export default (function TitleBanner(spec) {
	const { titleBanner } = spec;
	const content = titleBanner.querySelector('.js-title-content');
	const contentHeight = window.innerWidth < 1200
		? content.clientHeight + 3
		: content.clientHeight - 47;
	const placeholder = titleBanner.querySelector('.js-title-placeholder');
	const rect = titleBanner.getBoundingClientRect();
	const applyButtonTop = rect.bottom - 84;
	const offsetTop = window.innerWidth < 1200
		? applyButtonTop + window.pageYOffset
		: rect.top + window.pageYOffset;

	const makeSticky = () => {
		if (offsetTop <= window.pageYOffset) {
			content.classList.add('fixed');
			placeholder.style.height = `${contentHeight}px`;
		} else {
			content.classList.remove('fixed');
			placeholder.style.height = 0;
		}
	};

	const init = () => {
		window.addEventListener('scroll', makeSticky);
	};

	return Object.freeze({
		init,
	});
});
