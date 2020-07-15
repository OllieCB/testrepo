require('element-remove');

export default (function BreadCrumb(spec) {
	const { breadCrumb, pubsub } = spec;

	const state = {
		current: [],
	};

	const rm = () => {
		breadCrumb.querySelector('li:last-of-type').remove();

		const currentLast = breadCrumb.querySelector('li:last-of-type');
		currentLast.innerHTML = currentLast.querySelector('a').innerHTML;
	};

	const mv = path => {
		const li = breadCrumb.querySelector('li:last-of-type');
		if (path.length > 0) {
			li.innerHTML = path[path.length - 1].title;
		}
	};

	const add = path => {
		const li = breadCrumb.querySelector('li').cloneNode(true);

		const prev = li.cloneNode(true);
		const prevA = prev.querySelector('a');

		prevA.innerHTML = breadCrumb.querySelector('li:last-of-type').innerHTML;
		prevA.href = path.length === 1
			? `/${window.location.pathname.split('/').filter(s => s !== '')[0]}`
			: path[0].url;

		breadCrumb.querySelector('li:last-of-type').remove();
		breadCrumb.appendChild(prev);

		li.innerHTML = path[path.length - 1].title;
		breadCrumb.appendChild(li);
	};

	const init = () => {
		pubsub.on('initBreadcrumb', paths => {
			state.current = paths;
		});

		pubsub.on('urlchange', path => {
			if (state.current !== path) {
				if (state.current.length > path.length) {
					if (path[0].title === state.current[0].title) {
						rm(path);
					} else {
						rm(path);
						mv(path);
					}
				} else if (state.current.length < path.length) {
					add(path);
				} else {
					mv(path);
				}
			}

			state.current = path;
		});
	};

	return Object.freeze({
		init,
	});
});
