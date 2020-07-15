export default {
	type: 'page', // String "page(default) | donation | article | campaign-stories"
	bottomMargin: true,
	background: {
		url: require('media/hero1.jpg'),
		smallUrl: require('media/hero1.jpg'),
		mediumUrl: require('media/hero1.jpg'),
		placeholder: require('media/hero1-thn.jpg'),
		alt: 'some alt text'
	},
	video: { // {} | null
		id: 'o0M2zLNJF-k',
		handle: require('images/play.svg'),
	},
	title: 'Title goes here', // String | null
	category: {
		name: "", // "campaigns | stories | news | inside"
		label: "",
		summary: {
			title: "",
			text: "",
			ctas: [ // Max of 2
				{
					url: "",
					label: "",
				},
				{
					url: "",
					label: "",
				},
			],
		},
	},
	transcript: {
		title: 'Lorem ipsum',
		text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
		placeholder: require('images/transparent1px.png'),
		more: require('images/plus.svg'),
		less: require('images/minus.svg')
	}
};
