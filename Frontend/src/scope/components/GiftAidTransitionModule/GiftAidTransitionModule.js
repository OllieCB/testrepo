require('element-closest');

export default (function Giftaid({ giftaid }) {
	const submit = giftaid.querySelector('button[type=submit]');
	const fundraising = giftaid.querySelector('.js-fundraising');
	const fundraisingInfo = giftaid.querySelector('.js-fundraising-info');
	const legacyInfo = giftaid.querySelector('.js-legacy-info');
	const legacyQuestion = giftaid.querySelector('.js-legacy-question');
	const giftAidLegacy = giftaid.querySelector('.js-giftaid-legacy');
	const giftAidFundraising = giftaid.querySelector('.js-giftaid-fundraising');

	const forEach = (cb, arr) => {
		for (let i = 0; i < arr.length; i += 1) {
			cb(arr[i]);
		}
	};

	const getInvalids = () => [].slice.call(giftaid.querySelectorAll(':invalid:not(form):not(input)'));

	const clearErrorState = invalid => {
		invalid.closest('.js-donation-item').classList.remove('error');
		invalid.removeEventListener('keydown', clearErrorState);
	};

	const setErrorState = invalid => {
		invalid.closest('.js-donation-item').classList.add('error');
		invalid.addEventListener('change', clearErrorState.bind(null, invalid));
	};

	const handleErrors = invalids => {
		forEach(setErrorState, invalids);
	};

	const disableField = field => {
		field.setAttribute('disabled');
	};

	const handleSubmit = e => {
		const invalids = getInvalids();

		if (invalids.length > 0) {
			e.preventDefault();

			handleErrors(invalids);
		} else {
			disableField(submit);
		}
	};

	const toggleFundraisingQuestion = what => {
		fundraising.classList[what]('hidden-input');

		if (what === 'remove') {
			fundraising.querySelector('input').setAttribute('required', true);

			const checked = fundraising.querySelector(':checked');
			if (checked && checked.value === 'true') {
				fundraisingInfo.classList.remove('hidden-input');
			}
		} else if (what === 'add') {
			fundraising.querySelector('input').removeAttribute('required');
			fundraisingInfo.classList.add('hidden-input');
		}
	};

	const legacyChangeHandler = e => {
		if (e.target.value === 'true') {
			legacyInfo.classList.remove('hidden-input');
			giftAidLegacy.classList.remove('hidden-input');
			giftAidFundraising.classList.add('hidden-input');
			toggleFundraisingQuestion('add');
		} else {
			legacyInfo.classList.add('hidden-input');
			giftAidLegacy.classList.add('hidden-input');
			giftAidFundraising.classList.remove('hidden-input');
			toggleFundraisingQuestion('remove');
		}
	};

	const init = () => {
		legacyQuestion.addEventListener('change', legacyChangeHandler);
		submit.addEventListener('click', handleSubmit);
	};

	return Object.freeze({
		init,
	});
});
