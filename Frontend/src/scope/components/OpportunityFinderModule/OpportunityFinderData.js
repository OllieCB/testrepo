export default {
	matchCount: 21,
	bottomMargin: true,
	topMargin: false,
	title: {
		title: 'Find opportunities',
		sticky: false,
	},
	textSearch: [
		{
			name: 'keyword',
			label: 'Key word',
			placeholder: 'Eg. intern, shop assistant...',
			id: 'ofId1'
		},
		{
			name: 'location',
			label: 'Location',
			placeholder: 'Eg. London, Yorkshire...',
			id: 'ofId2'
		}
	],
	selectSearch: [
		{
			label: 'Time available',
			name: 'when',
			options: [
				{
					label: 'Weekday',
					value: 'weekday'
				},
				{
					label: 'Evening',
					value: 'evening'
				},
				{
					label: 'Weekend',
					value: 'weekend'
				},
			],
			id: 'ofId3'
		},
		{
			label: 'Distance',
			name: 'distance',
			options: [
				{
					label: 'Exact location',
					value: 'exact'
				},
				{
					label: 'Within 5 miles',
					value: '5'
				},
				{
					label: 'Within 10 miles',
					value: '10'
				},
				{
					label: 'Within 15 miles',
					value: '15'
				},
				{
					label: 'Within 20 miles',
					value: '20'
				},
				{
					label: 'Within 30 miles',
					value: '30'
				},
			],
			id: 'ofId4'
		}
	],
	fromHome: {
		label: 'Include work from home',
		name: 'fromHome'
	},
	checkboxFields: [
		{
			title: 'Your availabilities',
			options: [
				{
					name: 'any',
					label: 'Any time'
				},
				{
					name: 'weekdays',
					label: 'Week days'
				},
				{
					name: 'weekends',
					label: 'Weekends'
				},
				{
					name: 'evenings',
					label: 'Evenings'
				}
			]
		},
		{
			title: 'Ways to volunteer',
			options: [
				{
					name: 'all',
					label: 'Select all'
				},
				{
					name: 'charity',
					label: 'Charity shop'
				},
				{
					name: 'office',
					label: 'Office admin'
				},
				{
					name: 'fundraising',
					label: 'Fundraising'
				},
				{
					name: 'speaking',
					label: 'Public speaking'
				},
				{
					name: 'share',
					label: 'Share my story'
				},
				{
					name: 'campaigning',
					label: 'Campaigning'
				}
			]
		},
		{
			title: 'Your skills',
			options: [
				{
					name: 'allSkills',
					label: 'Select all'
				},
				{
					name: 'admin',
					label: 'Admin'
				},
				{
					name: 'customerService',
					label: 'Customer service'
				},
				{
					name: 'publicSpeaking',
					label: 'Public speaking'
				},
				{
					name: 'logistic',
					label: 'Event logistic'
				},
				{
					name: 'teamwork',
					label: 'Team work'
				}
			]
		},
	],
	submit: {
		label: 'Find opportunities',
		endpoint: '/opportunities?page=0'
	},
	toggleOptions: {
		more: 'Advanced search options',
		less: 'Less options'
	},
	backButton: {
		label: 'Back',
		url: require('images/arrow.svg'),
		placeholder: require('images/transparent1px.png'),
	},
	data: {
		hasMatches: true,
		matchCount: 21,
		pageIndex: 0,
		matchLabel: "21 matches found",
		spinner: {
			placeholder: require('images/transparent1px.png'),
			url: require('images/spinner.svg'),
			msg: "Loading"
		},
		results: [
			[
				{
					type: "opportunity",
					title: "Attitudes towards disability",
					subtitle: "Part time",
					content: "A lack of understanding and prejudice towards disabled people are still too common in our society. The more it happens, the more impact it has.",
					action: {
						label: "Join our campaign",
						url: "google.com"
					},
					items: [
						{
							label: "London",
							srtLabel: "London",
							icon: "imgs/location.svg"
						},
						{
							label: "Distance approx 39.15 miles",
							srtLabel: "Distance approximately 39.15 miles",
							icon: "imgs/distance.svg"
						}
					]
				},
				{
					type: "opportunity",
					title: "Why I encourage talking about mental health at work",
					subtitle: "Part time",
					content: "Not only can stressful work environments impact on your mental health, if you don’t feel supported, it makes things even harder.",
					action: {
						label: "Read more",
						url: "google.com"
					},
					items: [
						{
							label: "London",
							srtLabel: "London",
							icon: "imgs/location.svg"
						},
						{
							label: "Distance approx 39.15 miles",
							srtLabel: "Distance approximately 39.15 miles",
							icon: "imgs/distance.svg"
						}
					]
				}
			],
			[
				{
					type: "opportunity",
					title: "Attitudes towards disability",
					subtitle: "Part time",
					content: "A lack of understanding and prejudice towards disabled people are still too common in our society. The more it happens, the more impact it has.",
					action: {
						label: "Join our campaign",
						url: "google.com"
					},
					items: [
						{
							label: "London",
							srtLabel: "London",
							icon: "imgs/location.svg"
						},
						{
							label: "Distance approx 39.15 miles",
							srtLabel: "Distance approximately 39.15 miles",
							icon: "imgs/distance.svg"
						}
					]

				},
				{
					type: "opportunity",
					title: "Why I encourage talking about mental health at work",
					subtitle: "Part time",
					content: "Not only can stressful work environments impact on your mental health, if you don’t feel supported, it makes things even harder.",
					action: {
						label: "Read more",
						url: "google.com"
					},
					items: [
						{
							label: "London",
							srtLabel: "London",
							icon: "imgs/location.svg"
						},
						{
							label: "Distance approx 39.15 miles",
							srtLabel: "Distance approximately 39.15 miles",
							icon: "imgs/distance.svg"
						}
					]
				}
			],
			[
				{
					type: "opportunity",
					title: "Attitudes towards disability",
					subtitle: "Part time",
					content: "A lack of understanding and prejudice towards disabled people are still too common in our society. The more it happens, the more impact it has.",
					action: {
						label: "Join our campaign",
						url: "google.com"
					},
					items: [
						{
							label: "London",
							srtLabel: "London",
							icon: "imgs/location.svg"
						},
						{
							label: "Distance approx 39.15 miles",
							srtLabel: "Distance approximately 39.15 miles",
							icon: "imgs/distance.svg"
						}
					]
				},
				{
					type: "opportunity",
					title: "Why I encourage talking about mental health at work",
					subtitle: "Part time",
					content: "Not only can stressful work environments impact on your mental health, if you don’t feel supported, it makes things even harder.",
					action: {
						label: "Read more",
						url: "google.com"
					},
					items: [
						{
							label: "London",
							srtLabel: "London",
							icon: "imgs/location.svg"
						},
						{
							label: "Distance approx 39.15 miles",
							srtLabel: "Distance approximately 39.15 miles",
							icon: "imgs/distance.svg"
						}
					]
				}
			]
		]
	}
};
