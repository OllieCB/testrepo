export default {
	bottomMargin: true,
	topMargin: false,
	title: 'Related stories',
	stories: [
		{
			internal: {
				url: require('images/ribbon-star.svg'),
				placeholder: require('images/transparent1px.png'),
				alt: 'Internal content'
			},
			type: 'story', // String "story | inside | news | campaign"
			label: 'Real life stories',
			title: 'Why you support Scope',
			content: 'We met Anthony, who ran the London Marathon for Scope.',
			action: {
				label: 'Tony\'s story',
				url: 'google.com',
			},
		},
		{
			type: 'inside', // String "stories | inside | news | campaign"
			label: 'Inside Scope',
			title: 'The things said that never go away',
			content: 'Our new report, The Disability Perception Gap.',
			action: {
				label: 'Read more',
				url: 'google.com',
			},
		},
	]
};
