export default (function TableContainerModule(spec) {
	const { tableContainer } = spec;
	const table = tableContainer.querySelector('table');
	const scrollableDiv = document.createElement('div');

	const setUpTable = () => {
		scrollableDiv.appendChild(table);
		tableContainer.appendChild(scrollableDiv);
	};

	const handleScroll = () => {
		if (scrollableDiv.scrollLeft <= 10) {
			tableContainer.classList.remove('TableContainer__overflow-left');
		} else {
			tableContainer.classList.add('TableContainer__overflow-left');
		}
		let scrollDiff = scrollableDiv.scrollWidth - scrollableDiv.clientWidth - 10;
		if (scrollDiff < 0) {
			scrollDiff = 0;
		}
		if (scrollableDiv.scrollLeft >= scrollDiff) {
			tableContainer.classList.remove('TableContainer__overflow-right');
		} else {
			tableContainer.classList.add('TableContainer__overflow-right');
		}
	};

	const enableScrollableDiv = () => {
		scrollableDiv.addEventListener('scroll', handleScroll);
		handleScroll();
	};

	const disableScrollableDiv = () => {
		tableContainer.classList.remove('TableContainer__overflow-left');
		tableContainer.classList.remove('TableContainer__overflow-right');
		scrollableDiv.removeEventListener('scroll', handleScroll);
	};

	const handleResize = () => {
		const enableScroll = scrollableDiv.scrollWidth > scrollableDiv.clientWidth;
		if (enableScroll) {
			enableScrollableDiv();
		} else {
			disableScrollableDiv();
		}
	};

	const init = () => {
		setUpTable();
		window.addEventListener('resize', handleResize);
		handleResize();
	};

	return Object.freeze({
		init,
	});
});
