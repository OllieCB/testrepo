const serialize = require('form-serialize');
const { default: Popup } = require('../../common/PopupModule/PopupModule');
const template = require('./JobBoardResults/Item/Item.hbs');

const IMask = require('imask');

export default (function JobBoard(spec) {
	const { jobBoard, setLazy } = spec;
	const form = jobBoard.querySelector('.js-job-board-form');
	const locationField = form.querySelector('.js-job-board-location');
	const currentLocation = form.querySelector('.js-job-board-current');
	const loadMore = jobBoard.querySelector('.js-job-board-loadMore');
	const container = jobBoard.querySelector('.js-job-board-result-container');
	const matchLabel = jobBoard.querySelector('.js-job-board-match-label');
	const moreCount = jobBoard.querySelector('.js-job-board-more-count');
	const companiesFilter = jobBoard.querySelector('.js-companies');
	const employmentTypesFilter = jobBoard.querySelector('.js-employment-types');
	const salaryLowerFilter = jobBoard.querySelector('.js-salary-lower');
	const salaryUpperFilter = jobBoard.querySelector('.js-salary-upper');
	const onlyRecommendedFilter = jobBoard.querySelector('.js-only-recommended');
	const masked = jobBoard.querySelectorAll('.js-imask');
	const masks = [];


	const state = {
		matchCount: undefined,
		matchVisible: 0,
		pageIndex: 0,
		currentSearch: '',
		selectedFilters: {
			company: '',
			employmentType: '',
			salaryLower: '',
			salaryUpper: '',
			onlyRecommended: false,
		},
	};

	const forEach = (cb, arr) => {
		for (let i = 0; i < arr.length; i += 1) {
			cb(arr[i]);
		}
	};

	const queryLazyImages = () => {
		const els = jobBoard.querySelectorAll('.lazy');
		forEach(setLazy, els);
	};

	const updateSelectedFilters = () => {
		const companyFilter = companiesFilter.querySelector(`[value='${state.selectedFilters.company}']`);
		if (companyFilter) {
			companyFilter.selected = 'selected';
		}
		const employmentType = employmentTypesFilter.querySelector(`[value='${state.selectedFilters.employmentType}]`);
		if (employmentType) {
			employmentType.selected = 'selected';
		}
	};

	const handleFilters = filters => {
		if (filters.hasRecommended) {
			onlyRecommendedFilter.parentElement.classList.remove('hidden');
			onlyRecommendedFilter.checked = state.selectedFilters.onlyRecommended;
		} else {
			onlyRecommendedFilter.parentElement.classList.add('hidden');
			onlyRecommendedFilter.checked = false;
			state.selectedFilters.onlyRecommended = false;
		}
		employmentTypesFilter.innerHTML = filters.employmentTypes.reduce((innerHTML, cur) => innerHTML + `<option value='${cur.id}'>${cur.name}</option>`, ''); // eslint-disable-line
		companiesFilter.innerHTML = filters.companies.reduce((innerHTML, cur) => innerHTML + `<option value='${cur.id}'>${cur.name}</option>`, ''); // eslint-disable-line
		updateSelectedFilters();
	};

	const handleResult = data => {
		if (data.results && data.results.length > 0) {
			if (!data.success) {
				Popup(Object.assign({}, data.popup, {
					return: locationField,
				}));
			}

			if (data.matchLabel) {
				loadMore.classList.remove('loading');
				matchLabel.innerHTML = data.matchLabel;
			}

			if (data.filters) {
				handleFilters(data.filters);
			}

			container.innerHTML += data.results.reduce((innerHTML, cur) => innerHTML + template(cur), '');

			state.matchCount = state.matchCount || data.matchCount;
			state.matchVisible += data.results.reduce((acc, cur) => acc + cur.length, 0);

			if (state.matchCount > state.matchVisible) {
				loadMore.classList.remove('hidden');
			} else {
				loadMore.classList.add('hidden');
			}
		} else {
			matchLabel.innerHTML = data.matchLabel;
			loadMore.classList.add('hidden');
		}

		moreCount.innerHTML = '';
	};

	const setLoading = () => {
		loadMore.classList.add('loading');
		moreCount.innerHTML = loadMore.dataset.msg;
	};

	const handleShowInfoButtonClick = e => {
		e.preventDefault();
		let showInfoButton = e.target;
		if (!showInfoButton.classList.contains('JobBoardResultsItem__showButton')) {
			showInfoButton = showInfoButton.parentElement;
		}
		const showInfoContainer = showInfoButton.parentElement.querySelector('.js-show-information-container');
		showInfoContainer.classList.toggle('hidden');
		showInfoButton.classList.toggle('active');
		showInfoButton.querySelector('.JobBoardResultsItem__showButton-show').setAttribute('aria-hidden', showInfoButton.classList.contains('active'));
		showInfoButton.querySelector('.JobBoardResultsItem__showButton-hide').setAttribute('aria-hidden', !showInfoButton.classList.contains('active'));
	};

	const attachShowInfoButtonEvents = () => {
		const showInfoButtons = jobBoard
			.querySelectorAll('.js-show-information-button');

		forEach(button => {
			button.removeEventListener('click', handleShowInfoButtonClick);
			button.addEventListener('click', handleShowInfoButtonClick);
		}, showInfoButtons);
	};

	const buildFormData = newSearch => {
		const baseForm = state.currentSearch;
		let filter = '';
		if (companiesFilter.selectedIndex > 0) {
			filter += `company=${companiesFilter.options[companiesFilter.selectedIndex].value}&`;
		}
		if (employmentTypesFilter.selectedIndex > 0) {
			filter += `employmentType=${employmentTypesFilter.options[employmentTypesFilter.selectedIndex].value}&`;
		}
		if (state.selectedFilters.salaryLower.length > 0 && state.selectedFilters.salaryLower >= 0) {
			filter += `salaryLower=${state.selectedFilters.salaryLower}&`;
		}
		if (state.selectedFilters.salaryUpper.length > 0 && state.selectedFilters.salaryUpper > 0) {
			filter += `salaryUpper=${state.selectedFilters.salaryUpper}&`;
		}
		if (onlyRecommendedFilter.checked) {
			filter += 'onlyRecommended=true&';
		}
		if (newSearch) {
			filter += 'newSearch=true&';
		}
		if (filter.length === 0) {
			return baseForm;
		}
		filter = filter.substr(0, filter.length - 1);
		return `${baseForm}&${filter}`;
	};

	const submitForm = newSearch => {
		loadMore.classList.remove('hidden');
		container.innerHTML = '';
		matchLabel.innerHTML = '';
		setLoading();

		state.matchCount = undefined;
		state.matchVisible = 0;
		state.pageIndex = 0;
		fetch(form.action, {
			body: buildFormData(newSearch),
			method: 'post',
			headers: new Headers({
				'Content-Type': 'application/x-www-form-urlencoded',
			}),
		})
			.then(res => res.json())
			.then(handleResult)
			.then(queryLazyImages)
			.then(attachShowInfoButtonEvents);
	};

	const handleSubmit = e => {
		e.preventDefault();
		state.currentSearch = serialize(form).replace('+', '%20');
		submitForm(true);
	};

	const handleLoadMore = () => {
		setLoading();

		fetch(form.action.concat(`&${buildFormData()}`).replace(/page=\d+/, `page=${state.pageIndex + 1}`))
			.then(res => res.json())
			.then(data => {
				state.pageIndex += 1;

				moreCount.innerHTML = `${data.results.reduce((acc, cur) => acc + cur.length, 0)} more items loaded`;
				setTimeout(() => {
					moreCount.innerHTML = ''; // This is a trick for screen readers to update aria-live regions
				}, 1000);

				return data;
			})
			.then(handleResult)
			.then(queryLazyImages)
			.then(attachShowInfoButtonEvents)
			.then(() => {
				container
					.querySelector(`.JobBoardResultsItem:nth-child(${state.pageIndex + 1}) button`)
					.focus();

				loadMore.classList.remove('loading');
			});
	};

	const autoFillLocation = location => {
		locationField.value = location;
	};

	const fillHiddenFields = (lat, lng) => {
		form.querySelector('[name=latitude]').setAttribute('value', lat);
		form.querySelector('[name=longitude]').setAttribute('value', lng);
	};

	const useCurrentLocation = () => {
		navigator.geolocation.getCurrentPosition(pos => {
			fetch(`${currentLocation.dataset.endpoint}?latitude=${pos.coords.latitude}&longitude=${pos.coords.longitude}`)
				.then(res => res.text())
				.then(autoFillLocation);

			fillHiddenFields(pos.coords.latitude, pos.coords.longitude);
		});
	};

	const handleCompaniesFilter = () => {
		const selectedCompany = companiesFilter.options[companiesFilter.selectedIndex].value;
		if (state.selectedFilters.company === selectedCompany) {
			return;
		}
		state.selectedFilters.company = selectedCompany;
		submitForm();
	};

	const handleEmploymentTypesFilter = () => {
		const selectedEmploymentType = employmentTypesFilter
			.options[employmentTypesFilter.selectedIndex].value;
		if (state.selectedFilters.employmentType === selectedEmploymentType) {
			return;
		}
		state.selectedFilters.employmentType = selectedEmploymentType;
		submitForm();
	};

	const handleSalaryLowerFilter = () => {
		const salaryLowerValue = masks.filter(mask => mask.el === salaryLowerFilter)[0].mask.typedValue;
		if (state.selectedFilters.salaryLower === salaryLowerValue) {
			return;
		}
		state.selectedFilters.salaryLower = salaryLowerValue;
		submitForm();
	};

	const handleSalaryUpperFilter = () => {
		const salaryUpperValue = masks.filter(mask => mask.el === salaryUpperFilter)[0].mask.typedValue;
		if (state.selectedFilters.salaryUpper === salaryUpperValue) {
			return;
		}
		state.selectedFilters.salaryUpper = salaryUpperValue;
		submitForm();
	};

	const handleOnlyRecommendedFilter = () => {
		if (state.selectedFilters.onlyRecommended === onlyRecommendedFilter.checked) {
			return;
		}
		state.selectedFilters.onlyRecommended = onlyRecommendedFilter.checked;
		submitForm();
	};

	const attachFilterEvents = () => {
		companiesFilter.addEventListener('change', handleCompaniesFilter);
		employmentTypesFilter.addEventListener('change', handleEmploymentTypesFilter);
		salaryLowerFilter.addEventListener('blur', handleSalaryLowerFilter);
		salaryUpperFilter.addEventListener('blur', handleSalaryUpperFilter);
		onlyRecommendedFilter.addEventListener('change', handleOnlyRecommendedFilter);
	};

	const initMasks = () => {
		[].forEach.call(masked, m => {
			const maskStr = atob(m.dataset.imask);
			const mask = JSON.parse(maskStr);

			if (maskStr.indexOf('Number') > -1) {
				mask.blocks.num.mask = Number;
			}
			if (maskStr.indexOf('dispatch') > -1) {
				mask.dispatch = (appended, dynamicMasked) => {
					const number = dynamicMasked.value + appended;

					return dynamicMasked
						.compiledMasks
						.find(cMask =>
							cMask.startsWith.indexOf(number[0]) > -1);
				};
			}

			masks.push({
				el: m,
				mask: new IMask(m, mask),
			});
		});
	};

	const init = () => {
		state.matchCount = Number(jobBoard.dataset.matchCount);
		state.matchVisible = jobBoard.querySelectorAll('.PageItem__item').length;

		jobBoard
			.querySelector('.js-job-board-submit')
			.addEventListener('click', handleSubmit);

		attachShowInfoButtonEvents();
		attachFilterEvents();
		loadMore.addEventListener('click', handleLoadMore);
		currentLocation.addEventListener('click', useCurrentLocation);
		locationField.addEventListener('keydown', fillHiddenFields.bind(null, '', ''));

		initMasks();
	};

	return Object.freeze({
		init,
	});
});
