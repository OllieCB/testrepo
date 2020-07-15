export default {
	guide: 'Please select a category',
	sections: [
		{
			title: null,
			internal: {
				url: require('images/ribbon-star.svg'),
				urlLight: require('images/ribbon-star-light.svg'),
				placeholder: require('images/transparent1px.png'),
				alt: 'Internal content'
			},
			items: [
				{
					type: 'dir',
					label: 'Emotional support and well being',
					text: null,
					endpoint: '/core/data',
					url: '/content_core.html/emotional-support-well-being'
				},
				{
					type: 'dir',
					label: 'Benefit and social care',
					text: null,
					endpoint: '/core/data',
					url: '/content_core.html/benefit-and-social-care'
				},
				{
					type: 'dir',
					label: 'Day to day travel, transport and mobility',
					text: null,
					endpoint: '/core/data',
					url: '/content_core.html/day-to-day-travel'
				},
				{
					type: 'dir',
					label: 'Diagnosis, discrimination and equality',
					text: null,
					endpoint: '/core/data',
					url: '/content_core.html/diagnosis-discrimination'
				},
				{
					type: 'dir',
					label: 'Education and transitioning to adulthood',
					text: null,
					endpoint: '/core/data',
					url: '/content_core.html/education-and-transitioning'
				},
				{
					type: 'dir',
					label: 'Equipment and assistive technology',
					text: null,
					endpoint: '/core/data',
					url: '/content_core.html/equipment-and-assistive-technology'
				},
				{
					type: 'dir',
					internal: true,
					label: 'Financial guidance',
					text: null,
					endpoint: '/core/data',
					url: '/content_core.html/financial-guidance'
				},
				{
					type: 'dir',
					label: 'Employment',
					text: null,
					endpoint: '/core/data',
					url: '/content_core.html/employment'
				},
				{
					type: 'dir',
					label: 'Housing and home adaptations',
					text: null,
					endpoint: '/core/data',
					url: '/content_core.html/housing-and-home-adaptations'
				},
				{
					type: 'dir',
					label: 'Sports, leisure and vacations',
					text: null,
					endpoint: '/core/data',
					url: '/content_core.html/spots-leisure-and-vacations'
				}
			]
		}
	],
	guidance: 'Please select a category on the left'
};
