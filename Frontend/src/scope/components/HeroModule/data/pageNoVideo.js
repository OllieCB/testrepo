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
	video: undefined, // {} | null
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
};
