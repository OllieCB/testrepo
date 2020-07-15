export default {
	type: 'campaign-stories', // String "page(default) | donation | article | campaign-stories"
	background: {
		url: require('media/hero4.jpg'),
		smallUrl: require('media/hero4.jpg'),
		mediumUrl: require('media/hero4.jpg'),
		placeholder: require('media/hero4-thn.jpg'),
		alt: 'some alt text'
	},
	video: undefined, // {} | null
	title: undefined, // String | null
	category: {
		name: "campaigns", // "campaigns | stories | news | inside"
		label: "Campaigns",
		summary: {
			title: "Some campaign title here",
			text: "lorem ipsum and some other texts are used as placeholder in design to simulate and provide visual feedback as close as possible to reality",
			ctas: [ // Max of 2
				{
					url: "http://google.com",
					label: "Join our campaign",
					arrow: require('images/arrow-link-white.svg'),
				},
				{
					url: "http://google.com",
					label: "Sign up lorem ipsum",
					arrow: require('images/arrow-link.svg'),
				},
			],
		},
	},
};
