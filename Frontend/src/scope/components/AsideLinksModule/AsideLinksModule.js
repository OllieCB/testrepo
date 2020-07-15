export default (function AsideLinks(spec) {
	const { asideLinks } = spec;
	const list = asideLinks.querySelector('.js-asideLinks-list');
	const anchors = list.querySelectorAll('a');
	const headings = [].map.call(anchors, a => document.querySelector(a.getAttribute('href')));
	const offsetTop = list.getBoundingClientRect().top + window.pageYOffset;
	const footer = document.querySelector('.js-footer');

	const state = {
		clickScrolling: false,
	};

	const handleClick = e => {
		e.preventDefault();

		asideLinks.querySelector('.current').classList.remove('current');
		e.target.classList.add('current');

		const target = document.querySelector(e.target.getAttribute('href'));
		const endPos = (target.getBoundingClientRect().top + window.pageYOffset);
		let start;
		state.clickScrolling = true;

		const step = ts => {
			if (!start) start = ts;
			const progress = ts - start;
			const amount = endPos - window.pageYOffset;

			window.scrollBy(0, amount / 7);

			if (progress < 700) {
				window.requestAnimationFrame(step);
			} else {
				state.clickScrolling = false;
				window.location.hash = e.target.getAttribute('href').slice(1);
			}
		};

		window.requestAnimationFrame(step);
	};

	const handleResize = () => {
		list.style.width = asideLinks.offsetWidth - 1 + 'px'; // eslint-disable-line
	};

	const forEach = (arr, cb) => {
		for (let i = 0; i < arr.length; i += 1) {
			cb(arr[i]);
		}
	};

	const filter = (arr, cb) => {
		const temp = [];

		forEach(arr, a => {
			if (cb(a)) {
				temp.push(a);
			}
		});

		return temp;
	};

	const getPositiveOrZero = n => (n > 0 ? n : 0);

	const getScreenHeightOrLess = n => (n < window.innerHeight ? n : window.innerHeight);

	const distanceFromRelativeTop = () => getPositiveOrZero(offsetTop - window.pageYOffset);

	const distanceFromRelativeBottom = () =>
		getScreenHeightOrLess(footer.getBoundingClientRect().top);

	const isAtScreenTop = () => offsetTop <= window.pageYOffset;

	const isAtBottom = () => list.getBoundingClientRect().height > footer.getBoundingClientRect().top;

	const handleScroll = () => {
		if (isAtScreenTop()) {
			list.classList.add('fixed');
			handleResize();
		} else {
			list.classList.remove('fixed');
		}

		if (!isAtBottom()) {
			list.style.top = '0';
		}

		const requiredHeight = distanceFromRelativeBottom() - distanceFromRelativeTop();
		const innerList = list.querySelector('ul');

		if (requiredHeight !== innerList.getBoundingClientRect().height) {
			innerList.style.height = `${requiredHeight}px`;
		}

		if (!state.clickScrolling) {
			forEach(headings, heading => {
				const headingOffsetTop = heading.getBoundingClientRect().top;

				if (headingOffsetTop <= 20) {
					filter(anchors, a => a.classList.contains('current'))[0].classList.remove('current');

					filter(anchors, a => a.getAttribute('href') === `#${heading.id}`)[0].classList.add('current');
				}
			});
		}
	};

	const last = arr => arr[arr.length - 1];

	const init = () => {
		const temp = document.querySelector(`[href="#${last(window.location.href.split('#'))}"]`);

		if (list.contains(temp)) {
			temp.classList.add('current');
		} else {
			list.querySelector('a').classList.add('current');
		}

		if (window.pageYOffset !== 0) {
			handleScroll();
		}

		window.addEventListener('resize', handleResize);
		window.addEventListener('scroll', handleScroll);

		forEach(list.querySelectorAll('a'), a => a.addEventListener('click', handleClick));
	};

	return Object.freeze({
		init,
	});
});
