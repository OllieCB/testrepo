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
			label: 'Name',
			id: 'name',
			type: 'text',
		},
		{
			label: 'Company',
			id: 'company',
			type: 'text',
		},
		{
			label: 'Email',
			id: 'email',
			type: 'text',
		},
		{
			label: 'Message',
			id: 'message',
			type: 'textarea',
		},
		{
			id: 'captcha',
			type: 'captcha',
		},
	],
	footer: {
		label: 'Send',
		id: 'send',
		type: 'submit',
		disclaimer: '<p>Your answers will not be made public, they will ensure we provide the right resources to support you on your journey and to track your progress.</p><br /><p>We will ask you for your consent before making your involvement public, via a logo on the microsite. You\'re in control. You can change your preferences any time by emailing supportercare@scope.org.uk or calling us on 020 7619 7296. You can also read about how we protect and use your personal information in our privacy policy at <a href="">https://workwithme.support/privacy/</a></p>',
	},
};
