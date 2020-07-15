export default {
	greeting: {
		main: 'Thank you!',
		sub: 'you\'re amazing'
	},
	text: '<p>You have just helped contribute to our online community, where families can get advice at any time.<p>',
	notice: 'We have just sent you the confirmation email at:',
	contact: {
		title: 'Contact',
		text: 'If you have any questions about your donation please call our supporter care team.',
		phone: {
			label: 'Phone',
			value: '02 7619 7296',
			icon: {
				placeholder: require('images/transparent1px.png'),
				url: require('images/phone-dark.svg'),
				alt: 'Phone',
			}
		}
	},
	share: {
		title: 'Share',
		text: 'Sharing module. User needs to understand what it\'s sharging, let\'s keep it short and snappy.',
		items: {
			shareLabel: 'Share:',
			shares: [
				{
					placeholder: require('images/transparent1px.png'),
					url: require('images/tw-dark.svg'),
					alt: 'twitter share',
				},
				{
					placeholder: require('images/transparent1px.png'),
					url: require('images/fb-dark.svg'),
					alt: 'facebook share',
				}
			]
		}
	},
	backHome: {
		label: 'Back to homepage'
	}
};
