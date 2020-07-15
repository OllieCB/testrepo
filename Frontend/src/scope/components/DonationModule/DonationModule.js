require('element-closest');
const IMask = require('imask');

export default (function Donation(spec) {
	const { donation, pubsub, stripeElements } = spec;
	const containers = donation.querySelectorAll('.js-donation-container');
	const nexts = [].map.call([].slice.call(containers, 0, -1), container =>
		container.querySelector('.js-donation-next'));
	const prevs = [].map.call([].slice.call(containers, 1), container =>
		container.querySelector('.js-donation-prev'));
	const amounts = donation.querySelectorAll('.js-donation-amount');
	const triviaSentences = donation.querySelectorAll('.js-moneyTrivia-sentence');
	const giftAid = donation.querySelector('.js-giftAid');
	const moneySummary = donation.querySelector('.js-moneySummary-toggle');
	const submit = donation.querySelector('.js-donation-submit');
	const paypal = donation.querySelector('.js-donation-paypal');
	const addr = donation.querySelector('.js-donation-address');
	const manual = donation.querySelector('.js-donation-manual');
	const fundraising = donation.querySelector('.js-fundraising');
	const fundraisingInfo = donation.querySelector('.js-fundraising-info');
	const legacy = donation.querySelector('.js-legacy');
	const legacyInfo = donation.querySelector('.js-legacy-info');
	const legacyQuestion = donation.querySelector('.js-legacy-question');
	const giftAidLegacy = donation.querySelector('.js-giftaid-legacy');
	const giftAidFundraising = donation.querySelector('.js-giftaid-fundraising');

	const masked = donation.querySelectorAll('.js-imask');
	const masks = [];

	const showAddr = () => {
		addr.classList.remove('hidden-input');
		manual.classList.add('hidden-input');
	};


	const getAmount = () => {
		const otherAmount = donation.querySelector('[name=otherAmount]');

		if (otherAmount.value) {
			return Number(masks.filter(mask => mask.el === otherAmount)[0].mask.unmaskedValue);
		}

		return Number(amounts[0].parentNode.querySelector(':checked').value);
	};

	const highlightInvalids = invalids => {
		[].forEach.call(invalids, invalid => {
			const clearErr = () => {
				invalid.closest('.js-donation-item').classList.remove('error');
				invalid.removeEventListener('change', clearErr);
			};

			if (invalid.tagName !== 'FIELDSET') {
				invalid.closest('.js-donation-item').classList.add('error');
				invalid.addEventListener('change', clearErr);
			}
		});
	};

	const focusInvalids = invalids => {
		if (invalids[0].tagName === 'FIELDSET') {
			invalids[1].focus();
		} else {
			invalids[0].focus();
		}
	};

	paypal.addEventListener('click', () => {
		const current = donation.querySelector('.js-donation-container.current');
		const invalids = [].slice.call(current.querySelectorAll(':invalid:not(fieldset):not(:disabled)'));

		if (invalids.length === 0) {
			const url = [
				paypal.dataset.baseUrl,
				`return=${paypal.dataset.return}`,
				`business=${paypal.dataset.business}`,
				'item_name=Scope: Donation',
				'currency_code=GBP',
				`amount=${getAmount()}`,
			];

			if (window.ga) {
				window.ga('send', {
					hitType: 'event',
					eventCategory: 'Donate',
					eventAction: 'Paypal click',
					eventLabel: 'Donate Paypal',
				});
			}

			window.location = url.join('&');
		} else {
			highlightInvalids(invalids);
			focusInvalids(invalids);
		}
	});

	const toggleReadmore = readmore => {
		const content = readmore.querySelector('.js-moneySummary-content');

		if (readmore.classList.contains('expanded')) {
			readmore.classList.remove('expanded');
			readmore.querySelector('.open').focus();
		} else {
			readmore.classList.add('expanded');
			content.focus();
		}
	};

	const handleEsc = (readmore, e) => {
		if (e.keyCode === 27) {
			readmore.classList.remove('expanded');
			readmore.querySelector('.open').focus();
		}
	};

	const scroll = endPos => {
		let start;

		const step = ts => {
			if (!start) start = ts;
			const progress = ts - start;
			const amount = endPos - window.pageYOffset;

			window.scrollBy(0, amount / 7);

			if (progress < 700) {
				window.requestAnimationFrame(step);
			}
		};

		window.requestAnimationFrame(step);
	};

	const disableField = (field, showLoading) => {
		field.setAttribute('disabled', 'disabled');
		if (showLoading) {
			field.classList.add('loading');
		}
	};

	const enableField = (field, hideLoading) => {
		field.removeAttribute('disabled');
		if (hideLoading) {
			field.classList.remove('loading');
		}
	};

	const getStripeInvalids = (freq, current) => {
		if (freq === 'card' && current.contains(submit)) {
			return stripeElements.getInvalids();
		}
		return [];
	};

	const getEndPos = (stripeInvalids, invalids) => {
		if (stripeInvalids.length === 0 && invalids.length === 0) {
			return donation.getBoundingClientRect().top + window.pageYOffset;
		}
		if (stripeInvalids.length > 0) {
			return stripeInvalids[0].parentElement.getBoundingClientRect().top + window.pageYOffset;
		}
		return invalids[0].closest('.js-donation-item').getBoundingClientRect().top + window.pageYOffset;
	};

	const handleNext = e => {
		const otherAmount = donation.querySelector('[name=otherAmount]:focus');
		if (otherAmount) {
			otherAmount.dispatchEvent(new Event('blur'));
		}
		const current = donation.querySelector('.js-donation-container.current');
		const freq = donation.querySelector('.js-donation-frequency :checked').value;
		const invalids = [].slice.call(current.querySelectorAll(':invalid:not(fieldset):not(:disabled):not(.__PrivateStripeElement-input)'));
		const stripeInvalids = getStripeInvalids(freq, current);
		const endPos = getEndPos(stripeInvalids, invalids);

		if (stripeInvalids.length === 0 && invalids.length === 0 && !current.contains(submit)) {
			e.preventDefault();
			const index = [].slice.call(containers).indexOf(current);

			const actual = current.nextSibling;
			window.history.pushState({
				pageIndex: index + 1,
			}, '', `#page${index + 2}`);

			current.classList.remove('current');
			actual.classList.add('current');

			scroll(endPos);

			pubsub.emit('steptracker-next');

			donation.querySelector('.js-tracker').focus();
		} else if (freq === 'card' && stripeInvalids.length === 0 && invalids.length === 0 && current.contains(submit)) {
			e.preventDefault();

			const fundraisingChecked = current.querySelector('[name=fundraising]:checked');
			const legacyChecked = current.querySelector('[name=legacy]:checked');
			const formData = {
				recurring: donation.querySelector('[name=frequency]:checked').value === 'debit',
				amount: getAmount(),
				firstName: donation.querySelector('[name=firstName]').value,
				lastName: donation.querySelector('[name=lastName]').value,
				email: donation.querySelector('[name=email]').value,
				phone: donation.querySelector('[name=phone]').value,
				giftAid: current.querySelector('[name=giftAid]').checked,
				legacy: legacyChecked && legacyChecked.value,
				legacyDetail: current.querySelector('[name=legacyDetail]').value,
				fundraising: fundraisingChecked && fundraisingChecked.value,
				fundraisingType: current.querySelector('[name=fundraisingType]').value,
				fundraisingDetail: current.querySelector('[name=fundraisingDetail]').value,
				newsletter: {
					post: current.querySelector('[name=newsPost]').checked,
					phone: current.querySelector('[name=newsPhone]').checked,
					email: current.querySelector('[name=newsEmail]').checked,
					text: current.querySelector('[name=newsText]').checked,
				},
				return: donation.querySelector('[name=return]').value,
				costCentreCode: donation.querySelector('[name=costCentreCode]').value,
			};
			stripeElements.submitForm(formData);
		} else {
			if (freq !== 'debit' || invalids.length > 0) {
				e.preventDefault();
			}

			if (addr.querySelector(':invalid')) {
				showAddr();
			}

			if (stripeInvalids.length > 0) {
				stripeElements.highlightInvalids(stripeInvalids);
				stripeElements.focusInvalids(stripeInvalids);
				highlightInvalids(invalids);
				scroll(endPos);
			} else if (invalids.length > 0) {
				highlightInvalids(invalids);
				focusInvalids(invalids);
				scroll(endPos);
			}
		}
	};

	const handleBack = () => {
		const current = donation.querySelector('.js-donation-container.current');

		current.classList.remove('current');
		current.previousSibling.classList.add('current');
		pubsub.emit('steptracker-prev');
		donation.querySelector('.js-tracker').focus();
	};

	const setGiftAid = amount => {
		const temp = Math.round(amount * 125) / 100;

		giftAid.querySelector('.js-giftAid-amount').innerHTML = `£${amount % 1 === 0 ? amount : amount.toFixed(2)}`;
		giftAid.querySelector('.js-giftAid-result').innerHTML = `£${temp % 1 === 0 ? temp : temp.toFixed(2)}`;
	};

	const amountChangeHandler = e => {
		[].forEach.call(triviaSentences, s => {
			s.classList.remove('current');
		});

		const currentAmountLabel = donation.querySelector(`[for='${e.currentTarget.id}']`);

		triviaSentences[[].indexOf.call(amounts, currentAmountLabel)].classList.add('current');

		const amount = Number(currentAmountLabel.querySelector(':not(.hidden)').innerHTML.replace(/\D+/g, ''));

		setGiftAid(amount);
		window.history.replaceState(window.history.state, '', `?frequency=${donation.querySelector('.js-donation-frequency input:checked').value}&amount=${amount}`);
	};

	const handleHistoryPop = e => {
		const current = donation.querySelector('.js-donation-container.current');
		const index = [].slice.call(containers).indexOf(current);

		if (e.state.pageIndex < index) {
			handleBack();
		} else if (e.state.pageIndex > index) {
			const actual = current.nextSibling;
			const endPos = (donation.getBoundingClientRect().top + window.pageYOffset);

			current.classList.remove('current');
			actual.classList.add('current');

			scroll(endPos);

			pubsub.emit('steptracker-next');

			donation.querySelector('.js-tracker').focus();
		}
	};

	const toggleContainerType = (action, type) => {
		const typeMapClass = {
			debit: '.js-donation-debit',
			card: '.js-donation-byCard',
		};

		const containerType = donation.querySelectorAll(typeMapClass[type]);

		[].forEach.call(containerType, container => {
			const fields = container.querySelectorAll('input,select');

			if (action === 'show') {
				[].forEach.call(fields, field => {
					field.setAttribute('required', true);
					enableField(field);
				});

				container.classList.remove('hidden');
			} else if (action === 'hide') {
				[].forEach.call(fields, field => {
					field.removeAttribute('required');
					disableField(field);
				});

				container.classList.add('hidden');
			}
		});
	};

	const changeAmountTo = type => {
		[].forEach.call(amounts, amount => {
			const input = amount.previousElementSibling;
			input.value = input.dataset[`${type}Value`];
		});
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

	const toggleLegacyQuestion = what => {
		legacy.classList[what]('hidden-input');

		if (what === 'remove') {
			legacy.querySelector('input').setAttribute('required', true);

			const checked = legacy.querySelector(':checked');
			if (checked && checked.value === 'true') {
				legacyInfo.classList.remove('hidden-input');
			}
		} else if (what === 'add') {
			legacy.querySelector('input').removeAttribute('required');
			legacyInfo.classList.add('hidden-input');
		}
	};

	const setFormAction = payment => {
		const form = donation.querySelector('form');

		form.action = form.dataset[payment];
	};

	const togglePaymentFrequency = type => {
		toggleContainerType('hide', type === 'card' ? 'debit' : 'card');
		toggleContainerType('show', type);
		changeAmountTo(type);

		const removeOrAdd = type === 'card' ? 'remove' : 'add';

		paypal.classList[removeOrAdd]('hidden');
		donation.querySelector('.js-donation-or').classList[removeOrAdd]('hidden');
		toggleFundraisingQuestion(removeOrAdd);
		toggleLegacyQuestion(removeOrAdd);

		setFormAction(type);

		setGiftAid(getAmount());
		window.history.replaceState(window.history.state, '', `?frequency=${type}&amount=${getAmount()}`);
	};

	const handleFrequencyChange = e => {
		togglePaymentFrequency(e.target.value);
	};

	const setValuesFromQuery = query => {
		if (query) {
			const queries = query.slice(1).split('&').map(q => q.split('='));
			let type = '';

			queries.forEach(q => {
				if (q[1]) {
					if (q[0] === 'frequency') {
						[, type] = q;
						donation.querySelector('.js-donation-frequency input:checked').removeAttribute('checked');
						donation.querySelector(`.js-donation-frequency input[value=${q[1]}]`).setAttribute('checked', 'checked');

						togglePaymentFrequency(q[1]);
					} else if (q[0] === 'amount') {
						const amountInputs = donation.querySelectorAll('input[name=amount]');
						const input = [].filter.call(amountInputs, amount => amount.value === q[1])[0];
						[].forEach.call(amountInputs, amount => amount.removeAttribute('checked'));

						if (input) {
							input.setAttribute('checked', 'checked');
						} else {
							const otherAmount = donation.querySelector('[name=otherAmount]');
							[, masks.filter(mask => mask.el === otherAmount)[0].mask.value] = q;
						}
					}
				}
			});

			setGiftAid(getAmount());
			window.history.replaceState(window.history.state, '', `?frequency=${type}&amount=${getAmount()}`);
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
		window.history.replaceState({
			pageIndex: 0,
		}, '', '');
		window.onpopstate = handleHistoryPop;

		[].forEach.call(masked, m => {
			const maskStr = atob(m.dataset.imask);
			const mask = JSON.parse(maskStr);

			if (maskStr.indexOf('Number') > -1) {
				mask.blocks.num.mask = Number;
			}
			if (maskStr.indexOf('dispatch') > -1) {
				mask.dispatch = (appended, dynamicMasked) => {
					const number = dynamicMasked.value + appended;

					return dynamicMasked
						.compiledMasks
						.find(cMask =>
							cMask.startsWith.indexOf(number[0]) > -1);
				};
			}

			masks.push({
				el: m,
				mask: new IMask(m, mask),
			});
		});

		setValuesFromQuery(window.location.search);

		[].forEach.call(nexts, next => {
			next.addEventListener('click', handleNext);
		});
		[].forEach.call(prevs, prev => {
			prev.addEventListener('click', () => window.history.back());
		});

		if (moneySummary) {
			moneySummary.addEventListener('click', toggleReadmore.bind(null, moneySummary));
			moneySummary.addEventListener('keyup', handleEsc.bind(null, moneySummary));
		}

		submit.addEventListener('click', handleNext);

		setGiftAid(getAmount());

		donation.querySelector('.js-donation-frequency').addEventListener('change', handleFrequencyChange);

		donation.querySelector('[name=otherAmount]').addEventListener('keyup', e => {
			const checked = donation.querySelector('[name=amount]:checked');

			if (e.target.value) {
				if (checked) checked.checked = false;

				[].filter.call(triviaSentences, t => t.classList.contains('current'))
					.map(t => t.classList.add('hidden'));
			} else if (!e.target.value && e.keyCode === 8) { // BACKSPACE
				[].filter.call(triviaSentences, t => t.classList.contains('current'))
					.map(t => t.classList.remove('current'));
				[].filter.call(triviaSentences, t => t.classList.contains('hidden'))
					.map(t => t.classList.remove('hidden'));

				triviaSentences[0].classList.add('current');

				const temp = donation.querySelector('[name=amount]');
				temp.checked = true;
			}

			setGiftAid(getAmount());
			window.history.replaceState(window.history.state, '', `?frequency=${donation.querySelector('.js-donation-frequency input:checked').value}&amount=${getAmount()}`);
		});

		[].forEach.call(donation.querySelectorAll('[name=amount]'), radio => {
			radio.addEventListener('change', e => {
				amountChangeHandler(e);
				const otherAmount = document.querySelector('[name=otherAmount]');
				otherAmount.value = '';
				otherAmount.closest('.js-donation-item').classList.remove('error');
				masks.filter(mask => mask.el === otherAmount)[0].mask.updateValue();

				[].filter.call(triviaSentences, t => t.classList.contains('hidden'))
					.map(t => t.classList.remove('hidden'));
			});
		});

		legacyQuestion.addEventListener('change', legacyChangeHandler);
	};

	return Object.freeze({
		init,
	});
});
