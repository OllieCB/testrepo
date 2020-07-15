export default {
	matchCount: 21,
	bottomMargin: true,
	topMargin: false,
	title: {
		title: 'Jobs at Scope',
		sticky: false,
		cta: {
			url: 'google.com',
			label: 'Apply',
		},
	},
	location: {
		name: 'location',
		label: 'Location',
		placeholder: 'Eg. London',
		type: 'text',
		current: {
			label: 'Use current location',
			icon: require('images/target.svg'),
			placeholder: require('images/transparent1px.png'),
		},
	},
	type: {
		name: 'department',
		label: 'Department',
		options: [
			{
				label: 'Show all',
				value: 'all'
			},
			{
				label: 'Department 1',
				value: 'one'
			},
			{
				label: 'Department 2',
				value: 'two'
			},
			{
				label: 'Department 3',
				value: 'three'
			},
			{
				label: 'Department 4',
				value: 'four'
			},
		]
	},
	submit: {
		label: 'Search',
		endpoint: '/jobs?page=0'
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
					"type":"opportunity",
					"title":"Events coordinator",
					"subtitle":"London",
					"items":[
						{
							"label":"Here East, London",
							"icon":"/imgs/location.svg"
						},
						{
							"label":"£30,000 - £32,000 a year",
							"icon":"/imgs/dark-placeholder.svg"
						},
						{
							"label":"20 hours per week (Monday-Friday)",
							"icon":"/imgs/calendar.svg"
						},
						{
							"label":"6 month contract",
							"icon":"/imgs/dark-placeholder.svg"
						}
					],
					"action":{
						"label":"",
						"url":"/jobs/jobs-at-scope/events-coordinator-london"
					}
				},
				{
					"type":"opportunity",
					"title":"Retail area manager",
					"subtitle":"Bournemouth",
					"items":[
						{
							"label":"Bournemouth",
							"icon":"/imgs/location.svg"
						},
						{
							"label":"£30,000 - £32,000 a year",
							"icon":"/imgs/dark-placeholder.svg"
						},
						{
							"label":"20 hours per week (Monday-Friday)",
							"icon":"/imgs/calendar.svg"
						},
						{
							"label":"6 month contract",
							"icon":"/imgs/dark-placeholder.svg"
						}
					],
					"action":{
						"label":"",
						"url":"/jobs/jobs-at-scope/retail-area-manager-bournemouth"
					}
				}
			],
			[
				{
					"type":"opportunity",
					"title":"Retail area manager",
					"subtitle":"Edinburgh",
					"items":[
						{
							"label":"Edinburgh",
							"icon":"/imgs/location.svg"
						},
						{
							"label":"£30,000 - £32,000 a year",
							"icon":"/imgs/dark-placeholder.svg"
						},
						{
							"label":"20 hours per week (Monday-Friday)",
							"icon":"/imgs/calendar.svg"
						},
						{
							"label":"6 month contract",
							"icon":"/imgs/dark-placeholder.svg"
						}
					],
					"action":{
						"label":"",
						"url":"/jobs/jobs-at-scope/retail-area-manager-edinburgh"
					}
				},
				{
					"type":"opportunity",
					"title":"Retail area manager",
					"subtitle":"Leicester",
					"items":[
						{
							"label":"Leicestershire/Derbyshire/Nottingham areas",
							"icon":"/imgs/location.svg"
						},
						{
							"label":"£30,000 - £32,000 a year",
							"icon":"/imgs/dark-placeholder.svg"
						},
						{
							"label":"20 hours per week (Monday-Friday)",
							"icon":"/imgs/calendar.svg"
						},
						{
							"label":"6 month contract",
							"icon":"/imgs/dark-placeholder.svg"
						}
					],
					"action":{
						"label":"",
						"url":"/jobs/jobs-at-scope/retail-area-manager-leicester"
					}
				}
			],
			[
				{
					"type":"opportunity",
					"title":"Retail area manager",
					"subtitle":"Liverpool",
					"items":[
						{
							"label":"Liverpool",
							"icon":"/imgs/location.svg"
						},
						{
							"label":"£30,000 - £32,000 a year",
							"icon":"/imgs/dark-placeholder.svg"
						},
						{
							"label":"20 hours per week (Monday-Friday)",
							"icon":"/imgs/calendar.svg"
						},
						{
							"label":"6 month contract",
							"icon":"/imgs/dark-placeholder.svg"
						}
					],
					"action":{
						"label":"",
						"url":"/jobs/jobs-at-scope/retail-area-manager-liverpool"
					}
				},
				{
					"type":"opportunity",
					"title":"Retail area manager",
					"subtitle":"Norwich",
					"items":[
						{
							"label":"Norwich",
							"icon":"/imgs/location.svg"
						},
						{
							"label":"£30,000 - £32,000 a year",
							"icon":"/imgs/dark-placeholder.svg"
						},
						{
							"label":"20 hours per week (Monday-Friday)",
							"icon":"/imgs/calendar.svg"
						},
						{
							"label":"6 month contract",
							"icon":"/imgs/dark-placeholder.svg"
						}
					],
					"action":{
						"label":"",
						"url":"/jobs/jobs-at-scope/retail-area-manager-norwich"
					}
				}
			]
		]
	}
};
