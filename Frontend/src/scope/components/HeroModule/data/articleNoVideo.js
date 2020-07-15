export default {
	type: 'article', // String "page(default) | donation | article | campaign-stories"
	bottomMargin: true,
	background: {
		url: require('media/hero2.jpg'),
		smallUrl: require('media/hero2.jpg'),
		mediumUrl: require('media/hero2.jpg'),
		placeholder: require('media/hero2-thn.jpg'),
		alt: 'some alt text'
	},
	video: undefined, // {} | null
	title: "A long title that should span across multiple lines", // String | null
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
