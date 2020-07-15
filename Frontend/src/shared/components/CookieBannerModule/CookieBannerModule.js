export default (function CookieBanner() {
	const cookieBanner = document.querySelector('.js-cookie-banner');
	const action = cookieBanner.querySelector('.js-cookie-action');

	const hideBanner = () => {
		cookieBanner.classList.add('hidden');
	};

	const setCookie = () => {
		document.cookie = 'scope-accept=true;max-age=31536000;path=/';

		hideBanner();
	};

	const init = () => {
		cookieBanner.classList.remove('hidden');
		action.addEventListener('click', setCookie);
	};

	return Object.freeze({
		init,
	});
});
