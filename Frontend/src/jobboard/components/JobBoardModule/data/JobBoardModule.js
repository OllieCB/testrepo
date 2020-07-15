export default {
	matchCount: 21,
	bottomMargin: true,
	form: {
		location: {
			name: 'location',
			label: 'Location',
			placeholder: 'E.g. London',
			type: 'text',
			current: {
				label: 'Use current location',
				icon: require('images/target.svg'),
				placeholder: require('images/transparent1px.png'),
			},
		},
		keyword: {
			label: 'Keyword',
			placeholder: 'E.g. Health',
			name: 'keyword'
		},
		submit: {
			label: 'Search',
			endpoint: '/jobboard/jobs?page=0'
		}
	},
	filters: {
		company: {
			label: 'Company',
			options: [
						{
							option: 'All',
							value: ''
						},
						{
							option: 'Company 1',
							value: '1',
						},
						{
							option: 'Company 2',
							value: '2'
						},
						{
							option: 'Company 3',
							value: '3'
						}
					],
		},
		contract: {
			label: 'Contract',
			options: [
						{
							option: 'All',
							value: ''
						},
						{
							option: 'Part-time',
							value: '1',
						},
						{
							option: 'Full-time',
							value: '2'
						},
						{
							option: 'Self employed',
							value: '3'
						}
					],
		},
		salary: {
			label: 'Salary (per year)',
			placeholderFrom: '£4000',
			placeholderTo: '£20000',
		},
		recommended: {
			label: 'Scope Recommended',
			status: true,
		}
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
					"title":"Assistant shop manager",
					"company":"Harwich Haven Authority",
					"location": "Harwich",
					"recommended": true,
					"logo": require('media/harwich.png'),
					placeholder: require('images/transparent1px.png'),
					"items":[
						{
							"label":"£15,075 per year",
							"icon":"/imgs/money.svg"
						},
						{
							"label":"Full time, temporary",
							"icon":"/imgs/document.svg"
						},
						{
							"label":"35 hours per week (Monday to Sunday)",
							"icon":"/imgs/clock-dark.svg"
						}
					],
					"closing": "Applications close on 25 May 2020.",
					"action":{
						"label":"Find out more",
						"url":"/jobs/jobs-at-scope/events-coordinator-london"
					},
					"description":{
						"primarytitle":"About the role",
						"primarybody":"<p>Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur.</p><p>Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>",
						"secondarytitle":"Requirements",
						"secondarybody":" <p>Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p><ul><li>Excepteur sint obcaecat cupiditat</li><li>non proident, sunt in</li><li>culpa qui officia deserunt mollit</li><li>anim id est laborum.</li></ul>"
					}
				},
				{
					"title":"Assistant shop manager",
					"company":"Harwich Haven Authority",
					"location": "Harwich",
					"recommended": true,
					"logo": require('media/virgin.svg'),
					"items":[
						{
							"label":"£15,075 per year",
							"icon":"/imgs/money.svg"
						},
						{
							"label":"Full time, temporary",
							"icon":"/imgs/document.svg"
						},
						{
							"label":"35 hours per week (Monday to Sunday)",
							"icon":"/imgs/clock-dark.svg"
						}
					],
					"closing": "Applications close on 25 May 2020.",
					"action":{
						"label":"Find out more",
						"url":"/jobs/jobs-at-scope/events-coordinator-london"
					},
					"description":{
						"primarytitle":"About the role",
						"primarybody":"<p>Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>",
						"secondarytitle":"Requirements",
						"secondarybody":"<p>Lorem ipsum dolor sit amet</p>"
					}
				},
				{
					"title":"Assistant shop manager",
					"company":"Harwich Haven Authority",
					"location": "Harwich",
					"recommended": true,
					"logo": require('media/harwich.png'),
					"items":[
						{
							"label":"£15,075 per year",
							"icon":"/imgs/money.svg"						},
						{
							"label":"Full time, temporary",
							"icon":"/imgs/document.svg"
						},
						{
							"label":"35 hours per week (Monday to Sunday)",
							"icon":"/imgs/clock-dark.svg"
						}
					],
					"closing": "Applications close on 25 May 2020.",
					"action":{
						"label":"Find out more",
						"url":"/jobs/jobs-at-scope/events-coordinator-london"
					},
					"description":{
						"primarytitle":"About the role",
						"primarybody":"<p>Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>",
						"secondarytitle":"Requirements",
						"secondarybody":"<p>Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>"
					}
				},
				{
					"title":"Assistant shop manager",
					"company":"Harwich Haven Authority",
					"location": "Harwich",
					"recommended": false,
					"logo": require('media/harwich.png'),
					"items":[
						{
							"label":"£15,075 per year",
							"icon":"/imgs/money.svg"
						},
						{
							"label":"Full time, temporary",
							"icon":"/imgs/document.svg"
						},
						{
							"label":"35 hours per week (Monday to Sunday)",
							"icon":"/imgs/clock-dark.svg"
						}
					],
					"closing": "Applications close on 25 May 2020.",
					"action":{
						"label":"Find out more",
						"url":"/jobs/jobs-at-scope/events-coordinator-london"
					},
					"description":{
						"primarytitle":"About the role",
						"primarybody":"<p>Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>",
						"secondarytitle":"Requirements",
						"secondarybody":"<p>Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>"
					}
				},
				{
					"title":"Assistant shop manager",
					"company":"Harwich Haven Authority",
					"location": "Harwich",
					"recommended": false,
					"logo": require('media/harwich.png'),
					"items":[
						{
							"label":"£15,075 per year",
							"icon":"/imgs/money.svg"
						},
						{
							"label":"Full time, temporary",
							"icon":"/imgs/document.svg"
						},
						{
							"label":"35 hours per week (Monday to Sunday)",
							"icon":"/imgs/clock-dark.svg"
						}
					],
					"closing": "Applications close on 25 May 2020.",
					"action":{
						"label":"Find out more",
						"url":"/jobs/jobs-at-scope/events-coordinator-london"
					},
					"description":{
						"primarytitle":"About the role",
						"primarybody":"<p>Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>",
						"secondarytitle":"Requirements",
						"secondarybody":"<p>Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>"
					}
				},
				{
					"title":"Assistant shop manager",
					"company":"Harwich Haven Authority",
					"location": "Harwich",
					"recommended": false,
					"logo": require('media/harwich.png'),
					"items":[
						{
							"label":"£15,075 per year",
							"icon":"/imgs/money.svg"
						},
						{
							"label":"Full time, temporary",
							"icon":"/imgs/document.svg"
						},
						{
							"label":"35 hours per week (Monday to Sunday)",
							"icon":"/imgs/clock-dark.svg"
						}
					],
					"closing": "Applications close on 25 May 2020.",
					"action":{
						"label":"Find out more",
						"url":"/jobs/jobs-at-scope/events-coordinator-london"
					},
					"description":{
						"primarytitle":"About the role",
						"primarybody":"<p>Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>",

						"secondarybody":"<p>Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>"					}
				},
				{
					"title":"Assistant shop manager",
					"company":"Harwich Haven Authority",
					"location": "Harwich",
					"recommended": false,
					"logo": require('media/harwich.png'),
					"items":[
						{
							"label":"£15,075 per year",
							"icon":"/imgs/money.svg"
						},
						{
							"label":"Full time, temporary",
							"icon":"/imgs/document.svg"
						},
						{
							"label":"35 hours per week (Monday to Sunday)",
							"icon":"/imgs/clock-dark.svg"
						}
					],
					"closing": "Applications close on 25 May 2020.",
					"action":{
						"label":"Find out more",
						"url":"/jobs/jobs-at-scope/events-coordinator-london"
					},
					"description":{
						"primarytitle":"About the role",
						"primarybody":"<p>Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>",
						"secondarytitle":"Requirements",
						"secondarybody":"<p>Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>"
					}
				},
			]
		]
	}
};
