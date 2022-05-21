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
const getUsers = async (callback) => {
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
const getProducts = async (callback) => {
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
const getOrders = async (callback) => {
	const ORDERS = [
		{ id: 1, userId: 1, checkout: [1, 6] },
		{ id: 2, userId: 1, checkout: [3] },
		{ id: 3, userId: 2, checkout: [2, 4] },
	];

	setTimeout(() => {
		callback(randomizeError(), ORDERS);
	}, 2000);
};

const getCheckoutsForUserAsPromise = async (userId) => {
	try {
		let result;
		let order;
		await getUsers((error, users) => {
			if (error === null) {
				const user = users.find((user) => user.id === userId);

				result = user;
			}
		});

		await getOrders((error, orders) => {
			if (error === null) {
				order = orders.filter((order) => order.userId === userId);
			}
		});

		await getProducts((error, products) => {
			if (error === null) {
				let product = order.map((e) => ({
					...e,
					checkout: e.checkout.map((c) => products.find((k) => k.id === c)),
				}));

				result.orders = product;
			}

			console.log(result);
		});
	} catch (error) {
		console.error(error);
	}
};

getCheckoutsForUserAsPromise(1);

//ожидаемый результат
//   userId = 1; => {
//     id: 1,
//     name: "Bob",
//     orders: [
//       {
//         id: 1,
//         userId: 1,
//         checkout: [
//           { id: 1, name: "iPad" },
//           { id: 6, name: "Sherlock holmes" }
//         ],
//       },
//       {
//         id: 2,
//         userId: 1,
//         checkout: [
//           { id: 3, name: "War and Peace" }
//         ]
//       }
//     ]
//   }
