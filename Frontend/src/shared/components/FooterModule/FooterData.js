export default {
	logo: {
		placeholder: require('images/transparent1px.png'),
		url: require('images/logo-footer.svg'),
		alt: 'Scope footer',
	},
	contact: {
		title: 'Free disability helpline',
		sub: 'Open 9am to 5pm weekdays',
		contacts: [
			{
				type: 'tel',
				label: 'Phone line',
				value: '0808 800 3333',
				srtValue: '0 8 0 8 8 0 0 3 3 3 3',
				icon: {
					placeholder: require('images/transparent1px.png'),
					url: require('images/phone.svg'),
				},
			},
			{
				type: 'mailto',
				label: 'Email',
				value: 'helpline@scope.org.uk',
				icon: {
					placeholder: require('images/transparent1px.png'),
					url: require('images/mail.svg'),
				},
			},
		],
	},
	links: {
		title: 'Scope',
		links: [
			{
				url: '#',
				label: 'Shops',
			},
			{
				url: '#',
				label: 'Careers',
			},
			{
				url: '#',
				label: 'Privacy',
			},
			{
				url: '#',
				label: 'Partners',
			},
			{
				url: '#',
				label: 'Press & Media',
			},
			{
				url: '#',
				label: 'Terms & Conditions',
			},
		],
	},
	subscription: {
		title: 'Newsletter',
		submit: {
			url: '#',
			label: 'Sign up',
		},
		text: 'Sign up for out weekly Newsletter',
		label: 'Enter your email',
	},
	socials: [
		{
			url: '#',
			label: 'Scope\'s twitter page',
			icon: require('images/tw.svg'),
			placeholder: require('images/transparent1px.png'),
		},
		{
			url: '#',
			label: 'Scope\'s facebook page',
			icon: require('images/fb.svg'),
			placeholder: require('images/transparent1px.png'),
		},
		{
			url: '#',
			label: 'Scope\'s youtube channel',
			icon: require('images/yt.svg'),
			placeholder: require('images/transparent1px.png'),
		},
	],
	registeredCharity: 'Scope is a registered charity (no. 208231)'
};
