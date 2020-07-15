export default {
	bottomMargin: true,
	topMargin: false,
	endpoint: '/thankyou',
	contacts: {
		title: 'Keeping in touch',
		text: '<p>We\'d love to keep you updated on how you\'re helping make a difference for disabled people, as well as other ways you can access or give support.<br/>Please let us know how you\'d like to stay updated.',
		options: [
			{
				name: 'newsPost',
				value: 'post',
				label: 'Post'
			},
			{
				name: 'newsPhone',
				value: 'phone',
				label: 'Phone'
			},
			{
				name: 'newsEmail',
				value: 'email',
				label: 'Email'
			},
			{
				name: 'newsText',
				value: 'text',
				label: 'Text'
			},
		],
		small: '<p>You\'re in control. You can change your preferences at any time by emailing <a href="mailto:someemail@gmail.com">supportercare@scope.org.uk</a> or calling us on 020 7610 7296. You can also read about how we protect and use your personal information in our <a href="privacy.html">privacy policy</a></p>'
	},
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
		}
	},
	needHelp: {
		type: 'tel',
		value: '0276197296',
		label: 'Need help?',
		content: '02 7619 7296'
	}
};
