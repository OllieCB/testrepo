export default (function RevealingForm(spec) {
	const { revealingForm } = spec;
	const activator = revealingForm.querySelector('fieldset,select');

	const forEach = (cb, arr) => {
		if (arr.length > 0) {
			for (let i = 0; i < arr.length; i += 1) {
				cb(arr[i]);
			}
		}
	};

	const isUniqueValue = tag => tag.tagName === 'SELECT' || tag.type === 'radio';

	const disableElem = el => el.setAttribute('disabled', 'disabled');

	const hideAll = () => {
		forEach(elem => {
			elem.classList.add('hidden-input');

			forEach(field => {
				disableElem(field);
			}, elem.querySelectorAll('input,select'));
		}, revealingForm.querySelectorAll('[data-id]:not(.hidden-input)'));
	};

	const revealMatching = id => {
		if (id) {
			const target = revealingForm.querySelector(`[data-id="${id}"]`);

			if (target) {
				forEach(field => {
					field.removeAttribute('disabled');
				}, target.querySelectorAll('input,select,fieldset'));

				target.classList.remove('hidden-input');
			}
		}
	};

	const handleChange = e => {
		if (isUniqueValue(e.target)) {
			hideAll();
		}

		revealMatching(e.target.value);
	};

	const handleInput = field => {
		if ((field.tagName === 'INPUT' && field.checked) || field.tagName === 'SELECT') {
			revealMatching(field.value);
		}

		field.addEventListener('change', handleChange);
	};

	const init = () => {
		const inputs = activator.querySelectorAll('input');

		if (inputs.length > 0) {
			forEach(handleInput, inputs);
		} else {
			handleInput(activator);
		}

		const hiddens = revealingForm.querySelectorAll('.hidden-input fieldset,.hidden-input select,.hidden-input input');

		forEach(disableElem, hiddens);
	};

	return Object.freeze({
		init,
	});
});

