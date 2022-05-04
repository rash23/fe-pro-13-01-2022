const Former = (form, { onSubmit, validators } = {}) => {
	const ERRORS = {
		valueMissing: 'Field must have a value',
		typeMismatch: 'Value must be valid',
		tooShort: 'Too short (min - 9 symbols, max - 24 symbols)',
		tooLong: 'Too long',
	};

	const mapErrorMessage = (element) => {
		const validity = element.validity;

		if (validity.customError) {
			return element.validationMessage;
		}

		const errorMessage = Object.keys(ERRORS)
			.filter((validityKey) => validity[validityKey])
			.map((errorKey) => ERRORS[errorKey])
			.join();

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
	const validateByBrowser = (element) => {
		if (element.checkValidity()) {
			return;
		}

		const error = validators[element.name];

		element.setCustomValidity(error);
	};

	const validateByCallback = (element) => {
		const validate = validators[element.name];

		const message = validate(element.value, serialize());

		if (!message) {
			return;
		}

		element.setCustomValidity(message);
	};

	const validateOnSubmit = () => {
		const passwordsToValidate = Object.keys(validators).reduce((passwords, key) => [...passwords, form[key]], []);

		for (const element of passwordsToValidate) {
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
			onSubmit(serialize(form));
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

const validators = {
	password: (value, formValues) => {
		return value && value === formValues.email && 'Your password must not be the same as email';
	},

	passwordConfirm: (value, formValues) => {
		return value && value !== formValues.password && 'Please repeat password';
	},

	email: 'Your email must be real',
	consent: 'You must agree with our rules',
};

Former(document.forms.authorization, {
	onSubmit: (state) => {
		document.querySelector('output').innerHTML = `
		{<br>
		    email: ${state.email} <br>
			password: ${state.password} <br>
		}`;
	},
	validators,
});
