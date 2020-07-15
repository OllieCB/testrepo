export default {
	type: 'sided', // String "page(default) | donation | article | campaign-stories"
	bottomMargin: false,
	background: {
		url: require('media/hero5.jpg'),
		smallUrl: require('media/hero5.jpg'),
		mediumUrl: require('media/hero5.jpg'),
		placeholder: require('media/hero5-thn.jpg'),
		alt: 'some alt text'
	},
	title: 'A long title that will span across two lines', // String | null
	text: 'Let\'s keep it short and snappy two lines is enough, we don\'t want it way too busy.',
	cta: {
		label: 'Advice and support',
		url: '/content_core.html'
	},
	side: 'right',
	color: 'purple'
};
