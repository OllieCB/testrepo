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
			heading: '1. Have executive accountability for disability',
			paragraph: 'Nominate a leader to be accountable, monitor your progress on disability and can table a discussion during at least one executive leadership meeting per year.',
			type: 'question',
			id: 'question',
			helptitle: 'Action areas',
			helptext: 'Si mihi probabis ea, quae ab illo inventore veritatis et rationibus confirmare, tantum satis esse, ut summum bonum sit numeranda nec segniorem ad respondendum reddidisti quorum.<br/><br/>Quid ex ea voluptate velit esse, ut de quo voluptas expetenda.',
		},
		{
			label: 'We have someone accountable for disability and we meet regularly to discuss the topic',
			id: 'acc1',
			type: 'checkbox',
		},
		{
			label: 'We will have someone in place in 3 months.',
			id: 'acc2',
			type: 'checkbox',
		},
		{
			label: 'We will have someone in place in 12 months',
			id: 'acc3',
			type: 'checkbox',
		},
		{
			label: 'We need help to do this.',
			id: 'acc4',
			type: 'checkbox',
		},
	],
	footer: {
		label: 'Next question',
		id: 'next',
		type: 'submit',
		disclaimer: '<p>Your answers will not be made public, they will ensure we provide the right resources to support you on your journey and to track your progress.</p><br /><p>We will ask you for your consent before making your involvement public, via a logo on the microsite. You\'re in control. You can change your preferences any time by emailing supportercare@scope.org.uk or calling us on 020 7619 7296. You can also read about how we protect and use your personal information in our privacy policy at <a href="">https://workwithme.support/privacy/</a></p>',
	},
};
