export default {
	progress: {
		title: "It's time to get started",
		subtitle: 'Complete your profile 5 very quick questions',
		progress: {
			totalSteps: 5,
			currentStep: 3,
		},
	},
	fields: [
		{
			label: 'Company name',
			id: 'companyname',
			type: 'text',
		},
		{
			label: 'Company description',
			id: 'companydescription',
			type: 'select',
			options: ['Option 1', 'Option 2', 'Option 3'],
		},
		{
			label: 'Number of employees',
			id: 'numemployees',
			type: 'select',
			options: ['1-10', '11-100', '101-1000'],
		},
		{
			label: 'Key contact name',
			id: 'contactname',
			type: 'text',
		},
		{
			label: 'Key contact job description',
			id: 'contactjobdescription',
			type: 'text',
		},
		{
			label: 'Key contact email address',
			id: 'contactemail',
			type: 'text',
		},
		{
			label: 'Yes Id like to hear by email about Scope and Virgin Medias Work With Me campaign, and ways in which I can get involved',
			id: 'contactconsent',
			type: 'checkbox',
		},
	],
	footer: {
		label: 'Sign up',
		id: 'signup',
		type: 'submit',
		disclaimer: '<p>Your answers will not be made public, they will ensure we provide the right resources to support you on your journey and to track your progress.</p><br /><p>We will ask you for your consent before making your involvement public, via a logo on the microsite. You\'re in control. You can change your preferences any time by emailing supportercare@scope.org.uk or calling us on 020 7619 7296. You can also read about how we protect and use your personal information in our privacy policy at <a href="">https://workwithme.support/privacy/</a></p>',
	},
};
