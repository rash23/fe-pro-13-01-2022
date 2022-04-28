class DOMError extends Error {}

class BaseComponent {
	constructor(container, props = {}) {
		if (!(container instanceof HTMLElement)) {
			throw new DOMError('Container not found');
		}

		this.container = container;
		this.props = props;
	}

	isHTMLElement(elem) {
		return elem instanceof HTMLElement;
	}
}

class Accordion extends BaseComponent {
	constructor(...args) {
		super(...args);
		this.body = this.container;

		const acc = this.createNewAccordians(this.props);

		this.show(acc);
	}

	show(item) {
		let panel;
		for (let i = 0; i < item.length; i++) {
			if (item[i].nodeName === 'BUTTON') {
				item[i].addEventListener('click', function () {
					this.classList.toggle('active');
					panel = this.nextElementSibling;
					panel.style.display === 'block' ? (panel.style.display = 'none') : (panel.style.display = 'block');
				});
			}
		}
	}

	createBtn(inner = '') {
		let button = document.createElement('button');
		button.classList.add('accordion');
		button.innerHTML = inner;

		return button;
	}

	createPanel(inner = '') {
		let panel = document.createElement('div');
		panel.classList.add('panel');

		let paragraph = document.createElement('p');
		paragraph.innerHTML = inner;
		panel.append(paragraph);

		return panel;
	}

	createNewAccordians(arr) {
		let newArr = [];

		arr.forEach((element) => {
			newArr.push(this.createBtn(element.title), this.createPanel(element.body));
		});

		const body = this.body.cloneNode();
		body.append(...newArr);

		this.body.replaceWith(body);
		this.body = body;

		return newArr;
	}
}

const items = [
	{
		title: 'Accordion 1',
		body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took",
	},
	{
		title: 'Accordion 2',
		body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took",
	},
];

const accordions = new Accordion(document.querySelector('body'), items);

console.log(accordions);
