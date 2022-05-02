const Former = (form, { onSubmit, validators } = {}) => {
	// Заменяем стандартные ошибки.
	const ERRORS = {
		valueMissing: 'Field must have a value',
		typeMismatch: 'Value must be valid',
	};

	const mapErrorMessage = (element) => {
		const validity = element.validity;

		// Если кастомная ошибка, вернуть ее значение
		if (validity.customError) {
			return element.validationMessage;
		}

		// Если в объекте validity ключ по которому значение равно true
		// совпадает с ключом в объекте ERRORS
		// значит есть ошибка на замену
		const errorMessage = Object.keys(ERRORS)
			.filter((validityKey) => validity[validityKey])
			.map((errorKey) => ERRORS[errorKey])
			.join();

		// иначе возвращаем стандартную ошибку браузера.
		return errorMessage || element.validationMessage;
	};

	const findAlert = (element, callback) => {
		const alert = element.nextElementSibling;

		if (alert) {
			callback(alert);
		}
	};

	const serialize = () => {
		const formData = new FormData(form);

		return Array.from(formData.keys()).reduce((values, key) => {
			return {
				...values,
				[key]: formData.get(key),
			};
		}, {});
	};

	const validateByCallback = (element) => {
		const validate = validators[element.name];

		const message = validate(element.value, serialize());

		if (!message) {
			return;
		}

		element.setCustomValidity(message);
	};

	const validateByBrowser = (element) => {
		if (element.checkValidity()) {
			return;
		}

		const error = validators[element.name];

		element.setCustomValidity(error);
	};

	const validateOnSubmit = () => {
		const candidatesToValidate = Object.keys(validators).reduce((candidates, key) => [...candidates, form[key]], []);

		for (const element of candidatesToValidate) {
			const error = validators[element.name];

			if (typeof error === 'function') {
				validateByCallback(element);
			}

			if (typeof error === 'string') {
				validateByBrowser(element);
			}
		}
	};

	form.addEventListener('submit', (event) => {
		validateOnSubmit();

		if (form.reportValidity()) {
			onSubmit(serialize());
		}

		event.preventDefault();
	});

	form.addEventListener('input', (event) => {
		const element = event.target;

		if (element.validity.customError) {
			element.setCustomValidity('');
		}

		findAlert(element, (alert) => {
			if (alert.hidden) {
				return;
			}

			alert.textContent = '';
			alert.hidden = true;
		});
	});

	const candidatesToValidate = Array.from(form.elements).filter((element) => element.willValidate);

	for (const element of candidatesToValidate) {
		element.addEventListener('invalid', (event) => {
			event.preventDefault();

			const element = event.target;

			findAlert(element, (alert) => {
				alert.textContent = mapErrorMessage(element);
				alert.hidden = false;
			});
		});
	}
};

// value -> текущее значение value инпута
// formValues -> объект со значениями всей формы.

// true - ошибка
// false - ошибки нет
const validators = {
	fullName: (value, formValues) => {
		return value && value === formValues.email && 'Your name must not be the same as email';
	},
	email: 'Your email must be real',
	consent: 'You must agree with our rules',
};

const onSubmit = (state) => {
	console.log(state);
};

Former(document.forms.quiz, {
	onSubmit,
	validators,
});
