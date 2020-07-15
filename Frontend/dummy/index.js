const express = require('express'); // eslint-disable-line
const bodyParser = require('body-parser'); // eslint-disable-line
const stripe = require('stripe')('sk_test_02mBxizHzUMlBhJ8Lw02kcy8'); // eslint-disable-line
const request = require('request'); // eslint-disable-line

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
	console.log(req.method, req.originalUrl);

	next();
});

// Data
const moreStories = require('./data/stories/more.json');
const allStories = require('./data/stories/all.json');
const storiesStories = require('./data/stories/stories.json');
const campaignsStories = require('./data/stories/campaigns.json');
const newsStories = require('./data/stories/news.json');
const eventsResult = require('./data/events/withResults.json');
const eventsNoResult = require('./data/events/noResults.json');
const moreEvents = require('./data/events/more.json');
const coreFirst = require('./data/contentCore/first.json');
const coreSecond = require('./data/contentCore/second.json');
const opportunityResults = require('./data/opportunityFinder/withResults.json');
const opportunityNoResults = require('./data/opportunityFinder/noResults.json');
const opportunityMore = require('./data/opportunityFinder/more.json');
const shopResults = require('./data/shopFinder/withResults.json');
const shopNoResults = require('./data/shopFinder/noResults.json');
const shopMore = require('./data/shopFinder/more.json');
const searchPageResults = require('./data/searchPage/withResults.json');
const searchPageNoResults = require('./data/searchPage/noResults.json');
const searchPageMore = require('./data/searchPage/more.json');
const jobsResults = require('./data/jobs/withResults.json');
const jobsLocationError = require('./data/jobs/locationError.json');
const jobsMore = require('./data/jobs/more.json');
const jobBoardJobsMore = require('./data/jobboard/jobs/more.json');
const jobBoardJobsWithResults = require('./data/jobboard/jobs/withResults.json');
const jobBoardJobsNoResults = require('./data/jobboard/jobs/noResults.json');
const jobBoardJobsLocationError = require('./data/jobboard/jobs/locationError.json');

app.get('/stories', (req, res) => {
	if (parseInt(req.query.page, 10) === 0) {
		switch (req.query.filter) {
			case 'stories':
				res.json(storiesStories);
				break;
			case 'campaigns':
				res.json(campaignsStories);
				break;
			case 'news':
				res.json(newsStories);
				break;
			case '':
				res.json(allStories);
				break;
			default:
				res.json(allStories);
				break;
		}
	} else {
		res.json(moreStories);
	}
});

app.post('/events', (req, res) => {
	if (req.body.keyword === 'test') {
		res.json(eventsResult);
	} else {
		res.json(eventsNoResult);
	}
});

app.get('/events', (req, res) => {
	res.json(moreEvents);
});

app.get('/core/data', (req, res) => {
	res.json(coreFirst);
});

app.get('/core/links', (req, res) => {
	res.json(coreSecond);
});

app.post('/donation/confirm', (req, res) => {
	console.log(req.body);
	stripe.paymentIntents.confirm(req.body.paymentIntentId, {}, (err, paymentIntent) => {
		console.log('ERROR', err);
		console.log('PAYMENT_INTENT', paymentIntent);
		if (!err) {
			if (paymentIntent.status === 'succeeded') {
				res.json({
					success: true,
					url: `${req.body.return}?name=${req.body.token.card.name.split(' ')[0]}&email=${req.body.email}`,
				});
			}
		} else {
			res.json({
				success: false,
				popup: {
					title: '<img class="error" src="/imgs/error.svg" alt="" /> Error',
					message: err.message,
					button: 'Back to payment',
				},
			});
		}
	});
});

app.post('/donation/submit', (req, res) => {
	console.log(req.body);
	stripe.paymentIntents.create({
		amount: Math.round(Number(req.body.amount) * 100),
		currency: 'gbp',
		payment_method_data: {
				type: 'card',
				card: {
					token: `${req.body.token.id}`
				}
		},
		confirmation_method: 'manual',
		confirm: true,
		description: `Donation from ${req.body.email}`,
	}, (err, paymentIntent) => {
		console.log('ERROR', err);
		console.log('PAYMENT_INTENT', paymentIntent);

		if (!err) {
			if (paymentIntent.status === 'succeeded') {
				res.json({
					success: true,
					url: `${req.body.return}?name=${req.body.token.card.name.split(' ')[0]}&email=${req.body.email}`,
				});
			}
			else if (paymentIntent.status === 'requires_action' 
				&& paymentIntent.next_action.type === 'use_stripe_sdk') {
				res.json({
					requiresAction: true,
					clientSecret: paymentIntent.client_secret
				});
			}
			
		} else {
			res.json({
				success: false,
				popup: {
					title: '<img class="error" src="/imgs/error.svg" alt="" /> Error',
					message: err.message,
					button: 'Back to payment',
				},
			});
		}
	});
});


app.get('/giftaid', (req, res) => { // eslint-disable-line
	const tokenEndpoint = 'https://api.sandbox.paypal.com/v1/oauth2/token';
	const { tx } = req.query;
	const user = 'AWwHf2KCJeFfAczB-FK3cEbxjJhnDjcWwqRTaaMrNRVO5Wt6ZfOctcEtLt-HUra87j4irOI0pq2sGBrb:EGTKHbkz6DNglRNxqSNm0mHZV8mdWcbA34G3oneR4ymt9SNTPh5NknV70zXwPvGqpxzbK7PHJylzog90';
	const auth = Buffer.from(user).toString('base64');

	request.post({
		headers: {
			Authorization: `Basic ${auth}`,
			Accept: 'application/json',
			'Accept-Language': 'en_US',
		},
		url: tokenEndpoint,
		body: 'grant_type=client_credentials',
	}, (err, response, body) => { // eslint-disable-line
		request.post({
			url: 'https://www.sandbox.paypal.com/cgi-bin/webscr',
			form: {
				cmd: '_notify-synch',
				tx,
				at: 'V37YJcHVEa6dogvSh223emF4HhiY0PXUtrRpxN5VEGNCTFbvYv75bMms4Ly',
			},
		}, (e, r, b) => {
			const tmp = b
				.split('\n')
				.slice(1, -1)
				.filter(s => /payer_email|first_name|mc_gross/.test(s))
				.map(i => i.split('='));

			res.redirect(`/giftaid.html?${tmp[0][0]}=${tmp[0][1]}&${tmp[1][0]}=${tmp[1][1]}&${tmp[2][0]}=${tmp[2][1]}`);
		});
	});
});

app.post('/thankyou', (req, res) => { // eslint-disable-line
	res.redirect(`/thankyou.html?first_name=${req.body.first_name}&payer_email=${req.body.payer_email}`);
});

app.get('/opportunities', (req, res) => {
	res.json(opportunityMore);
});

app.post('/opportunities', (req, res) => {
	if (req.body.keyword === 'test') {
		res.json(opportunityResults);
	} else {
		res.json(opportunityNoResults);
	}
});

app.get('/shops', (req, res) => {
	res.json(shopMore);
});

app.post('/shops', (req, res) => {
	if (req.body.location === 'test') {
		res.json(shopResults);
	} else {
		res.json(shopNoResults);
	}
});

app.get('/searchPage', (req, res) => {
	res.json(searchPageMore);
});

app.post('/searchPage', (req, res) => {
	if (req.body.query === 'test') {
		res.json(searchPageResults);
	} else {
		res.json(searchPageNoResults);
	}
});

app.post('/genericPayment/submit', (req, res) => {
	console.log(req.body);
	stripe.paymentIntents.create({
		amount: 20 * 100,
		currency: 'gbp',
		payment_method_data: {
				type: 'card',
				card: {
					token: `${req.body.token.id}`
				}
		},
		confirmation_method: 'manual',
		confirm: true,
		description: `Event payment from ${req.body.email}`,
	}, (err, paymentIntent) => {
		console.log('ERROR', err);
		console.log('PAYMENT_INTENT', paymentIntent);

		if (!err) {
			if (paymentIntent.status === 'succeeded') {
				res.json({
					success: true,
					url: `${req.body.return}?name=${req.body.token.card.name.split(' ')[0]}&email=${req.body.email}`,
				});
			}
			else if (paymentIntent.status === 'requires_action' 
				&& paymentIntent.next_action.type === 'use_stripe_sdk') {
				res.json({
					requiresAction: true,
					clientSecret: paymentIntent.client_secret
				});
			}
			
		} else {
			res.json({
				success: false,
				popup: {
					title: '<img class="error" src="/imgs/error.svg" alt="" /> Error',
					message: err.message,
					button: 'Back to payment',
				},
			});
		}
	});
});

app.post('/genericPayment/confirm', (req, res) => {
	console.log(req.body);
	stripe.paymentIntents.confirm(req.body.paymentIntentId, {}, (err, paymentIntent) => {
		console.log('ERROR', err);
		console.log('PAYMENT_INTENT', paymentIntent);
		if (!err) {
			if (paymentIntent.status === 'succeeded') {
				res.json({
					success: true,
					url: `${req.body.return}?name=${req.body.token.card.name.split(' ')[0]}&email=${req.body.email}`,
				});
			}
		} else {
			res.json({
				success: false,
				popup: {
					title: '<img class="error" src="/imgs/error.svg" alt="" /> Error',
					message: err.message,
					button: 'Back to payment',
				},
			});
		}
	});
});

app.get('/postcodeLookup/search', (req, res) => {
	const baseUrl = 'https://api.addressy.com/Capture/Interactive';
	const endpoint = `${baseUrl}/Find/v1.00/json3.ws?Key=AM33-NB83-HM88-XX38&text=${req.query.text}`;
	request.get(endpoint, (err, response, body) => {
		const data = JSON.parse(body);
		const id = data.Items[0].Id;

		if (data.Items[0].Error) {
			res.send({
				failure: true,
			});
		} else if (data.Items.length === 1 && data.Items[0].Type === 'Address') {
			res.send(body);
		} else {
			request.get(`${endpoint}&container=${id}`, (e, r, b) => {
				res.send(b);
			});
		}
	});
});

app.get('/postcodeLookup/get', (req, res) => {
	const baseUrl = 'https://api.addressy.com/Capture/Interactive';
	const endpoint = `${baseUrl}/Retrieve/v1.00/json3.ws?Key=AM33-NB83-HM88-XX38&id=${req.query.id}`;

	request.get(endpoint, (e, r, b) => {
		res.send(b);
	});
});

app.get('/jobs', (req, res) => {
	res.json(jobsMore);
});

app.post('/jobs', (req, res) => {
	if (req.body.location === 'test') {
		res.json(jobsResults);
	} else {
		res.json(jobsLocationError);
	}
});

app.get('/reverseGeocode', (req, res) => {
	res.send('London');
	return;
	const baseUrl = 'https://api.addressy.com/Geocoding/International/ReverseGeocode/v2/';
	const endpoint = `${baseUrl}/json3.ws?Key=AM33-NB83-HM88-XX38&Latitude=${req.query.latitude}&Longitude=${req.query.longitude}`;

	request.get(endpoint, (e, r, b) => {
		const loc = JSON.parse(b).Items[0];
		res.send(`${loc.StreetName}, ${loc.PostalCode}, ${loc.City}`);
	});
});

app.get('/feedback/:value', (req, res) => {
	if (req.params.value === 'yes') {
		res.json({
			value: 'yes',
		});
	} else if (req.params.value === 'no') {
		res.json({
			value: 'no',
		});
	}
});

app.post('/feedback/adviser', (req, res) => {
	console.log(req.body);
	if (req.body.adviserFeedback !== 'test') {
		res.json({
			success: false,
			popup: {
				title: '<img class="error" src="/imgs/error.svg" alt="" /> Error',
				message: 'A network error message',
				button: 'Back to article',
			},
		});
	} else {
		res.json({
			success: true,
		});
	}
});

app.get('/jobboard/jobs', (req, res) => {
	console.log('more');
	res.json(jobBoardJobsMore);
});

app.post('/jobboard/jobs', (req, res) => {
	if (req.body.location === 'London') {
		console.log('results');
		res.json(jobBoardJobsWithResults);
	} else if (req.body.keyword === 'no') {
		res.json(jobBoardJobsNoResults);
	} else {
		console.log('filter results');
		res.json(jobBoardJobsLocationError);
	}
})

app.listen(5000, () => console.log('Dummy listening on port 5000'));
