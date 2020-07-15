/* eslint-disable */
module.exports = (source = 'pages', options) => {
	const data = require(`../../../workwithme/components/${source}.js`);
	return options.fn(data.default);
};
/* eslint-enable */
