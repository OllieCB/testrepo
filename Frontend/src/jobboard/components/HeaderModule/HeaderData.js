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
		isLoggedIn: false,
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
	}
};
