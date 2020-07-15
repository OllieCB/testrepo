import $ from 'jquery';
import 'slick-carousel';

export default (function WWMContentGridModule(spec) {
	const addSettings = grid => {
		if (grid.classList.contains('quotes')) {
			const slickSettings = {
				slidesToShow: 1,
				slidesToScroll: 1,
				centerMode: true,
				arrows: true,
				dots: false,
				centerPadding: '30px',
				accessibility: true,
				infinite: false,
				variableWidth: true,
				initialSlide: 1,
				prevArrow: '<button type="button" class="slick-prev"><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"viewBox="0 0 14 18" style="enable-background:new 0 0 14 18;" xml:space="preserve"><path class="st0" d="M13.9,6.4l-1.3-1.3c0,0-0.1,0-0.1,0c0,0-0.1,0-0.1,0L7,10.4L1.6,5.1C1.6,5,1.5,5,1.4,5.1L0.1,6.4 C0,6.4,0,6.5,0.1,6.6l6.8,6.8c0,0,0.1,0,0.1,0c0,0,0.1,0,0.1,0l6.8-6.8C13.9,6.5,13.9,6.4,13.9,6.4z"/></svg></button>',
				nextArrow: '<button type="button" class="slick-next"><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"viewBox="0 0 14 18" style="enable-background:new 0 0 14 18;" xml:space="preserve"><path class="st0" d="M13.9,6.4l-1.3-1.3c0,0-0.1,0-0.1,0c0,0-0.1,0-0.1,0L7,10.4L1.6,5.1C1.6,5,1.5,5,1.4,5.1L0.1,6.4 C0,6.4,0,6.5,0.1,6.6l6.8,6.8c0,0,0.1,0,0.1,0c0,0,0.1,0,0.1,0l6.8-6.8C13.9,6.5,13.9,6.4,13.9,6.4z"/></svg></button>',
				responsive: [
					{
						breakpoint: 768,
						settings: {
							arrows: false,
						},
					},
				],
			};

			$(grid.querySelectorAll('.slick-slider')).eq(0).slick(slickSettings);
		} else if ($(window).width() < 768) {
			const slickSettings = {
				slidesToShow: 1,
				slidesToScroll: 1,
				centerMode: true,
				arrows: false,
				dots: false,
				centerPadding: '30px',
				accessibility: true,
				infinite: false,
				responsive: [
					{
						breakpoint: '768px',
					},
				],
			};

			$(grid.querySelectorAll('.slick-slider')).eq(0).slick(slickSettings);
		}
	};

	const init = () => {
		addSettings(spec.grid);
	};

	return Object.freeze({
		init,
	});
});
