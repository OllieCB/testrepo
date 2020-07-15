export default {
	matchCount: 21,
	title: 'Search',
	search: {
		label: 'Location',
		placeholder: 'Search Scope',
		type: 'text'
	},
	spinner: {
		placeholder: require('images/transparent1px.png'),
		url: require('images/spinner.svg'),
		msg: "Loading"
	},
	filter:
	{
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
		],
		name: 'category'
	},
	internal: {
		isActive: true,
		label: 'Internal pages only',
	},
	isInternal: true,

	submit: {
		label: 'Search',
		update: 'Update',
		endpoint: '/searchPage?page=0'
	},
};
