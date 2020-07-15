export default {
	type: 'sidedNoButton', // String "page(default) | donation | article | campaign-stories"
	bottomMargin: false,
	background: {
		url: require('media/hero2.jpg'),
		smallUrl: require('media/hero2.jpg'),
		mediumUrl: require('media/hero2.jpg'),
		placeholder: require('media/hero2-thn.jpg'),
		alt: 'some alt text'
	},
	title: 'A long title that spans two lines', // String | null
	text: 'Let\'s keep it short and snappy two lines is enough, we don\'t want it way too busy.',
	side: 'left',
	color: 'yellow'
};
