export default (function PostcodeLookup(spec) {
	const { postcodeLookup } = spec;
	const addr = postcodeLookup.querySelector('.js-form-address');
	const postcode = postcodeLookup.querySelector('.js-form-postcode');
	const addrListOut = postcodeLookup.querySelector('.js-form-addr-list-outer');
	const addrListIn = postcodeLookup.querySelector('.js-form-addr-list-inner');
	const manual = postcodeLookup.querySelector('.js-form-manual');

	const state = {
		postcode: undefined,
	};

	const showAddr = () => {
		addr.classList.remove('hidden-input');
		manual.classList.add('hidden-input');
	};

	const setAddrValues = addrObj => {
		postcodeLookup.querySelector('.js-form-address1').value = addrObj.Line1;
		postcodeLookup.querySelector('.js-form-address2').value = addrObj.Line2;
		postcodeLookup.querySelector('.js-form-town').value = addrObj.City;

		showAddr();
	};

	const fetchAddrWithContainer = id => {
		fetch(`${postcode.dataset.get}?id=${id || addrListIn.querySelector('.selected').dataset.value}`)
			.then(res => res.json())
			.then(data => {
				setAddrValues(data.Items[0]);
			});

		addrListIn.onblur = null;
		addrListOut.classList.add('hidden-input');
		manual.focus();
		addrListIn.querySelector('ul').innerHTML = '';
	};

	const fetchAddr = () => {
		const postcodeRE = /([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\s?[0-9][A-Za-z]{2})/;

		if (postcodeRE.test(postcode.value) && postcode.value !== state.postcode) {
			state.postcode = postcode.value;
			const query = `?text=${postcode.value}`;
			fetch(`${postcode.dataset.search}${query}`)
				.then(res => res.json())
				.then(data => {
					const items = data.Items;

					if (data.failure) {
						showAddr();
					} else if (items.length > 0) {
						const ul = addrListIn.querySelector('ul');
						ul.innerHTML = '';
						data.Items.map((item, i) => {
							const temp = document.createElement('li');
							temp.innerHTML = item.Text;
							temp.setAttribute('data-value', item.Id);
							temp.setAttribute('role', 'option');
							temp.id = `lb-opt${i + 1}`;

							temp.addEventListener('click', e => {
								fetchAddrWithContainer(e.currentTarget.dataset.value);
							});

							ul.appendChild(temp);
							return temp;
						});

						addrListIn.querySelector('li').classList.add('selected');
						addrListOut.classList.remove('hidden-input');
					}
				});
		}
	};

	const scrollIntoView = el => {
		const contextRect = addrListIn.getBoundingClientRect();
		const elRect = el.getBoundingClientRect();
		const ul = addrListIn.querySelector('ul');

		if (elRect.top - contextRect.top <= 0) {
			ul.scrollTop -= 30;
		} else if (elRect.top - contextRect.top >= addrListIn.clientHeight) {
			ul.scrollTop += 30;
		}
	};

	const select = el => {
		addrListIn.querySelector('li.selected').classList.remove('selected');
		el.classList.add('selected');

		addrListIn.setAttribute('aria-activedescendant', el.id);
	};

	const handleAddrNavigation = e => {
		const keycodes = [38, 40, 13];

		if (keycodes.indexOf(e.keyCode) > -1) {
			e.preventDefault();
			e.stopPropagation();

			const current = addrListIn.querySelector('li.selected');
			const next = current.nextElementSibling;
			const prev = current.previousElementSibling;

			if (e.keyCode === 38 && prev) { // UP ARROW
				select(prev);
				scrollIntoView(prev);
			} else if (e.keyCode === 40 && next) { // DOWN ARROW
				select(next);
				scrollIntoView(next);
			} else if (e.keyCode === 13 && current) {
				fetchAddrWithContainer(current.dataset.value);
			}
		}
	};

	const init = () => {
		addrListIn.addEventListener('keydown', handleAddrNavigation);
		postcode.addEventListener('keyup', fetchAddr);

		manual.addEventListener('click', () => {
			showAddr();
			addrListOut.classList.add('hidden-input');
		});
	};

	return Object.freeze({
		init,
	});
});
