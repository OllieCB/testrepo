export default {
	endpoints: {
		search: '/postcodeLookup/search',
		get: '/postcodeLookup/get'
	},
	postcode: {
		label: 'Postcode',
		placeholder: 'eg. EC1N 8PQ',
		id: 'form-postcode',
		errId: 'form-postcode-err',
		err: 'Please enter a valid postcode'
	},
	listbox: {
		label: 'Please select an address from the list',
	},
	address1: {
		label: 'Address line 1',
		placeholder: 'Address line 1',
		id: 'form-address1',
		errId: 'form-address1-err',
		err: 'Please enter a valid address'
	},
	address2: {
		label: 'Address line 2',
		placeholder: 'Address line 2',
		id: 'form-address2',
		errId: 'form-address2-err',
		err: 'Please enter a valid address'
	},
	town: {
		label: 'Town',
		placeholder: 'Town',
		id: 'form-town',
		errId: 'form-town-err',
		err: 'Please enter a valid town'
	}
};
