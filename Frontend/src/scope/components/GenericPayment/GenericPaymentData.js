export default {
	bottomMargin: true,
	topMargin: false,
	cEndpoint: '/genericPayment/submit',
	confirmEndpoint: '/genericPayment/confirm',
	byCard: {
		number: {
			label: 'Card number',
			placeholder: 'eg. 0000 0000 0000 0000',
			error: 'Please enter a valid card number',
			required: true,
			errId: 'gpcnerr',
			id: 'gpcn'
		},
		expiry: {
			label: 'Expiry data',
			placeholder: 'eg. 12/20',
			error: 'Please enter a valid expiry data',
			required: true,
			errId: 'gpexperr',
			id: 'gpexp'
		},
		cvv: {
			label: 'CVV',
			placeholder: 'eg. 000',
			error: 'Please enter a valid CVV',
			required: true,
			errId: 'gpcvverr',
			id: 'gpcvv'
		}
	},
	secureText: 'All our transactions are fully secure.',
	submit: 'Confirm',
	stripeKey: 'pk_test_feT58fZhxzGF344UQlMgqzzp'
};
