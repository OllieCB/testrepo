import uuid from 'uuid/v1';

export default {
	id: `gallery-${uuid()}`,
	handlesIcon: require('images/arrow.svg'),
	images: [
		{
			placeholder: require('images/transparent1px.png'),
			smallUrl: require('media/gallery1.jpg'),
			mediumUrl: require('media/gallery1.jpg'),
			url: require('media/gallery1.jpg'),
			alt: 'gallery 1 alt',
			caption: 'gallery 1 caption',
			id: 'gId1'
		},
		{
			placeholder: require('images/transparent1px.png'),
			smallUrl: require('media/gallery2.jpg'),
			mediumUrl: require('media/gallery2.jpg'),
			url: require('media/gallery2.jpg'),
			alt: 'gallery 2 alt',
			caption: 'gallery 2 caption',
			id: 'gId2'
		},
		{
			placeholder: require('images/transparent1px.png'),
			smallUrl: require('media/gallery3.jpg'),
			mediumUrl: require('media/gallery3.jpg'),
			url: require('media/gallery3.jpg'),
			alt: 'gallery 3 alt',
			caption: 'gallery 3 caption',
			id: 'gId3'
		},
	]
};
