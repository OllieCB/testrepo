require('es6-promise').polyfill();
const Lazy = require('../../shared/components/LazyLoading'); // eslint-disable-line global-require
window.fetch = window.fetch || require('whatwg-fetch').fetch; // eslint-disable-line global-require
require('../../shared/scripts/flyingFocus.js');
if (!Array.prototype.find) // eslint-disable-line curly
	require('array.prototype.find').shim(); // eslint-disable-line global-require
if (!Object.assign) // eslint-disable-line curly
	require('es6-object-assign').polyfill(); // eslint-disable-line global-require

const header = document.querySelector('.js-header');
if (header) {
	require.ensure([], require => {
		const { default: Header } = require('../../shared/components/HeaderModule/HeaderModule');

		Header({
			header,
		}).init();
	}, 'headerModule');
}

const accessNav = document.querySelector('.js-accessnav');
if (accessNav) {
	require.ensure([], require => {
		const { default: AccessNav } = require('../../shared/components/AccessNavModule/AccessNavModule');

		AccessNav({
			accessNav,
		}).init();
	}, 'accessNavModule');
}

const cookieBanner = document.querySelector('.js-cookie-banner');
const hasAcceptedCookie = document.cookie.indexOf('scope-accept=true') !== -1;
if (cookieBanner && !hasAcceptedCookie) {
	require.ensure([], require => {
		const { default: CookieBanner } = require('../../shared/components/CookieBannerModule/CookieBannerModule');

		const g = CookieBanner({
			cookieBanner,
			action: cookieBanner.querySelector('.js-cookie-action'),
		});

		g.init();
	}, 'cookie-banner');
}

const jobBoard = document.querySelector('.js-job-board');
if (jobBoard) {
	require.ensure(['imask'], require => {
		const { default: JobBoard } = require('../components/JobBoardModule/JobBoardModule');

		JobBoard({
			jobBoard,
			setLazy: Lazy.setLazy,
		}).init();
	}, 'jobBoardModule');
}
