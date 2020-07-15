require('symbol-es6');
const YoutubePlayer = require('youtube-player');

export default (function HeroVideo(spec) {
	const { hero, id } = spec;

	const toggleExpand = () => {
		hero.classList.toggle('playing');
	};

	const play = () => {
		const player = YoutubePlayer(hero.querySelector('.js-video-container'), {
			height: '100%',
			width: '100%',
			videoId: id,
			playerVars: {
				autoplay: 1,
				controls: 1,
				rel: 0,
				fs: 0,
			},
		});

		player.on('ready', player.playVideo);
		toggleExpand();
	};

	const pause = () => {
		toggleExpand();
	};

	const init = () => {
		hero.querySelector('.js-player-handle').addEventListener('click', play);
	};

	return Object.freeze({
		init,
		play,
		pause,
	});
});
