/* eslint-disable */
module.exports = (source = 'pages', options) => {
	const data = require(`../../../shared/components/${source}.js`);
	return options.fn(data.default);
};
/* eslint-enable */
