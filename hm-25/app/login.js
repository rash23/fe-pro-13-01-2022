const usersTable = {
	'example@example.com': {
		firstName: 'John',
		lastName: 'Doe',
		email: 'example@example.com',
		password: 'super_secret',
	},
	'demo@demo.com': {
		firstName: 'Demo',
		lastName: 'User',
		email: 'demo@demo.com',
		password: 'super_secret',
	},
};

const form = document.forms.authorization;

const { email, password, remember, login } = form;

login.addEventListener('submit', (e) => {
	e.preventDefault();
	if (checkMember() && remember.checked) {
		document.cookie = `USER_AUTH=${email.value};max-age=1000000;`;
		document.location.href = './pages/todo.html';
	}
});

const validateEmail = (email) => {
	return /\S+@\S+\.\S+/.test(email);
};
const validatePass = (pass) => {
	return pass.length >= 6;
};

const checkValidation = () => {
	let isValid = true;
	if (!validateEmail(email.value)) {
		email.nextElementSibling.textContent = 'email not valid';
		isValid = false;
	}
	if (!validatePass(password.value)) {
		pass.nextElementSibling.textContent = 'pass must be >= 6';
		isValid = false;
	}
	return isValid;
};

const checkMember = () => {
	let alertMail = document.querySelector("[role='alert-mail']");
	let alertPass = document.querySelector("[role='alert-pass']");

	let isValid = true;
	if (checkValidation()) {
		if (usersTable.hasOwnProperty(email.value)) {
			if (usersTable[email.value].password === password.value) {
			} else {
				isValid = false;
				alertPass.innerHTML = 'wrong password';
			}
		} else {
			isValid = false;
			alertMail.innerHTML = 'User is not found';
		}
	}
	return isValid;
};
