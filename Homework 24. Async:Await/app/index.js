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

const getUsers = () => {
	return new Promise((resolve, reject) => {
		const USERS = [
			{ id: 1, name: 'Bob' },
			{ id: 2, name: 'Andy' },
			{ id: 3, name: 'John' },
		];

		setTimeout(() => {
			const err = randomizeError();
			if (err === null) {
				resolve(USERS);
			} else {
				reject(err);
			}
		}, 2000);
	});
};

const getOrders = () => {
	return new Promise((resolve, reject) => {
		const ORDERS = [
			{ id: 1, userId: 1, checkout: [1, 6] },
			{ id: 2, userId: 1, checkout: [3] },
			{ id: 3, userId: 2, checkout: [2, 4] },
		];

		setTimeout(() => {
			const err = randomizeError();
			if (err === null) {
				resolve(ORDERS);
			} else {
				reject(err);
			}
		}, 2000);
	});
};

const getProducts = () => {
	return new Promise((resolve, reject) => {
		const PRODUCTS = [
			{ id: 1, name: 'iPad' },
			{ id: 2, name: 'Google Pixel' },
			{ id: 3, name: 'War and Peace' },
			{ id: 4, name: 'iPad' },
			{ id: 5, name: 'Kaizen' },
			{ id: 6, name: 'Sherlock Holmes' },
		];

		setTimeout(() => {
			const err = randomizeError();
			if (err === null) {
				resolve(PRODUCTS);
			} else {
				reject(err);
			}
		}, 2000);
	});
};

const getCheckoutsForUserAsPromise = async (userId) => {
	let order;
	let result;
	try {
		const users = await getUsers();
		const user = users.find((user) => user.id === userId);

		console.log(user);
		result = user;

		const orders = await getOrders();
		order = orders.filter((order) => order.userId === userId);

		console.log(order);

		const products = await getProducts();
		let product = order.map((e) => ({
			...e,
			checkout: e.checkout.map((c) => products.find((k) => k.id === c)),
		}));

		console.log(product);
		result.orders = product;

		console.log(result);
	} catch (error) {
		console.error(error);
	}
};

getCheckoutsForUserAsPromise(1);

//?????????????????? ??????????????????
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
