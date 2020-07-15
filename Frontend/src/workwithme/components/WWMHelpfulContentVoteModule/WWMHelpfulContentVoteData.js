export default {
	title: "Was this useful?",
	content: "Si sine causa, max videro; intero hoc epicurus in ea commodi consequatur?",
	buttons: [
		{
			endpoint: '/feedback/yes',
			ariaLabel: 'Press ALT and Y for yes.',
			buttonIconClass: "wwm-thumbs-up"
		},
		{
			endpoint: '/feedback/no',
			ariaLabel: 'Press ALT and N for no.',
			buttonIconClass: "wwm-thumbs-down"
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
