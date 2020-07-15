export default (function Fundraising(spec) {
	const { fundraising } = spec;
	const fundraisingQuestion = fundraising.querySelector('.js-fundraising-question');
	const fundraisingInfo = fundraising.querySelector('.js-fundraising-info');

	const changeHandler = e => {
		if (e.target.value === 'true') {
			fundraisingInfo.classList.remove('hidden-input');
			fundraisingInfo.querySelector('select').setAttribute('required', true);
		} else {
			fundraisingInfo.classList.add('hidden-input');
			fundraisingInfo.querySelector('select').removeAttribute('required');
		}
	};

	const init = () => {
		fundraisingQuestion.addEventListener('change', changeHandler);
	};

	return Object.freeze({
		init,
	});
});
