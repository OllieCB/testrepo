export default {
	matchCount: 21,
	bottomMargin: true,
	topMargin: false,
	title: {
		title: 'Find a charity shop',
		sticky: false,
	},
	location: {
		name: 'location',
		label: 'Location',
		placeholder: 'Eg. London, Yorkshire...',
		type: 'text',
		current: {
			label: 'Use current location',
			icon: require('images/target.svg'),
			placeholder: require('images/transparent1px.png'),
		},
	},
	type: {
		label: 'Type of shop',
		options: [
			{
				label: 'Show all',
				value: 'all'
			},
			{
				label: 'Type 1',
				value: 'one'
			},
			{
				label: 'Type 2',
				value: 'two'
			},
			{
				label: 'Type 3',
				value: 'three'
			},
			{
				label: 'Type 4',
				value: 'four'
			},
		]
	},
	include: 'Include drop branks',
	submit: {
		label: 'Find opportunities',
		endpoint: '/shops?page=0'
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
					type: "shop",
					title: "Attitudes towards disability",
					subtitle: "Furniture shop",
					content: "A lack of understanding and prejudice towards disabled people are still too common in our society. The more it happens, the more impact it has.",
					action: {
						label: "Join our campaign",
						url: "google.com"
					},
					items: [
						{
							label: "Mon-Sat: 9am-5.30pm, Sun 10am-4pm",
							srtLabel: "Monday to Saturday: 9am to 5.30pm, Sunday 10am to 4pm",
							placeholder: require('images/transparent1px.png'),
							icon: require("images/clock-dark.svg")
						},
						{
							label: "55 to 57 Abington Street, Northampoton, NN1 2AW | <a href=\"https://goo.gl/maps/DTuq4kskNBJ2\">View map</a>",
							placeholder: require('images/transparent1px.png'),
							icon: require("images/location.svg")
						},
						{
							label: "0800 0113005",
							srtLabel: "0 8 0 0 0 1 1 3 0 0 5",
							placeholder: require('images/transparent1px.png'),
							icon: require("images/phone-dark.svg")
						},
						{
							label: "Parking available",
							placeholder: require('images/transparent1px.png'),
							icon: require("images/dark-placeholder.svg")
						}
					]
				},
				{
					type: "shop",
					title: "Coventry charity",
					subtitle: "Clothes, book shop",
					content: "The Conventry charity shop sells quality new and second-hand clothes and many other things",
					action: {
						label: "Read more",
						url: "google.com"
					},
					items: [
						{
							label: "Mon-Sat: 9am-5.30pm, Sun 10am-4pm",
							srtLabel: "Monday to Saturday: 9am to 5.30pm, Sunday 10am to 4pm",
							placeholder: require('images/transparent1px.png'),
							icon: require("images/clock-dark.svg")
						},
						{
							label: "37 Hertford Street, Coventry, CV1 1LF | <a href=\"https://goo.gl/maps/k3nRnWpCVjo\">View map</a>",
							placeholder: require('images/transparent1px.png'),
							icon: require("images/location.svg")
						},
						{
							label: "024 76224542",
							srtLabel: "0 2 4 7 6 2 2 4 5 4 2",
							placeholder: require('images/transparent1px.png'),
							icon: require("images/phone-dark.svg")
						},
						{
							label: "Drop-off location",
							placeholder: require('images/transparent1px.png'),
							icon: require("images/dark-placeholder.svg")
						}
					]
				}
			],
			[
				{
					type: "shop",
					title: "Attitudes towards disability",
					subtitle: "Furniture shop",
					content: "A lack of understanding and prejudice towards disabled people are still too common in our society. The more it happens, the more impact it has.",
					action: {
						label: "Join our campaign",
						url: "google.com"
					},
					items: [
						{
							label: "Mon-Sat: 9am-5.30pm, Sun 10am-4pm",
							srtLabel: "Monday to Saturday: 9am to 5.30pm, Sunday 10am to 4pm",
							placeholder: require('images/transparent1px.png'),
							icon: require("images/clock-dark.svg")
						},
						{
							label: "55 to 57 Abington Street, Northampoton, NN1 2AW | <a href=\"https://goo.gl/maps/DTuq4kskNBJ2\">View map</a>",
							placeholder: require('images/transparent1px.png'),
							icon: require("images/location.svg")
						},
						{
							label: "0800 0113005",
							srtLabel: "zero eight hundred zero one thirteen zero zero five",
							placeholder: require('images/transparent1px.png'),
							icon: require("images/phone-dark.svg")
						},
						{
							label: "Parking available",
							placeholder: require('images/transparent1px.png'),
							icon: require("images/dark-placeholder.svg")
						}
					]
				},
				{
					type: "shop",
					title: "Coventry charity",
					subtitle: "Clothes, book shop",
					content: "The Conventry charity shop sells quality new and second-hand clothes and many other things",
					action: {
						label: "Read more",
						url: "google.com"
					},
					items: [
						{
							label: "Mon-Sat: 9am-5.30pm, Sun 10am-4pm",
							srtLabel: "Monday to Saturday: 9am to 5.30pm, Sunday 10am to 4pm",
							placeholder: require('images/transparent1px.png'),
							icon: require("images/clock-dark.svg")
						},
						{
							label: "37 Hertford Street, Coventry, CV1 1LF | <a href=\"https://goo.gl/maps/k3nRnWpCVjo\">View map</a>",
							placeholder: require('images/transparent1px.png'),
							icon: require("images/location.svg")
						},
						{
							label: "024 76224542",
							srtLabel: "zero twenty four seven six two two four five four two",
							placeholder: require('images/transparent1px.png'),
							icon: require("images/phone-dark.svg")
						},
						{
							label: "Drop-off location",
							placeholder: require('images/transparent1px.png'),
							icon: require("images/dark-placeholder.svg")
						}
					]
				}
			],
			[
				{
					type: "shop",
					title: "Attitudes towards disability",
					subtitle: "Furniture shop",
					content: "A lack of understanding and prejudice towards disabled people are still too common in our society. The more it happens, the more impact it has.",
					action: {
						label: "Join our campaign",
						url: "google.com"
					},
					items: [
						{
							label: "Mon-Sat: 9am-5.30pm, Sun 10am-4pm",
							srtLabel: "Monday to Saturday: 9am to 5.30pm, Sunday 10am to 4pm",
							placeholder: require('images/transparent1px.png'),
							icon: require("images/clock-dark.svg")
						},
						{
							label: "55 to 57 Abington Street, Northampoton, NN1 2AW | <a href=\"https://goo.gl/maps/DTuq4kskNBJ2\">View map</a>",
							placeholder: require('images/transparent1px.png'),
							icon: require("images/location.svg")
						},
						{
							label: "0800 0113005",
							srtLabel: "0 8 0 0 0 1 1 3 0 0 5",
							placeholder: require('images/transparent1px.png'),
							icon: require("images/phone-dark.svg")
						},
						{
							label: "Parking available",
							placeholder: require('images/transparent1px.png'),
							icon: require("images/dark-placeholder.svg")
						}
					]
				},
				{
					type: "shop",
					title: "Coventry charity",
					subtitle: "Clothes, book shop",
					content: "The Conventry charity shop sells quality new and second-hand clothes and many other things",
					action: {
						label: "Read more",
						url: "google.com"
					},
					items: [
						{
							label: "Mon-Sat: 9am-5.30pm, Sun 10am-4pm",
							srtLabel: "Monday to Saturday: 9am to 5.30pm, Sunday 10am to 4pm",
							placeholder: require('images/transparent1px.png'),
							icon: require("images/clock-dark.svg")
						},
						{
							label: "37 Hertford Street, Coventry, CV1 1LF | <a href=\"https://goo.gl/maps/k3nRnWpCVjo\">View map</a>",
							placeholder: require('images/transparent1px.png'),
							icon: require("images/location.svg")
						},
						{
							label: "024 76224542",
							srtLabel: "0 2 4 7 6 2 2 4 5 4 2",
							placeholder: require('images/transparent1px.png'),
							icon: require("images/phone-dark.svg")
						},
						{
							label: "Drop-off location",
							placeholder: require('images/transparent1px.png'),
							icon: require("images/dark-placeholder.svg")
						}
					]
				}
			]
		]
	}
};
