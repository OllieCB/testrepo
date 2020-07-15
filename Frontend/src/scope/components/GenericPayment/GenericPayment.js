require('element-closest');

export default (function GenericPayment(spec) {
	const { genericPayment, stripeElements } = spec;
	const submit = genericPayment.querySelector('[type=submit]');

	const formData = {
		eId: genericPayment.querySelector('[name=eId]').value,
		cId: genericPayment.querySelector('[name=cId]').value,
	};

	const handleSubmit = e => {
		e.preventDefault();
		const invalids = stripeElements.getInvalids();

		if (invalids.length === 0) {
			stripeElements.submitForm(formData);
		} else {
			stripeElements.highlightInvalids(invalids);
			stripeElements.focusInvalids(invalids);
		}
	};

	const init = () => {
		submit.addEventListener('click', handleSubmit);
	};

	return Object.freeze({
		init,
	});
});
