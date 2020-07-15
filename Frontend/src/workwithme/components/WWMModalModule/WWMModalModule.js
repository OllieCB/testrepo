export default (function Modal(spec) {
	const modalContainer = document.querySelector('.modals-container');
	const modal = spec.modals;
	const allModals = document.querySelectorAll('.modal');
	const openTriggers = document.querySelectorAll('.js-modal__open-trigger');
	const closeTriggers = document.querySelectorAll('.js-modal__close-trigger');
	const videos = modal.querySelectorAll('.js-modal__iframe');
	const activeClass = 'modal__open';

	const stopVideo = () => {
		videos.forEach(video => {
			const videoSrc = video.getAttribute('src');
			video.setAttribute('src', videoSrc);
		});
	};

	const closeModal = () => {
		allModals.forEach(thisModal => {
			thisModal.classList.remove(activeClass);
		});
		document.body.classList.remove(activeClass);
		stopVideo();
	};

	const closeModals = () => {
		closeTriggers.forEach(trigger => {
			trigger.addEventListener('click', () => {
				closeModal();
			});
		});

		allModals.forEach(thisModal => {
			thisModal.addEventListener('click', e => {
				if (e.target !== thisModal) {
					return;
				}
				closeModal();
			});
		});

		document.addEventListener('keyup', event => {
			const evt = event || window.event;
			if (evt.keyCode === 27) {
				closeModal();
			}
		});
	};

	const openModals = () => {
		openTriggers.forEach(trigger => {
			trigger.addEventListener('click', () => {
				const targetID = trigger.getAttribute('data-modal-id');
				const targetModal = document.getElementById(targetID);
				targetModal.classList.add(activeClass);
				document.body.classList.add(activeClass);
				targetModal.scrollTop = 0;
			});
		});
	};

	const init = () => {
		if (allModals.length) {
			allModals.forEach(m => {
				modalContainer.appendChild(m);
			});
		}

		openModals();
		closeModals();
	};

	return Object.freeze({
		init,
	});
});
