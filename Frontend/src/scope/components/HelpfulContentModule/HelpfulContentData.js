export default {
	bottomMargin: true,
	topMargin: false,
	label: 'Is this content helpful?',
	buttons: [
		{
			label: 'Yes',
			endpoint: '/feedback/yes',
			ariaLabel: 'Press ALT and Y for yes.'
		},
		{
			label: 'No',
			endpoint: '/feedback/no',
			ariaLabel: 'Press ALT and N for no.'
		}
	],
	response: {
		yes:
		{
			message: 'Great!',
			label: 'Tell us how it helped',
			link: 'http://google.com'
		},
		no:
		{
			message: 'We\'re sorry to hear that.',
			label: 'Tell us how to improve it',
			link: 'http://google.com'
		}
	}
};
