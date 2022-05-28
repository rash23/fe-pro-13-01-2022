let loader = document.querySelector('#loader');

export const showLoader = () => {
	loader.style.display = 'inline';
};

export const hideLoader = () => {
	loader.style.display = 'none';
};
