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
	signup: {
		title: 'Sign up here',
		list: [
			{
				placeholder: require('images/transparent1px.png'),
				icon: require('images/entry-fee-white.svg'),
				text: 'Entry fee: £449',
				srtText: 'Entry fee: £449'
			},
			{
				placeholder: require('images/transparent1px.png'),
				icon: require('images/pledge-white.svg'),
				text: 'Minimum pledge: £3,900',
				srtText: 'Minimum pledge of: £3,900'
			}
		],
		ctas: [
			{
				url: 'google.com',
				label: 'Apply for a place'
			},
			{
				url: 'google.com',
				label: 'Sign up with own place'
			}
		]
	}
};
