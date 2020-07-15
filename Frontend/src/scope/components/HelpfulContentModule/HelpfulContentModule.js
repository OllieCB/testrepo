export default (function HelpfulContent(spec) {
	const { helpfulContent } = spec;

	const popupOffset = 62.5; // show at Xem from top

	let accessKeyState = true;

	const helpfulContentFixed = helpfulContent.querySelector('.js-helpful-fixed');

	const show = what => {
		helpfulContent.classList.add('message');
		helpfulContent.classList.add(what);
		helpfulContentFixed.querySelector('.close img').src = '/imgs/close-dark.svg';
		helpfulContentFixed.classList.add('message');
		helpfulContentFixed.classList.add(what);
	};

	const handleClose = () => {
		if (helpfulContentFixed) {
			helpfulContentFixed.remove();
		}
		accessKeyState = false;
	};

	const handleClick = e => {
		fetch(e.target.dataset.endpoint)
			.then(res => res.json())
			.then(data => {
				const isClickFromFixed = helpfulContentFixed.contains(e.target);
				if (!isClickFromFixed) {
					handleClose();
				}
				show(data.value);
				if (isClickFromFixed) {
					if (data.value === 'yes') {
						const yesLink = helpfulContentFixed.querySelector('.HelpfulContent__yes').querySelector('a');
						yesLink.focus();
						yesLink.addEventListener('click', handleClose);
					} else {
						const noLink = helpfulContentFixed.querySelector('.HelpfulContent__no').querySelector('a');
						noLink.focus();
						noLink.addEventListener('click', handleClose);
					}
				} else if (data.value === 'yes') {
					helpfulContent.querySelector('.HelpfulContent__yes').querySelector('a').focus();
				} else {
					helpfulContent.querySelector('.HelpfulContent__no').querySelector('a').focus();
				}
			});
	};

	const handleAccesskey = e => {
		if (e.altKey && e.keyCode === 89 && accessKeyState) { // ALT + Y
			helpfulContentFixed.querySelectorAll('.js-helpful-btn')[0].click();
		}
		if (e.altKey && e.keyCode === 78 && accessKeyState) { // ALT + N
			helpfulContentFixed.querySelectorAll('.js-helpful-btn')[1].click();
		}
		if (e.keyCode === 27 && accessKeyState) { // ESC
			handleClose();
		}
	};

	const scrollHandler = () => {
		const rect = helpfulContent.getBoundingClientRect();
		const inEms = Number(getComputedStyle(document.body, '').fontSize.match(/(\d*(\.\d*)?)px/)[1]) * popupOffset;
		if (window.innerHeight > rect.bottom || window.scrollY > inEms) {
			helpfulContentFixed.classList.remove('hidden');
			window.addEventListener('keydown', handleAccesskey);
		}
	};

	const initFixedClone = () => {
		document.querySelector('.js-helpful-content').prepend(helpfulContentFixed);
		helpfulContentFixed.querySelector('.close').addEventListener('click', handleClose);
	};

	const init = () => {
		[].forEach.call(helpfulContent.querySelectorAll('.js-helpful-btn'), btn => {
			btn.addEventListener('click', handleClick);
		});
		if (helpfulContentFixed) {
			initFixedClone();
			window.addEventListener('scroll', scrollHandler);
		}
	};

	return Object.freeze({
		init,
	});
});
