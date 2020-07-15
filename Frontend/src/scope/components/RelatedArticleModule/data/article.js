export default {
	bottomMargin: true,
	topMargin: false,
	title: 'Related stories',
	stories: [
		{
			img: {
				placeholder: require('images/transparent1px.png'),
				smallUrl: require('media/related1-small.jpg'),
				mediumUrl: require('media/related1-medium.jpg'),
				url: require('media/related1.jpg'),
				alt: 'Some alt text',
			},
			type: 'story', // String "story | inside | news | campaign"
			label: 'Real life stories',
			title: 'Young disabled',
			content: 'You support young disabled people to live the life they choose.',
			action: {
				label: 'Jamies\'s story',
				url: 'google.com',
			},
		},
		{
			img: {
				smallUrl: require('media/related3-small.jpg'),
				mediumUrl: require('media/related3-medium.jpg'),
				url: require('media/related3.jpg'),
				alt: 'Some alt text',
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
			img: {
				smallUrl: require('media/related2-small.jpg'),
				mediumUrl: require('media/related2-medium.jpg'),
				url: require('media/related2.jpg'),
				alt: 'Some other alt text',
			},
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
