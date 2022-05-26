// симулятор ошибок

const getRandomInt = (min, max) => {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
};

const randomizeError = () => {
	const random = getRandomInt(1, 100);

	if (random > 90) {
		return new Error('Bad Request');
	}

	return null;
};

// симулятор запроса в БД в таблицу юзеров.
const getUsers = (callback) => {
	const USERS = [
		{ id: 1, name: 'Bob' },
		{ id: 2, name: 'Andy' },
		{ id: 3, name: 'John' },
	];

	setTimeout(() => {
		callback(randomizeError(), USERS);
	}, 2000);
};

// симулятор запроса в таблицу продуктов.

const getProducts = (callback) => {
	const PRODUCTS = [
		{ id: 1, name: 'iPad' },
		{ id: 2, name: 'Google Pixel' },
		{ id: 3, name: 'War and Peace' },
		{ id: 4, name: 'iPad' },
		{ id: 5, name: 'Kaizen' },
		{ id: 6, name: 'Sherlock Holmes' },
	];

	setTimeout(() => {
		callback(randomizeError(), PRODUCTS);
	}, 2000);
};

// симулятор запроса в таблицу заказов.
const getOrders = (callback) => {
	const ORDERS = [
		{ id: 1, userId: 1, checkout: [1, 6] },
		{ id: 2, userId: 1, checkout: [3] },
		{ id: 3, userId: 2, checkout: [2, 4] },
	];

	setTimeout(() => {
		callback(randomizeError(), ORDERS);
	}, 2000);
};
// callback

const getCheckoutsForUser = (userId) => {
	getUsers((error, users) => {
		try {
			if (!error) {
				const user = users.find((user) => user.id === userId);
				console.log(user);
				getOrders((error, orders) => {
					if (!error) {
						const order = orders.filter((order) => order.userId === userId);

						console.log(order);

						getProducts((error, products) => {
							if (!error) {
								let product = order.map((e) => ({
									...e,
									checkout: e.checkout.map((c) =>
										products.find((k) => k.id === c)
									),
								}));

								console.log(product);

								user.orders = product;
								console.log(user);

								if (!product) {
									throw new 'Product Not Found'();
								}
							} else {
								throw error;
							}
						});
						if (!order) {
							throw new 'Order Not Found'();
						}
					} else {
						throw error;
					}
				});
				if (!user) {
					throw new 'User Not Found'();
				}
			} else {
				throw error;
			}
		} catch (error) {
			console.error(error);
		}
	});
};
getCheckoutsForUser(1);
