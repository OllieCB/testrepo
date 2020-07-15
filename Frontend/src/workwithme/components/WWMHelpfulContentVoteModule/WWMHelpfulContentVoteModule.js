export default (function WWMHelpfulContentVoteModule(spec) {
	const { helpfulContent } = spec;

	const handleClick = e => {
		fetch(e.target.dataset.endpoint)
			.then(res => res.json());
	};

	const init = () => {
		[].forEach.call(helpfulContent.querySelectorAll('.js-helpful-btn'), btn => {
			btn.addEventListener('click', handleClick);
		});
	};

	const handleAccesskey = e => {
		if (e.altKey && e.keyCode === 89) { // ALT + Y
			document.querySelectorAll('.js-helpful-btn')[0].click();
		}
		if (e.altKey && e.keyCode === 78) { // ALT + N
			document.querySelectorAll('.js-helpful-btn')[1].click();
		}
	};

	window.addEventListener('keydown', handleAccesskey);

	return Object.freeze({
		init,
	});
});
