const template = require('../../common/PopupModule/PopupModule.hbs');

export default (function Popup(spec) {
	const div = document.createElement('div');

	const preventScroll = e => {
		e.preventDefault();
	};

	const closePopup = () => {
		spec.return.focus();

		if (spec.onclose) {
			spec.onclose();
		}

		document.body.removeChild(div);
		window.removeEventListener('wheel', preventScroll, { passive: false });

		document.onclick = null;
	};

	div.innerHTML = template({
		title: spec.title,
		message: spec.message,
		button: spec.button,
	});

	const popupBox = div.querySelector('.js-popup-box');
	const popupBtn = div.querySelector('.js-popup-btn');

	popupBtn.addEventListener('click', () => {
		closePopup();
	});

	document.onclick = closePopup;

	document.body.appendChild(div);
	window.addEventListener('wheel', preventScroll, { passive: false });

	popupBox.addEventListener('keydown', event => {
		if (event.keyCode === 9) { // TAB
			if (event.shiftKey && document.activeElement === popupBox) {
				event.preventDefault();
				popupBtn.focus();
			} else if (document.activeElement === popupBtn) {
				event.preventDefault();
				popupBox.focus();
			}
		}
	});

	popupBox.focus();

	return undefined;
});
