export default (function Thankyou({ thankyou }) {
	const init = () => {
		window.dataLayer = window.dataLayer || [];

		window.dataLayer.push({
			event: 'donation-ecommerce-tracking',
			transactionId: thankyou.dataset.id,
			transactionTotal: Number(thankyou.dataset.amount),
			transactionProducts: [{
				id: thankyou.dataset.id,
				name: thankyou.dataset.name,
				sku: thankyou.dataset.sku,
				category: thankyou.dataset.category,
				price: Number(thankyou.dataset.amount),
				quantity: 1,
			}],
		});
	};

	return Object.freeze({
		init,
	});
});
