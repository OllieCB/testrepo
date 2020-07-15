export default {
	navbar: {
		logo: {
			placeholder: require('images/transparent1px.png'),
			url: require('images/logo-mobile.svg'),
			alt: 'Scope homepage',
		},
		handle: {
			copy: 'Menu',
			placeholder: require('images/transparent1px.png'),
			icon: require('images/nav-handle.svg'),
		},
	},
	mainNavigation: {
		links: [
			{
				label: 'Home',
				url: '/',
				placeholder: require('images/transparent1px.png'),
				prefixIcon: require('images/home.svg'),
				postfixIcon: '',
				shortcut: 'h',
				children: [],
			},
			{
				label: 'About us',
				url: 'https://www.google.com',
				prefixIcon: '',
				placeholder: require('images/transparent1px.png'),
				postfixIcon: require('images/arrow.svg'),
				shortcut: '?',
				children: [
					{
						url: 'https://google.com',
						label: 'What we do',
					},
					{
						url: 'https://google.com',
						label: 'Policy and research',
					},
					{
						url: 'https://google.com',
						label: 'Press and media',
					},
					{
						url: 'https://google.com',
						label: 'View about us',
					},
				],
			},
			{
				label: 'News and stories',
				url: '/campaigns_stories.html',
				prefixIcon: '',
				postfixIcon: require('images/arrow-link.svg'),
				placeholder: require('images/transparent1px.png'),
				shortcut: 'c',
				children: [],
				current: true,
			},
			{
				label: 'Get involved',
				url: 'https://www.google.com',
				prefixIcon: '',
				postfixIcon: require('images/arrow.svg'),
				placeholder: require('images/transparent1px.png'),
				shortcut: 'i',
				children: [
					{
						url: '/donation_journey.html',
						label: 'Donate',
					},
					{
						url: '/opportunityFinder.html',
						label: 'Volunteering',
					},
					{
						url: '/event_listing.html',
						label: 'Events and challenges',
					},
					{
						url: 'https://google.com',
						label: 'Campaign with us',
					},
					{
						url: 'https://google.com',
						label: 'Do your own fundraising',
					},
				],
			},
			{
				label: 'Community and forum',
				url: 'https://www.google.com',
				prefixIcon: '',
				postfixIcon: require('images/arrow-link.svg'),
				placeholder: require('images/transparent1px.png'),
				shortcut: 'f',
				children: [],
			},
			{
				label: 'Accessibility',
				url: 'https://www.google.com',
				prefixIcon: '',
				postfixIcon: require('images/arrow-link.svg'),
				placeholder: require('images/transparent1px.png'),
				shortcut: 'a',
				children: [],
				mobileOnly: true
			},
			{
				label: 'Get in touch',
				url: 'https://www.google.com',
				prefixIcon: '',
				postfixIcon: require('images/arrow-link.svg'),
				placeholder: require('images/transparent1px.png'),
				shortcut: 't',
				children: [],
				mobileOnly: true
			}
		],
	},
	topbar: {
		links: [
			{
				url: '#',
				label: 'Accessibility',
			},
			{
				url: '#',
				label: 'Get in touch',
			},
		],
		isLoggedIn: true,
		user: {
			url: '#',
			name: 'Teresa',
		},
		login: {
			url: '#',
			label: 'Login',
		},
		userIcon: require('images/user.svg'),
		userIconDark: require('images/user-dark.svg'),
		closeIcon: require('images/close.svg'),
		searchIcon: require('images/search.svg'),
		placeholder: require('images/transparent1px.png'),
	},
	brandBanner: {
		logo: {
			placeholder: require('images/transparent1px.png'),
			url: require('images/logo.svg'),
			alt: 'Scope homepage',
		},
		'f-link': {
			url: '/content_core.html',
			label: 'Advice and support',
		},
		's-link': {
			url: '/donation_journey.html',
			label: 'DONATE',
		},
	},
	loginButton: {
		url: '#',
		label: 'Logout',
		icon: require('images/logout.svg'),
		placeholder: require('images/transparent1px.png'),
	},
};
