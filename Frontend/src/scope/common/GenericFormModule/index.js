export default (function GenericForm(spec) {
	const { genericForm } = spec;
	const form = genericForm.querySelector('form');
	const date = form.querySelectorAll('.js-generic-date');
	const fileUploads = genericForm.querySelectorAll('.js-file-upload');

	const forEach = (cb, arr) => {
		for (let i = 0; i < arr.length; i += 1) {
			cb(arr[i]);
		}
	};

	const disableSubmit = el => {
		setTimeout(() => { // This is to prevent conflicts with jquery validation
			el.setAttribute('disabled', 'disabled');
		}, 0);
	};

	const handleSubmit = () => {
		if (window.$ && window.$(form).valid()) {
			forEach(disableSubmit, form.querySelectorAll('[type=submit]'));
		}
	};

	const addDateHandler = el => {
		const dateFields = [
			el.querySelector('.js-generic-year'),
			el.querySelector('.js-generic-month'),
			el.querySelector('.js-generic-day'),
		];

		const handleDateChange = () => {
			const dateString = dateFields
				.map(field => field.value)
				.join('-');
			const newDate = new Date(dateString);
			const dateInput = el.querySelector('[type=date]');

			if (
				dateFields.every(f => f.value)
				&& newDate.getMonth() + 1 === parseInt(dateFields[1].value, 10)
			) {
				dateInput.value = dateString; // eslint-disable-line no-param-reassign
			} else {
				dateInput.value = ''; // eslint-disable-line no-param-reassign
			}

			dateInput.dispatchEvent(new Event('change'));
		};

		forEach(field => field.addEventListener('change', handleDateChange), dateFields);
	};

	const fileChangeHandler = field => e => {
		field.querySelector('.js-file-text').innerHTML = e.target.files[0].name; // eslint-disable-line no-param-reassign
	};

	const attachFileListener = field => {
		field.querySelector('input[type=file]').addEventListener('change', fileChangeHandler(field));
	};

	const init = () => {
		forEach(button => button.addEventListener('click', handleSubmit), form.querySelectorAll('[type=submit]'));
		forEach(addDateHandler, date);
		forEach(attachFileListener, fileUploads);
	};

	return Object.freeze({
		init,
	});
});

