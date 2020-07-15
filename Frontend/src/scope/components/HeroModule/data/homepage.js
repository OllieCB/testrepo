export default {
	type: 'homepage', // String "page(default) | donation | article | campaign-stories"
	bottomMargin: false,
	background: {
		url: require('media/hero2.jpg'),
		smallUrl: require('media/hero2.jpg'),
		mediumUrl: require('media/hero2.jpg'),
		placeholder: require('media/hero2-thn.jpg'),
		alt: 'some alt text'
	},
	title: 'Support disabled children like Florence to get the best start in life', // String | null
	cta: {
		label: 'Join the campaign',
		url: '/campaign.html'
	},
};
