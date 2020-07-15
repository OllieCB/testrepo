export default {
	bottomMargin: true,
	topMargin: false,
	title: {
		title: 'Title lorem ipsum',
		sticky: false,
	},
	loadMoreLabel: 'Load more content',
	loadMoreEndpoint: '/events/more?page=1',
	matchCount: 21,
	matchLabel: "21 matches found",
	spinner: {
		placeholder: require('images/transparent1px.png'),
		url: require('images/spinner.svg'),
		msg: "Loading"
	},
	form: {
		endpoint: '/events?page=0',
		method: 'post',
		keyword: {
			label: 'Key word',
			placeholder: 'eg. Lorem ipsum...'
		},
		location: {
			label: 'Location',
			placeholder: 'eg. London'
		},
		filter: {
			label: 'Filter',
			filters: [
				{
					label: 'Running',
					value: 'running'
				},
				{
					label: 'Cycling',
					value: 'cycling'
				},
				{
					label: 'Treks and hikes',
					value: 'treks'
				},
				{
					label: 'Skydiving',
					value: 'skydiving'
				},
				{
					label: 'Special events',
					value: 'special'
				}
			]
		},
		date: {
			label: 'Date',
			placeholder: 'eg. 05/2018'
		},
		submit: {
			label: 'Search',
			placeholder: require('images/transparent1px.png'),
			icon: require('images/search-white.svg')
		}
	},
	hotCards: [
		{
			promoted: true,
			img: {
				url: require('media/stories3.jpg'),
				smallUrl: require('media/stories3.jpg'),
				mediumUrl: require('media/stories3.jpg'),
				placeholder: require('images/transparent1px.png'),
				alt: 'Some other alt text',
			},
			corners: undefined, // [] | null
			type: 'event', // String "story | inside | news | campaign | page | event"
			items: [
				{
					label: 'Sunday 20 May',
					icon: require('images/calendar.svg'),
					placeholder: require('images/transparent1px.png'),
				},
				{
					label: 'London',
					icon: require('images/location.svg'),
					placeholder: require('images/transparent1px.png'),
				}
			],
			label: 'Running',
			title: 'Hackney half marathon',
			content: 'Run through the vibrant streets of east London',
			action: {
				label: 'Run the marathon',
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
			corners: undefined, // [] | null
			type: 'event',
			items: [
				{
					label: 'Sat 8 Sept - Sun 16 Sept 2018',
					icon: require('images/calendar.svg'),
					placeholder: require('images/transparent1px.png'),
				},
				{
					label: 'France',
					icon: require('images/location.svg'),
					placeholder: require('images/transparent1px.png'),
				}
			],
			label: 'Cycling',
			title: 'Create a title here one line',
			content: 'Cycle the length of the Pyrenees from the Atlantic to the Mediteranean',
			action: {
				label: 'Subscribe',
				url: 'google.com',
			},
		},
	],
	topCards: [
		[
			{
				img: {
					url: require('media/stories5.jpg'),
					smallUrl: require('media/stories5.jpg'),
					mediumUrl: require('media/stories5.jpg'),
					placeholder: require('images/transparent1px.png'),
					alt: 'Some other alt text',
				},
				corners: undefined, // [] | null
				type: 'event',
				items: [
					{
						label: 'TBC',
						icon: require('images/calendar.svg'),
						placeholder: require('images/transparent1px.png'),
					},
					{
						label: 'Peru',
						icon: require('images/location.svg'),
						placeholder: require('images/transparent1px.png'),
					}
				],
				label: 'Treks and hikes',
				title: 'The Machu Picchu trek for Scope',
				content: 'Take park in an experience of a lifetime, the Machu Picchu Trek',
				action: {
					label: 'Subscribe',
					url: 'google.com',
				},
			},
			{
				img: {
					url: require('media/stories6.jpg'),
					smallUrl: require('media/stories6.jpg'),
					mediumUrl: require('media/stories6.jpg'),
					placeholder: require('images/transparent1px.png'),
					alt: 'Some other alt text',
				},
				corners: undefined, // [] | null
				type: 'event',
				items: [
					{
						label: 'All year round',
						icon: require('images/calendar.svg'),
						placeholder: require('images/transparent1px.png'),
					},
					{
						label: 'Various',
						icon: require('images/location.svg'),
						placeholder: require('images/transparent1px.png'),
					}
				],
				label: 'Skydiving',
				title: 'Skydive for Scope for free',
				content: 'Why not tick a skydive off your bucket list? This is truly an experience you will never forget!',
				action: {
					label: 'Subscribe',
					url: 'google.com',
				},
			},
			{
				img: {
					url: require('media/stories7.jpg'),
					smallUrl: require('media/stories7.jpg'),
					mediumUrl: require('media/stories7.jpg'),
					placeholder: require('images/transparent1px.png'),
					alt: 'Some other alt text',
				},
				corners: undefined, // [] | null
				type: 'event',
				items: [
					{
						label: 'Thursday 15 Nov 2018',
						icon: require('images/calendar.svg'),
						placeholder: require('images/transparent1px.png'),
					},
					{
						label: 'The National History Museum',
						icon: require('images/location.svg'),
						placeholder: require('images/transparent1px.png'),
					}
				],
				label: 'Special events',
				title: '10 year of inspirations dinner',
				content: 'Take park in an experience of a lifetime, the Machu Picchu Trek',
				action: {
					label: 'Read more',
					url: 'google.com',
				},
			}
		],
		[
			{
				img: {
					url: require('media/stories8.jpg'),
					smallUrl: require('media/stories8.jpg'),
					mediumUrl: require('media/stories8.jpg'),
					placeholder: require('images/transparent1px.png'),
					alt: 'Some other alt text',
				},
				corners: undefined, // [] | null
				type: 'event',
				items: [
					{
						label: 'Specific event',
						icon: require('images/calendar.svg'),
						placeholder: require('images/transparent1px.png'),
					},
					{
						label: 'Any',
						icon: require('images/location.svg'),
						placeholder: require('images/transparent1px.png'),
					}
				],
				label: 'Triathlons',
				title: 'Ironman any distance',
				content: 'Cycle the length of the Pyrenees from the Atlantic to the Mediteranean',
				action: {
					label: 'Read more',
					url: 'google.com',
				},
			},
			{
				img: {
					url: require('media/stories6.jpg'),
					smallUrl: require('media/stories6.jpg'),
					mediumUrl: require('media/stories6.jpg'),
					placeholder: require('images/transparent1px.png'),
					alt: 'Some other alt text',
				},
				corners: undefined, // [] | null
				type: 'event',
				items: [
					{
						label: 'All year round',
						icon: require('images/calendar.svg'),
						placeholder: require('images/transparent1px.png'),
					},
					{
						label: 'Various',
						icon: require('images/location.svg'),
						placeholder: require('images/transparent1px.png'),
					}
				],
				label: 'Skydiving',
				title: 'Skydive for Scope for free',
				content: 'Why not tick a skydive off your bucket list? This is truly an experience you will never forget!',
				action: {
					label: 'Subscribe',
					url: 'google.com',
				},
			},
			{
				img: {
					url: require('media/stories7.jpg'),
					smallUrl: require('media/stories7.jpg'),
					mediumUrl: require('media/stories7.jpg'),
					placeholder: require('images/transparent1px.png'),
					alt: 'Some other alt text',
				},
				corners: undefined, // [] | null
				type: 'event',
				items: [
					{
						label: 'Thursday 15 Nov 2018',
						icon: require('images/calendar.svg'),
						placeholder: require('images/transparent1px.png'),
					},
					{
						label: 'The National History Museum',
						icon: require('images/location.svg'),
						placeholder: require('images/transparent1px.png'),
					}
				],
				label: 'Special events',
				title: '10 year of inspirations dinner',
				content: 'Take park in an experience of a lifetime, the Machu Picchu Trek',
				action: {
					label: 'Read more',
					url: 'google.com',
				},
			}
		],
	]
};
