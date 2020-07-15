export default {
	matchCount: 21,
	bottomMargin: true,
	topMargin: false,
	title: 'Top stories',
	loadMoreLabel: 'Load more content',
	baseUrl: '/stories?id=123',
	filter: {
		downarrow: require('images/arrow-white.svg'),
		filters: [
			{
				endpoint: '/all',
				label: 'View all',
				type: 'all'
			},
			{
				endpoint: '/stories',
				label: 'Real life stories',
				type: 'stories'
			},
			{
				endpoint: '/campaigns',
				label: 'Campaigns',
				type: 'campaigns'
			},
			{
				endpoint: '/news',
				label: 'News and politics',
				type: 'news'
			}
		],
	},
	spinner: {
		placeholder: require('images/transparent1px.png'),
		url: require('images/spinner.svg'),
		msg: "Loading"
	},
	hotCards: [ // max of 2
		{
			img: {
				placeholder: require('images/transparent1px.png'),
				smallUrl: require('media/stories1.jpg'),
				mediumUrl: require('media/stories1.jpg'),
				url: require('media/stories1.jpg'),
				alt: 'Some alt text',
			},
			corners: undefined, // [] | null
			type: 'campaign', // String "story |  | news | campaign | page"
			label: 'Campaigns',
			title: 'Attitudes towards disability',
			promoted: true,
			content: 'A lack of understanding and prejudice towards disabled people are still too common in our society. The more it happens, the more impact it has.',
			action: {
				label: 'Join our campaign',
				url: 'google.com',
			},
		},
		{
			img: {
				placeholder: require('images/transparent1px.png'),
				smallUrl: require('media/stories2.jpg'),
				mediumUrl: require('media/stories2.jpg'),
				url: require('media/stories2.jpg'),
				alt: 'Some alt text',
			},
			corners: undefined, // [] | null
			type: 'story', // String "story |  | news | campaign | page"
			label: 'Real life stories',
			title: 'Why I encourage talking about mental health at work',
			content: 'Not only can stressful work environments impact on your mental health, if you don’t feel supported, it makes things even harder.',
			action: {
				label: 'Read more',
				url: 'google.com',
			},
		},
	],
	topCards: [ // max of 6
		[
			{
				img: {
					placeholder: require('images/transparent1px.png'),
					smallUrl: require('media/stories3.jpg'),
					mediumUrl: require('media/stories3.jpg'),
					url: require('media/stories3.jpg'),
					alt: 'Some other alt text',
				},
				corners: undefined, // [] | null
				type: 'story', // String "story |  | news | campaign | page"
				label: 'Real life stories',
				title: 'Our new stories and campaigns hubs',
				content: 'Do you love a good story? Enjoy our brand new hub.',
				action: {
					label: 'Read more',
					url: 'google.com',
				},
			},
			{
				img: {
					placeholder: require('images/transparent1px.png'),
					smallUrl: require('media/stories4.jpg'),
					mediumUrl: require('media/stories4.jpg'),
					url: require('media/stories4.jpg'),
					alt: 'Some other alt text',
				},
				corners: undefined, // [] | null
				type: 'news', // String "story | news | campaign | page"
				label: 'News and politics',
				title: 'Christmas title',
				content: 'Some text here, I’d say no more than three lines, we have a whole page on tap.',
				action: {
					label: 'Read more',
					url: 'google.com',
				},
			},
			{
				img: {
					placeholder: require('images/transparent1px.png'),
					smallUrl: require('media/stories5.jpg'),
					mediumUrl: require('media/stories5.jpg'),
					url: require('media/stories5.jpg'),
					alt: 'Some other alt text',
				},
				corners: undefined, // [] | null
				type: 'story', // String "story | news | campaign | page"
				label: 'Real life stories',
				title: 'Why do you support Scope?',
				content: 'We met Anthony, who ran the London Marathon for Scope.',
				action: {
					label: 'Read more',
					url: 'google.com',
				},
			}
		],
		[
			{
				img: {
					placeholder: require('images/transparent1px.png'),
					smallUrl: require('media/stories6.jpg'),
					mediumUrl: require('media/stories6.jpg'),
					url: require('media/stories6.jpg'),
					alt: 'Some other alt text',
				},
				corners: undefined, // [] | null
				type: 'story', // String "story | news | campaign | page"
				label: 'Real life stories',
				title: 'Young disabled',
				content: 'You support young disabled people to live the life they choose.',
				action: {
					label: 'Read more',
					url: 'google.com',
				},
			},
			{
				img: {
					placeholder: require('images/transparent1px.png'),
					smallUrl: require('media/stories7.jpg'),
					mediumUrl: require('media/stories7.jpg'),
					url: require('media/stories7.jpg'),
					alt: 'Some other alt text',
				},
				corners: undefined, // [] | null
				type: 'campaign', // String "story | news | campaign | page"
				label: 'Campaigns',
				title: 'Things that people say never go away',
				content: 'We met Anthony, who ran the London Marathon for Scope.',
				action: {
					label: 'Read more',
					url: 'google.com',
				},
			},
			{
				img: {
					placeholder: require('images/transparent1px.png'),
					smallUrl: require('media/stories8.jpg'),
					mediumUrl: require('media/stories8.jpg'),
					url: require('media/stories8.jpg'),
					alt: 'Some other alt text',
				},
				corners: undefined, // [] | null
				type: 'news', // String "story | news | campaign | page"
				label: 'News and politics',
				title: 'Title one line',
				content: 'Some text here, I’d say no more than three lines, we have a whole page on tap.',
				action: {
					label: 'Read more',
					url: 'google.com',
				},
			}
		],
	]
};
