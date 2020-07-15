require('symbol-es6');
const YoutubePlayer = require('youtube-player');

export default (function HeroVideo(spec) {
	const { video, id } = spec;

	const toggleExpand = () => {
		video.classList.toggle('playing');
	};

	const play = () => {
		const player = YoutubePlayer(video.querySelector('.js-video-container'), {
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
		video.querySelector('.js-video-handle').addEventListener('click', play);
	};

	return Object.freeze({
		init,
		play,
		pause,
	});
});
