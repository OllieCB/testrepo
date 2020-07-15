require('es6-promise').polyfill();
// const Lazy =
require('../../shared/components/LazyLoading'); // eslint-disable-line global-require
window.fetch = window.fetch || require('whatwg-fetch').fetch; // eslint-disable-line global-require
require('../../shared/scripts/flyingFocus.js');
if (!Array.prototype.find) // eslint-disable-line curly
	require('array.prototype.find').shim(); // eslint-disable-line global-require
if (!Object.assign) // eslint-disable-line curly
	require('es6-object-assign').polyfill(); // eslint-disable-line global-require

const cookieBanner = document.querySelector('.js-cookie-banner');
const hasAcceptedCookie = document.cookie.indexOf('scope-accept=true') !== -1;
if (cookieBanner && !hasAcceptedCookie) {
	require.ensure([], require => {
		const { default: CookieBanner } = require('../../shared/components/CookieBannerModule/CookieBannerModule');

		const g = CookieBanner();

		g.init();
	}, 'cookie-banner');
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

const modals = document.querySelector('.js-modal');
if (modals) {
	require.ensure([], require => {
		const { default: Modal } = require('../components/WWMModalModule/WWMModalModule');
		const g = Modal({
			modals,
		});
		g.init();
	}, 'modal');
}

const header = document.querySelector('.js-header');
if (header) {
	require.ensure([], require => {
		const { default: Header } = require('../components/WWMHeaderModule/WWMHeaderModule');
		const g = Header({
			header,
		});
		g.init();
	}, 'header');
}

const helpfulContent = document.querySelector('.js-helpfulContent');
if (helpfulContent) {
	require.ensure([], require => {
		const { default: WWMHelpfulContentVote } = require('../components/WWMHelpfulContentVoteModule/WWMHelpfulContentVoteModule');

		const g = WWMHelpfulContentVote({
			helpfulContent,
		});

		g.init();
	}, 'helpfulContentVote');
}

const progressBars = document.querySelector('.js-progress');
if (progressBars) {
	require.ensure([], require => {
		const { default: Progress } = require('../components/WWMFormModule/WWMFormProgressModule/WWMFormProgressModule');
		const g = Progress({
			progressBars,
		});
		g.init();
	}, 'progress');
}

const search = document.querySelector('.js-form-search');
if (search) {
	require.ensure([], require => {
		const { default: FormSearch } = require('../components/WWMFormSearchModule/WWMFormSearchModule');
		const g = FormSearch({
			search,
		});
		g.init();
	}, 'search');
}

const contentGrid = document.querySelectorAll('.js-content-grid');
if (contentGrid) {
	contentGrid.forEach(grid => {
		require.ensure([], require => {
			const { default: WWMContentGridModule } = require('../components/WWMContentGridModule/WWMContentGridModule');
			const g = WWMContentGridModule({
				grid,
			});
			g.init();
		}, 'content-grid');
	});
}

// Corner Dev link
const url = window.location.host;
const localhost = 'localhost:9100';

if (url === localhost) {
	document.body.insertAdjacentHTML('beforeend', '<a href="" onclick="window.history.go(-1); return false;" style="position: fixed; top: 0; left: 0; background: black; color: white; padding: 5px 8px; border-radius: 0 0 5px 0; z-index: 99999;">Back</a>');
}
