export default {
	bottomMargin: true,
	topMargin: false,
	title: 'Title something nice',
	previews: [
		[
			{
				img: {
					url: require('media/stories3.jpg'),
					smallUrl: require('media/stories3.jpg'),
					mediumUrl: require('media/stories3.jpg'),
					placeholder: require('images/transparent1px.png'),
					alt: 'Some other alt text',
				},
				corners: [
					'corner-decoration top-right vertical purple',
					'corner-decoration bottom-left horizontal yellow',
				], // [] | null
				type: 'page', // String "story | inside | news | campaign | page"
				title: 'Our new stories and campaigns hubs',
				content: 'Do you love a good story? Enjoy our brand new hub.',
				action: {
					label: 'Read more',
					url: 'google.com',
				},
			},
			{
				img: {
					url: require('media/stories4.jpg'),
					smallUrl: require('media/stories4.jpg'),
					mediumUrl: require('media/stories4.jpg'),
					placeholder: require('images/transparent1px.png'),
					alt: 'Some other alt text',
				},
				corners: [
					'corner-decoration top-left vertical turquoise',
					'corner-decoration bottom-right horizontal yellow',
				], // [] | null
				type: 'page', // String "story | inside | news | campaign | page"
				title: 'Christmas title',
				content: 'Some text here, I’d say no more than three lines, we have a whole page on tap.',
				action: {
					label: 'Read more',
					url: 'google.com',
				},
			},
			{
				img: {
					url: require('media/stories5.jpg'),
					smallUrl: require('media/stories5.jpg'),
					mediumUrl: require('media/stories5.jpg'),
					placeholder: require('images/transparent1px.png'),
					alt: 'Some other alt text',
				},
				corners: [
					'corner-decoration top-left horizontal yellow',
					'corner-decoration bottom-right vertical purple',
				], // [] | null
				type: 'page', // String "story | inside | news | campaign | page"
				title: 'Why do you support Scope?',
				content: 'We met Anthony, who ran the London Marathon for Scope.',
				action: {
					label: 'Read more',
					url: 'google.com',
				},
			}
		]
	]
};
