const Lazy = (function Lazy(imgSizes) {
	const parseUrls = el => el.dataset.imgs.split(',');

	const isInView = el => {
		if (el) {
			const rect = el.getBoundingClientRect();

			return rect.top <= window.innerHeight &&
				rect.bottom >= 0;
		}

		return false;
	};

	const matchParentWidth = el => x => x >= el.parentElement.offsetWidth;

	const getSourceForWidth = el => {
		const urls = parseUrls(el);
		const i = imgSizes.indexOf(imgSizes.find(matchParentWidth(el)));

		return urls[i];
	};

	const setLazy = el => {
		if (parseUrls(el).length === 1) {
			el.setAttribute('src', el.dataset.imgs);
			el.classList.remove('lazy');
		} else {
			const matchingSrc = getSourceForWidth(el);

			if (el.classList.contains('thumb')) { //eslint-disable-line
				const temp = document.createElement('img');
				temp.src = matchingSrc;

				temp.addEventListener('load', () => {
					el.setAttribute('src', temp.src);
					el.classList.remove('thumb');
				});
			} else if (matchingSrc !== el.getAttribute('src')) {
				el.setAttribute('src', matchingSrc);

				if (el.classList.contains('lazy')) {
					el.classList.remove('lazy');
					el.classList.add('lazy-set');
				}
			}
		}
	};

	const filter = (cb, arr) => {
		const temp = [];

		for (let i = 0; i < arr.length; i += 1) {
			if (cb(arr[i])) {
				temp.push(arr[i]);
			}
		}

		return temp;
	};

	const setLazyIfInView = els => {
		filter(isInView, els)
			.forEach(setLazy);
	};

	const init = () => {
		setLazyIfInView(document.querySelectorAll('.lazy'));

		window.addEventListener('scroll', () => {
			setLazyIfInView(document.querySelectorAll('.lazy'));
		});

		window.addEventListener('resize', () => {
			setLazyIfInView(document.querySelectorAll('.lazy-set'));
		});
	};

	return Object.freeze({
		init,
		setLazy,
	});
}([600, 1110, 1400]));

window.addEventListener('load', Lazy.init);

module.exports = Lazy;
