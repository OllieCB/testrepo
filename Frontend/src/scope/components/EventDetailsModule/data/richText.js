export default {
	bottomMargin: true,
	topMargin: false,
	details: {
		title: 'Event details',
		list: [
			{
				placeholder: require('images/transparent1px.png'),
				icon: require('images/calendar.svg'),
				text: 'Sat 1 Sept - Mon 10 Sept 2018',
				srtText: 'From Saturday the first of September to Monday the tenth of September 2018'
			},
			{
				placeholder: require('images/transparent1px.png'),
				icon: require('images/location.svg'),
				text: 'Peru',
				srtText: 'In Peru'
			},
			{
				placeholder: require('images/transparent1px.png'),
				icon: require('images/distance.svg'),
				text: 'Distance 13.1 miles',
				srtText: 'Distance of 13.1 miles'
			},
			{
				placeholder: require('images/transparent1px.png'),
				icon: require('images/accessible-dark.svg'),
				text: 'Accessible',
				srtText: 'Accessibility: Accessible'
			}
		]
	},
	richText: {
		title: 'Rich Text',
		content: '<ul><li>list item 1</li><li>list item 2</li><li>list item 3</li></ul>'
	}
};
