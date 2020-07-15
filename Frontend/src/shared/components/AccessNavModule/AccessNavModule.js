export default (function AccessNav({ accessNav }) {
	const id = '#query';

	const handleSkipToSearch = e => {
		e.preventDefault();

		document.querySelector(id).focus();
	};

	const init = () => {
		accessNav.querySelector(`a[href="${id}"]`)
			.addEventListener('click', handleSkipToSearch);
	};

	return Object.freeze({
		init,
	});
});
