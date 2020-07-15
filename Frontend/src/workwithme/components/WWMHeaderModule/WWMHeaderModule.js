export default (function Header() {
	const openMobileNav = document.querySelector('.js-mobile-open');
	const closeMobileNav = document.querySelector('.js-mobile-close');

	const closeNav = () => {
		closeMobileNav.addEventListener('click', () => {
			document.querySelector('#mobile-nav').classList.remove('visible');
			document.querySelector('body').classList.remove('mobile-nav-open');
		});
	};

	const openNav = () => {
		openMobileNav.addEventListener('click', () => {
			document.querySelector('#mobile-nav').classList.add('visible');
			document.querySelector('body').classList.add('mobile-nav-open');
		});
	};

	const init = () => {
		openNav();
		closeNav();
	};

	return Object.freeze({
		init,
	});
});
