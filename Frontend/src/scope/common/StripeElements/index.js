require('element-closest');
const { default: Popup } = require('../PopupModule/PopupModule');

export default (function StripeElements(spec) {
	const { form } = spec;
	const submit = form.querySelector('.js-stripeElements-submit');
	const cardFields = {
		cardNumber: {
			field: form.querySelector('.js-card-number'),
		},
		cardCvc: {
			field: form.querySelector('.js-card-cvc'),
		},
		cardExpiry: {
			field: form.querySelector('.js-card-expiry'),
		},
	};
	const details = {};

	const stripe = window.Stripe(submit.dataset.stripePublicKey);

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

	const handleStripeElementChanged = e => {
		const element = cardFields[e.elementType].field;
		const container = element.closest('.js-stripeElements-container');
		if (e.error) {
			container.classList.add('error');
		} else {
			container.classList.remove('error');
		}
	};

	const setUpElements = () => {
		const elements = stripe.elements({
			fonts: [{
				family: 'Hargreaves',
				src: 'url("/fonts/Hargreaves-Regular.woff2") format("woff2"), url("/fonts/Hargreaves-Regular.woff") format("woff")',
				display: 'fallback',
			}],
			locale: 'en',
		});

		const elementStyles = {
			base: {
				color: '#340458',
				fontWeight: 400,
				fontFamily: 'Hargreaves, sans-serif',
				fontSize: '18px',

				'::placeholder': {
					color: '#767676',
				},
			},
			invalid: {
				color: '#340458',
			},
		};

		cardFields.cardNumber.element = elements.create('cardNumber', {
			style: elementStyles,
			placeholder: cardFields.cardNumber.field.dataset.placeholder,
		});
		cardFields.cardNumber.element.mount(cardFields.cardNumber.field);
		cardFields.cardNumber.element.on('change', handleStripeElementChanged);

		cardFields.cardExpiry.element = elements.create('cardExpiry', {
			style: elementStyles,
			placeholder: cardFields.cardExpiry.field.dataset.placeholder,
		});
		cardFields.cardExpiry.element.mount(cardFields.cardExpiry.field);
		cardFields.cardExpiry.element.on('change', handleStripeElementChanged);

		cardFields.cardCvc.element = elements.create('cardCvc', {
			style: elementStyles,
			placeholder: cardFields.cardCvc.field.dataset.placeholder,
		});
		cardFields.cardCvc.element.mount(cardFields.cardCvc.field);
		cardFields.cardCvc.element.on('change', handleStripeElementChanged);
	};

	const getInvalids = () => {
		const invalids = [];
		if (cardFields.cardNumber.field.classList.contains('StripeElement--empty')
			|| cardFields.cardNumber.field.classList.contains('StripeElement--invalid')) {
			invalids.push(cardFields.cardNumber.field);
		}
		if (cardFields.cardExpiry.field.classList.contains('StripeElement--empty')
		|| cardFields.cardExpiry.field.classList.contains('StripeElement--invalid')) {
			invalids.push(cardFields.cardExpiry.field);
		}
		if (cardFields.cardCvc.field.classList.contains('StripeElement--empty')
		|| cardFields.cardCvc.field.classList.contains('StripeElement--invalid')) {
			invalids.push(cardFields.cardCvc.field);
		}
		return invalids;
	};

	const highlightInvalids = invalids => {
		[].forEach.call(invalids, invalid => {
			const clearErr = () => {
				invalid.closest('.js-stripeElements-container').classList.remove('error');
				invalid.removeEventListener('keydown', clearErr);
			};
			invalid.closest('.js-stripeElements-container').classList.add('error');
			invalid.addEventListener('keydown', clearErr);
		});
	};

	const focusInvalids = invalids => {
		if (invalids[0] === cardFields.cardNumber.field) {
			cardFields.cardNumber.element.focus();
		} else if (invalids[0] === cardFields.cardExpiry.field) {
			cardFields.cardExpiry.element.focus();
		} else if (invalids[0] === cardFields.cardCvc.field) {
			cardFields.cardCvc.element.focus();
		}
	};

	const handlePaymentSuccess = url => {
		window.location = url;
	};

	const handlePaymentError = popup => {
		Popup(Object.assign({}, popup, {
			return: cardFields.cardNumber.element,
			onclose: () => enableField(submit, true),
		}));
	};

	const confirmPaymentIntent = paymentDetails => {
		fetch(form.dataset.confirm, {
			method: 'POST',
			redirect: 'follow',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(paymentDetails),
		})
			.then(res => res.json())
			.then(data => {
				if (data.success) {
					handlePaymentSuccess(data.url);
				} else {
					handlePaymentError(data.popup);
				}
			})
			.catch(() => {
				handlePaymentError({
					title: '<img class="error" src="/imgs/error.svg" alt="" /> Error',
					message: 'There was a problem processing your payment, please try again later.',
					button: 'Back to payment',
				});
			});
	};

	const handleCardAction = (clientSecret, paymentDetails) => {
		stripe.handleCardAction(clientSecret)
			.then(result => {
				if (result.error) {
					handlePaymentError({
						title: '<img class="error" src="/imgs/error.svg" alt="" /> Error',
						message: result.error.message,
						button: 'Back to payment',
					});
				} else {
					confirmPaymentIntent(Object.assign(paymentDetails, {
						paymentIntentId: result.paymentIntent.id,
					}));
				}
			});
	};

	const handleToken = token => {
		details.token = token;

		fetch(form.getAttribute('action'), {
			method: 'POST',
			redirect: 'follow',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(details),
		})
			.then(res => res.json())
			.then(data => {
				if (data.requiresAction) {
					handleCardAction(data.clientSecret, details);
				} else if (data.success) {
					handlePaymentSuccess(data.url);
				} else {
					handlePaymentError(data.popup);
				}
			});
	};

	const submitForm = formData => {
		disableField(submit, true);
		Object.assign(details, formData);

		const nameField = form.querySelector('[name=name]');
		const name = nameField
			? nameField.value
			: `${form.querySelector('[name=firstName]').value}  ${form.querySelector('[name=lastName]').value}`;
		const tokenData = {
			name,
			address_line1: form.querySelector('[name=address1]').value,
			address_line2: form.querySelector('[name=address2]').value,
			address_city: form.querySelector('[name=town]').value,
			address_zip: form.querySelector('[name=postcode]').value,
			address_country: form.querySelector('[name=country]').value,
		};

		stripe.createToken(cardFields.cardNumber.element, tokenData)
			.then(result => {
				if (result.error) {
					handlePaymentError({
						title: '<img class="error" src="/imgs/error.svg" alt="" /> Error',
						message: result.error.message,
						button: 'Back to payment',
					});
				} else {
					handleToken(result.token);
				}
			});
	};

	const init = () => {
		setUpElements();
	};

	return Object.freeze({
		init,
		getInvalids,
		highlightInvalids,
		focusInvalids,
		submitForm,
	});
});
