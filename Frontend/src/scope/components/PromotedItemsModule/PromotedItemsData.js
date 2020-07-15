export default {
	title: 'Our latest campaigns',
	whiteTitle: true,
	bottomMargin: true,
	items: [
		{
			img: {
				placeholder: require('images/transparent1px.png'),
				smallUrl: require('media/related1-small.jpg'),
				mediumUrl: require('media/related1-medium.jpg'),
				url: require('media/related1.jpg'),
				alt: 'Some alt text',
			},
			type: 'campaign', // String "story | inside | news | campaign"
			label: 'Campaigns',
			title: 'Attitude towards disability',
		},
		{
			img: {
				placeholder: require('images/transparent1px.png'),
				smallUrl: require('media/related3-small.jpg'),
				mediumUrl: require('media/related3-medium.jpg'),
				url: require('media/related3.jpg'),
				alt: 'Some alt text',
			},
			type: 'campaign', // String "story | inside | news | campaign"
			label: 'Campaigns',
			title: 'Things that people say will never go away',
		}
	]
};
