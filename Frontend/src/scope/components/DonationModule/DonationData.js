export default {
	mEndpoint: '/donation/monthly',
	cEndpoint: '/donation/submit',
	confirmEndpoint: '/donation/confirm',
	return: 'http://localhost:9000/thankyou',
	costCentreCode: 'donation',
	amount: {
		moneySummary: {
			id: 'moneySummaryContainer',
			title: 'Where your money goes',
			graph: {
				placeholder: require('images/transparent1px.png'),
				url: require('media/moneyChart.svg'),
				alt: 'some descriptive alt text'
			},
			items: [
				{
					amount: '70p',
					text: 'goes towards supporting disabled families, so they can have the same opportunities as everyone else.'
				},
				{
					amount: '20p',
					text: 'is spent on selling your donated goods through our shops, which raises even more money for us.'
				},
				{
					amount: '9p',
					text: 'is spent on fundraising with our supporters.'
				},
				{
					amount: '1p',
					text: 'is spent on making sure the charity is efficient and well run.'
				}
			],
			placeholder: require('images/transparent1px.png'),
			more: require('images/plus.svg'),
			less: require('images/minus.svg')
		},
		frequency: {
			name: 'frequency',
			items: [
				{
					value: 'debit',
					label: 'Monthly',
					id: 'frequency-monthly',
					checked: true
				},
				{
					value: 'card',
					label: 'One-time',
					id: 'frequency-once'
				}
			]
		},
		amount: {
			name: 'amount',
			items: [
				{
					debit: {
						value: '2',
						label: '£ 2',
					},
					card: {
						value: '12',
						label: '£ 12',
					},
					id: 'amount-12',
					checked: true
				},
				{
					debit: {
						value: '10',
						label: '£ 10',
					},
					card: {
						value: '20',
						label: '£ 20',
					},
					id: 'amount-20',
				},
				{
					debit: {
						value: '25',
						label: '£ 25',
					},
					card: {
						value: '100',
						label: '£ 100',
					},
					id: 'amount-100',
				},
			]
		},
		otherAmount: {
			errId: 'otherAmountErr',
			error: 'Please enter a valid number',
			name: 'otherAmount',
			label: 'Other amount:',
			placeholder: 'Type in £...'
		},
		paypal: {
			baseUrl: 'https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_xclick',
			business: 'accounts-facilitator@aqueduct.co.uk',
			return: 'http://172.31.10.162:9000/giftaid',
			placeholder: require('images/transparent1px.png'),
			url: require('images/paypal.svg'),
			alt: 'Use paypal'
		},
		debit: {
			label: 'Next',
		},
		byCard: {
			label: 'Pay by card',
			icons: [
				{
					placeholder: require('images/transparent1px.png'),
					url: require('images/visa.svg'),
					alt: 'visa'
				},
				{
					placeholder: require('images/transparent1px.png'),
					url: require('images/mastercard.svg'),
					alt: 'mastercard'
				},
				{
					placeholder: require('images/transparent1px.png'),
					url: require('images/amex.svg'),
					alt: 'american express'
				}
			]
		}
	},
	details: {
		firstName: {
			errId: 'firstNameErr',
			label: 'First name',
			placeholder: 'Type in your name...',
			error: 'Please enter a valid name',
			required: true
		},
		lastName: {
			errId: 'lastNameErr',
			label: 'Last name',
			placeholder: 'Type in your last name...',
			error: 'Please enter a valid name',
			required: true
		},
		email: {
			errId: 'emailErr',
			label: 'Email address',
			placeholder: 'Type in your email...',
			error: 'Please enter a valid email',
			required: true
		},
		phone: {
			label: 'Phone number',
			placeholder: 'Type in your number...',
			error: 'Please enter a valid phone number',
			required: false
		},
		postcode: {
			errId: 'postcodeErr',
			label: 'Post code',
			placeholder: 'Type in your post code...',
			error: 'Please enter a valid post code',
			required: true
		},
		lookup: {
			lookup: 'Look up address',
			manual: 'Manual address',
			endpoint: '/postcodeLookup'
		},
		address1: {
			errId: 'addr1Err',
			label: 'Address Line 1',
			placeholder: 'Type in your address',
			error: 'Please enter a valid address',
			required: true
		},
		address2: {
			label: 'Address Line 2',
			placeholder: 'Type in your address',
			error: 'Please enter a valid address',
			required: false
		},
		town: {
			errId: 'townErr',
			label: 'Town',
			placeholder: 'Type in your town',
			error: 'Please enter a valid town',
			required: true
		},
		countries: {
			errId: 'countriesErr',
			label: 'Country',
			error: 'Please select a country',
			required: true,
			items: [
				{
					value: 'GB',
					label: 'United Kingdom'
				},
				{
					value: 'FR',
					label: 'France'
				},
				{
					value: 'ES',
					label: 'Spain'
				}
			]
		},
		back: 'Back',
		next: 'Next'
	},
	card: {
		byCard: {
			number: {
				errId: 'cardNumberErr',
				label: 'Card number',
				placeholder: 'eg. 0000 0000 0000 0000',
				error: 'Please enter a valid card number',
				required: true
			},
			expiry: {
				errId: 'cardExpiryErr',
				label: 'Expiry data',
				placeholder: 'eg. 12/20',
				error: 'Please enter a valid expiry data',
				required: true
			},
			cvv: {
				errId: 'cardCVVErr',
				label: 'CVV',
				placeholder: 'eg. 000',
				error: 'Please enter a valid CVV',
				required: true
			}
		},
		debit: {
			name: {
				errId: 'debitNameErr',
				label: 'Account name',
				placeholder: 'eg. Rose lightwood',
				error: 'Please enter a valid account name',
				required: true
			},
			sortcode: {
				errId: 'debitSortErr',
				label: 'Sort code',
				placeholder: 'eg. 00-00-00',
				error: 'Please enter a valid sort code',
				required: true
			},
			number: {
				errId: 'debitNumberErr',
				label: 'Account number',
				placeholder: 'eg. 12345678',
				error: 'Please enter a valid account number',
				required: true
			},
			day: [
				{
					label: '3rd',
					value: '3'
				},
				{
					label: '10th',
					value: '10'
				},
				{
					label: '20th',
					value: '20'
				},
				{
					label: '28th',
					value: '28'
				},
			]
		},
		secureText: 'All our transactions are fully secure.',
		legacy: {
			label: 'Is this money a gift that was left in a will?',
			required: true,
			options: [
				{
					label: 'Yes',
					value: 'true',
					name: 'legacy',
					required: true
				},
				{
					label: 'No',
					value: 'false',
					name: 'legacy'
				}
			],
			more: {
				label: 'Please tell us more about the gift',
				name: 'legacyDetail'
			},
		},
		giftAid: {
			title: 'Gift Aid',
			text: '<p>Add Gift Aid to your donation at no extra cost.<br/>With Gift Aid, your donation of <span class="js-giftAid-amount"></span> would be worth <span class="js-giftAid-result"></span> at no extra cost to you</p>',
			legacyText: '<p>You can\'t use Gift Aid for a gift from a will.</p>',
			label: 'I am a UK tax payer and want Scope to treat all qualifying donations over the last four years, today, and in the future as Gift Aid donations.',
			small: '<p><small>By checking the above box, I confirm I am a UK taxpayer and understand that if I pay less Income Tax and/or Capital Gains Tax than the amount of Gift Aid claimed on all my donations in that tax year it is my responsability to pay any difference Gift Aid allows Scope to reclaim 25p of tax on every £1 that I give.</small></p>',
			placeholder: require('images/transparent1px.png'),
			icon: require('images/giftaid.svg')
		},
		fundraising: {
			label: 'Did you do any fundraising to raise this money?',
			required: true,
			options: [
				{
					label: 'Yes',
					value: 'true',
					name: 'fundraising',
					required: true
				},
				{
					label: 'No',
					value: 'false',
					name: 'fundraising'
				}
			],
			how: {
				label: 'How did you raise the money?',
				name: 'fundraisingType',
				required: true,
				options: [
					{
						label: 'I raised money in memory of someone',
						value: 'memory'
					},
					{
						label: 'I took part in a challenge event',
						value: 'challenge'
					},
					{
						label: 'I organised my own personal fundraiser',
						value: 'own'
					},
					{
						label: 'I fundraised at work',
						value: 'work'
					},
					{
						label: 'I fundraised at school',
						value: 'school'
					},
					{
						label: 'Other',
						value: 'other'
					}
				]
			},
			more: {
				label: 'You can tell us more about your fundraising here',
				name: 'fundraisingDetail'
			},
			err: {
				id: 'fundErr',
				msg: 'This field is required',
			}
		},
		contacts: {
			title: 'Keeping in touch',
			text: '<p>We\'d love to keep you updated on how you\'re helping make a difference for disabled people, as well as other ways you can access or give support.<br/>Please let us know how you\'d like to stay updated.',
			options: [
				{
					name: 'newsPost',
					value: 'true',
					label: 'Post'
				},
				{
					name: 'newsPhone',
					value: 'true',
					label: 'Phone'
				},
				{
					name: 'newsEmail',
					value: 'true',
					label: 'Email'
				},
				{
					name: 'newsText',
					value: 'true',
					label: 'Text'
				},
			],
			small: '<p>You\'re in control. You can change your preferences at any time by emailing <a href="mailto:someemail@gmail.com">supportercare@scope.org.uk</a> or calling us on 020 7610 7296. You can also read about how we protect and use your personal information in our <a href="privacy.html" target="_blank" rel="noopener noreferrer">privacy policy</a></p>'
		},
		back: 'Back',
		next: 'Confirm',
		stripeKey: 'pk_test_feT58fZhxzGF344UQlMgqzzp'
	},
	moneyTrivia: {
		sentences: [
			'Sentence example one',
			'Sentence example two',
			'Sentence example three',
		]
	},
	needHelp: {
		type: 'tel',
		value: '0276197296',
		label: 'Need help?',
		content: '02 7619 7296'
	}
};
