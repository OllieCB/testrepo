require('es6-promise').polyfill();
const Lazy = require('../../shared/components/LazyLoading'); // eslint-disable-line global-require
window.fetch = window.fetch || require('whatwg-fetch').fetch; // eslint-disable-line global-require
require('../../shared/scripts/flyingFocus.js');
if (!Array.prototype.find) // eslint-disable-line curly
	require('array.prototype.find').shim(); // eslint-disable-line global-require
if (!Object.assign) // eslint-disable-line curly
	require('es6-object-assign').polyfill(); // eslint-disable-line global-require

const pubsub = (function pubsub() {
	const handlers = {};

	const emit = (e, d) => {
		if (!handlers[e]) return 1;

		handlers[e].forEach(cb => cb(d));
		return 0;
	};

	const on = (e, cb) => {
		if (!handlers[e]) {
			handlers[e] = [cb];
		} else {
			handlers[e].push(cb);
		}
	};

	return {
		emit,
		on,
	};
}());

const iframes = document.querySelectorAll('.rte iframe');
if (iframes) {
	[].forEach.call(iframes, iframe => {
		window.addEventListener('message', data => {
			if (data.origin === 'https://partner-tools.moneyadviceservice.org.uk') {
				iframe.style.height = `${data.data.replace('MASRESIZE-', '')}px`; // eslint-disable-line
			}
		});
	});
}

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

const titleBanner = document.querySelector('.js-title-sticky');
if (titleBanner) {
	require.ensure([], require => {
		const { default: TitleBanner } = require('../components/TitleBannerModule/TitleBannerModule');

		const g = TitleBanner({
			titleBanner,
			setLazy: Lazy.setLazy,
		});

		g.init();
	}, 'titleBanner');
}

const galleries = document.querySelectorAll('*[id^=gallery-]');
if (galleries.length > 0) {
	require.ensure([], require => {
		const { default: Gallery } = require('../components/GalleryModule/GalleryModule');


		[].forEach.call(galleries, gallery => {
			const g = Gallery({
				gallery,
			});

			g.init();
		});
	}, 'galleryModule');
}

const hero = document.querySelector('.js-hero-video');
if (hero) {
	require.ensure(['symbol-es6', 'youtube-player'], require => {
		const { default: HeroVideo } = require('../components/HeroModule/HeroModule');

		HeroVideo({
			hero,
			id: hero.dataset.id,
		}).init();
	}, 'heroModule');
}

const videos = document.querySelectorAll('.js-video');
if (videos.length > 0) {
	require.ensure(['symbol-es6', 'youtube-player'], require => {
		const { default: Video } = require('../components/VideoModule/VideoModule');

		[].forEach.call(videos, video => {
			const g = Video({
				video,
				id: video.dataset.id,
			});

			g.init();
		});
	}, 'videoModule');
}

const campStories = document.querySelector('.js-campStories');
if (campStories) {
	require.ensure(['PageItemModule/PageItemModule.hbs'], require => {
		const { default: CampaignsStories } = require('../components/CampaignsStoriesModule/CampaignsStoriesModule');

		const g = CampaignsStories({
			campStories,
			setLazy: Lazy.setLazy,
		});

		g.init();
	}, 'campStories');
}

const eventListing = document.querySelector('.js-eventListing');
if (eventListing) {
	require.ensure(['PageItemModule/PageItemModule.hbs'], require => {
		const { default: EventListing } = require('../components/EventListingModule/EventListingModule');

		const g = EventListing({
			eventListing,
			setLazy: Lazy.setLazy,
		});

		g.init();
	}, 'eventListing');
}

const summaries = document.querySelectorAll('.js-summary');
if (summaries.length > 0) {
	require.ensure([], require => {
		const { default: Summary } = require('../components/SummaryModule/SummaryModule');

		[].forEach.call(summaries, summary => {
			const g = Summary({
				summary,
			});

			g.init();
		});
	}, 'summary');
}

const accordions = document.querySelectorAll('.js-accordion');
if (accordions.length > 0) {
	require.ensure([], require => {
		const { default: Accordion } = require('../components/AccordionModule/AccordionModule');

		[].forEach.call(accordions, accordion => {
			const g = Accordion({
				accordion,
			});

			g.init();
		});
	}, 'accordion');
}

const contentCore = document.querySelector('.js-contentCore');
if (contentCore) {
	const breadCrumb = document.querySelector('.js-breadcrumb');
	if (breadCrumb) {
		require.ensure(['element-remove'], require => {
			const { default: BreadCrumb } = require('../components/BreadcrumbModule/BreadcrumbModule');

			const g = BreadCrumb({
				breadCrumb,
				pubsub,
			});

			g.init();
		}, 'breadCrumb');
	}

	require.ensure(['element-closest'], require => {
		const { default: ContentCore } = require('../components/ContentCoreModule/ContentCoreModule');

		const g = ContentCore({
			contentCore,
			pubsub,
			setLazy: Lazy.setLazy,
		});

		setTimeout(() => {
			g.init();
		}, 0); // To give breadCrumb time to init first
	}, 'contentCore');
}

const helpfulContent = document.querySelector('.js-helpfulContent');
if (helpfulContent) {
	require.ensure([], require => {
		const { default: HelpfulContent } = require('../components/HelpfulContentModule/HelpfulContentModule');

		const g = HelpfulContent({
			helpfulContent,
		});

		g.init();
	}, 'helpfulContent');
}

const asideLinks = document.querySelector('.js-asideLinks');
if (asideLinks) {
	require.ensure([], require => {
		const { default: AsideLinks } = require('../components/AsideLinksModule/AsideLinksModule');

		const g = AsideLinks({
			asideLinks,
		});

		g.init();
	}, 'asideLinks');
}

const stepTracker = document.querySelector('.js-tracker');
if (stepTracker) {
	require.ensure([], require => {
		const { default: Tracker } = require('../components/StepTrackModule/StepTrackModule');

		const g = Tracker({
			tracker: stepTracker,
			pubsub,
		});

		g.init();
	}, 'stepTracker');
}

const postcodeLookup = document.querySelector('.js-postcode-lookup');
if (postcodeLookup) {
	require.ensure([], require => {
		const { default: PostcodeLookup } = require('../components/PostcodeLookup/PostcodeLookupModule');

		const g = PostcodeLookup({
			postcodeLookup,
		});

		g.init();
	}, 'postcodeLookup');
}

const donation = document.querySelector('.js-donation');
if (donation) {
	require.ensure(['PopupModule/PopupModule.hbs', 'element-closest', 'imask'], require => {
		const { default: Donation } = require('../components/DonationModule/DonationModule');
		const { default: StripeElements } = require('../common/StripeElements');

		const stripeElements = StripeElements({
			form: donation.querySelector('.js-stripeElements-form'),
		});
		const g = Donation({
			donation,
			pubsub,
			stripeElements,
		});

		stripeElements.init();
		g.init();
	}, 'donation');
}

const giftaid = document.querySelector('.js-giftaid');
if (giftaid) {
	require.ensure(['element-closest'], require => {
		const { default: Giftaid } = require('../components/GiftAidTransitionModule/GiftAidTransitionModule');

		const g = Giftaid({
			giftaid,
		});

		g.init();
	}, 'giftaid');
}

const fundraising = document.querySelector('.js-fundraising');
if (fundraising) {
	require.ensure([], require => {
		const { default: Fundraising } = require('../common/Fundraising/Fundraising');

		const g = Fundraising({
			fundraising,
		});

		g.init();
	}, 'fundraising');
}

const thankyou = document.querySelector('.js-thankyou');
if (thankyou) {
	require.ensure([], require => {
		const { default: Thankyou } = require('../components/ThankyouModule/ThankyouModule');

		const g = Thankyou({
			thankyou,
		});

		g.init();
	}, 'thankyou');
}

const opportunityFinder = document.querySelector('.js-opportunity-finder');
if (opportunityFinder) {
	require.ensure(['PageItemModule/PageItemModule.hbs', 'form-serialize'], require => {
		const { default: OpportunityFinder } = require('../components/OpportunityFinderModule/OpportunityFinderModule');

		const g = OpportunityFinder({
			opportunityFinder,
			setLazy: Lazy.setLazy,
		});

		g.init();
	}, 'opportunityFinder');
}

const shopFinder = document.querySelector('.js-shop-finder');
if (shopFinder) {
	require.ensure([], require => {
		const { default: ShopFinder } = require('../components/ShopFinderModule/ShopFinderModule');

		const g = ShopFinder({
			shopFinder,
			setLazy: Lazy.setLazy,
		});

		g.init();
	}, 'shopFinder');
}

const jobListing = document.querySelector('.js-jobs-listing');
if (jobListing) {
	require.ensure(['PopupModule/PopupModule.hbs', 'PageItemModule/PageItemModule.hbs', 'form-serialize'], require => {
		const { default: JobListing } = require('../components/JobListingModule/JobListingModule');

		const g = JobListing({
			jobListing,
			setLazy: Lazy.setLazy,
		});

		g.init();
	}, 'jobListing');
}

const search = document.querySelector('.js-search');
if (search) {
	require.ensure([], require => {
		const { default: Search } = require('../components/SearchModule/SearchModule');

		const g = Search({
			search,
		});

		g.init();
	}, 'search');
}

const searchPage = document.querySelector('.js-search-page');
if (searchPage) {
	require.ensure([], require => {
		const { default: SearchPage } = require('../components/SearchPageModule/SearchPageModule');

		const g = SearchPage({
			searchPage,
			setLazy: Lazy.setLazy,
		});

		g.init();
	}, 'search-page');
}

const genericPayment = document.querySelector('.js-generic-payment');
if (genericPayment) {
	require.ensure(['PopupModule/PopupModule.hbs', 'element-closest'], require => {
		const { default: GenericPayment } = require('../components/GenericPayment/GenericPayment');
		const { default: StripeElements } = require('../common/StripeElements');

		const stripeElements = StripeElements({
			form: genericPayment,
		});
		const g = GenericPayment({
			genericPayment,
			stripeElements,
		});

		stripeElements.init();
		g.init();
	}, 'generic-payment');
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

const revealingForms = document.querySelectorAll('.js-revealing-form');
if (revealingForms.length > 0) {
	require.ensure([], require => {
		const { default: RevealingForm } = require('../common/RevealingFormModule');

		[].forEach.call(revealingForms, revealingForm => {
			const g = RevealingForm({
				revealingForm,
			});

			g.init();
		});
	}, 'revealingForm');
}

const genericForm = document.querySelector('.js-generic-form');
if (genericForm) {
	require.ensure([], require => {
		const { default: GenericForm } = require('../common/GenericFormModule');

		const g = GenericForm({
			genericForm,
		});

		g.init();
	}, 'genericForm');
}

const tableContainers = document.querySelectorAll('.js-table-container');
if (tableContainers.length > 0) {
	require.ensure([], require => {
		const { default: TableContainer } = require('../components/TableContainerModule/TableContainerModule');
		[].forEach.call(tableContainers, tableContainer => {
			const g = TableContainer({
				tableContainer,
			});

			g.init();
		});
	}, 'tableContainer');
}

const adviserFeedback = document.querySelector('.js-adviser-form');
if (adviserFeedback) {
	require.ensure([], require => {
		const { default: AdviserFeedback } = require('../components/AdviserFeedbackModule/AdviserFeedbackModule');

		const g = AdviserFeedback({
			adviserFeedback,
		});

		g.init();
	}, 'advisorFeedback');
}
