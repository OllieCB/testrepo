export default (function Progress() {
	const progressBar = document.querySelector('.form__progress--bar-in');
	const totalSteps = progressBar.dataset.steps;
	const currentStep = progressBar.dataset.currentstep;
	const stepsPerc = 100 / totalSteps;
	const barWidth = `${stepsPerc * currentStep}%`;

	const init = () => {
		progressBar.style.width = barWidth;
	};

	return Object.freeze({
		init,
	});
});
