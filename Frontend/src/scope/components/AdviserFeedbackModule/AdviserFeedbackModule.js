const { default: Popup } = require('../../common/PopupModule/PopupModule');

export default (function AdviserFeedback({ adviserFeedback }) {
	const form = adviserFeedback.querySelector('form');
	const textarea = form.querySelector('textarea');

	const submitHandler = e => {
		e.preventDefault();

		if (form.querySelector(':invalid')) {
			form.classList.add('error');
			textarea.focus();

			return;
		}

		fetch(form.getAttribute('action'), {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				adviserFeedback: textarea.value,
			}),
		})
			.then(res => res.json())
			.then(data => {
				if (data.success) {
					adviserFeedback.classList.add('message');
				} else {
					Popup(Object.assign({}, data.popup, {
						return: form.querySelector('[name=adviserFeedback]'),
					}));
				}
			});
	};

	const init = () => {
		form.querySelector('[type=submit]').addEventListener('click', submitHandler);

		textarea.addEventListener('focusout', () => {
			form.classList.remove('error');
		});
	};

	return Object.freeze({
		init,
	});
});
