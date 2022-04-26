class Minesweeper {
	countDisarmed;
	countBombs;
	countAttempts;

	bombsInfo;
	disarmedInfo;
	attemptsInfo;

	field;
	restart;
	temp;

	constructor(table) {
		this.table = table;

		this.beginBtn = this.startBtn();
		this.difficulty = this.difficultyLvl(1, 2, 3);

		this.table.append(this.beginBtn, this.difficulty);

		this.beginBtn.addEventListener('click', () => {
			this.startGame();
			this.beginBtn.style.display = 'none';
			this.difficulty.style.display = 'none';
		});

		this.field = this.renderField();
		this.messageInfo = this.message();
		this.restart = this.button();

		this.restart.addEventListener('click', () => {
			this.startGame();
			this.messageInfo.style.display = 'none';
		});
	}

	startBtn() {
		let start = document.createElement('button');
		start.innerHTML = 'Start a game';

		return start;
	}

	difficultyLvl(a, b, c) {
		let level = {
			easy: c,
			middle: b,
			hard: a,
		};

		let selectList = document.createElement('select');

		let option;
		for (const key in level) {
			if (Object.hasOwnProperty.call(level, key)) {
				option = document.createElement('option');
				option.value = level[key];
				option.text = key;
				selectList.appendChild(option);
			}
		}
		return selectList;
	}

	startGame() {
		this.countAttempts = this.difficulty.value;

		console.log(this.countAttempts);

		this.countDisarmed = 0;

		this.render();
		this.fields = this.table.querySelectorAll('.field div');

		this.countBombs = this.random(4, 8);

		this.temp = this.countBombs;

		this.addBombs();
		this.bombsInfo = this.infoBombs();
		this.bombsInfo.innerHTML = `Bombs: ${this.countBombs}`;

		this.disarmedInfo = this.infoDisarmed();
		this.disarmedInfo.innerHTML = `Disarmed: ${this.countDisarmed}`;

		this.attemptsInfo = this.infoDisarmed();
		this.attemptsInfo.innerHTML = `Attempts: ${this.countAttempts}`;

		this.table.append(this.bombsInfo, this.disarmedInfo, this.attemptsInfo);

		this.listen();
	}

	mark = ({ target }) => {
		if (target.dataset.type === '0') {
			this.disarmedInfo.innerHTML = `Disarmed: ${++this.countDisarmed}`;
			target.dataset.type = '2';
		}

		if (target.dataset.type === '1') {
			target.dataset.type = '3';
			this.bombsInfo.innerHTML = `Bombs: ${--this.countBombs}`;
			this.attemptsInfo.innerHTML = `Attempts: ${--this.countAttempts}`;
		}

		if (this.countAttempts === 0) {
			this.messageInfo.style.display = 'block';

			this.messageInfo.classList.add('message--failed');
			this.messageInfo.innerHTML = 'Game Over!';

			this.table.append(this.messageInfo, this.restart);

			document.querySelector('.field').remove();
		}

		let disarmed = 25 - this.temp;

		if (disarmed === this.countDisarmed) {
			this.messageInfo.style.display = 'block';

			this.messageInfo.classList.add('message--success');
			this.messageInfo.innerHTML = 'You win!!!';

			this.table.append(this.messageInfo, this.restart);
			document.querySelector('.field').remove();
		}
	};

	renderField() {
		const element = document.createElement('div');

		element.classList.add('field');

		return element;
	}

	renderCell() {
		const element = document.createElement('div');

		element.dataset.type = 0;
		element.classList.add('field__item');
		return element;
	}

	listen() {
		this.table.addEventListener('click', this.mark);
	}

	render() {
		const rows = [];
		const row = this.renderField();

		for (let x = 0; x < 25; x++) {
			const cell = this.renderCell(x);

			row.append(cell);
		}

		rows.push(row);
		const table = this.table.cloneNode();

		table.append(...rows);
		this.table.replaceWith(table);
		this.table = table;
	}

	random(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);

		return Math.floor(Math.random() * (max - min + 1) + min);
	}

	addBombs() {
		let arr = Array.from(this.fields);
		let tempArr = [];

		let rand;
		let randLenght = this.countBombs;

		while (tempArr.length !== randLenght) {
			rand = this.random(0, 24);

			if (!tempArr.includes(rand)) tempArr.push(rand);
		}

		for (let index = 0; index < tempArr.length; index++) {
			const element = tempArr[index];
			arr[element].dataset.type = 1;
		}
	}

	infoDisarmed() {
		let disarmed = document.createElement('p');
		disarmed.classList.add('info');
		disarmed.classList.add('disarmed');

		return disarmed;
	}

	infoBombs() {
		let bombs = document.createElement('p');
		bombs.classList.add('info');
		bombs.classList.add('bombs');

		return bombs;
	}

	attempts() {
		let attempts = document.createElement('p');
		attempts.classList.add('info');
		attempts.classList.add('attempts');

		return attempts;
	}

	message() {
		let message = document.createElement('p');
		message.classList.add('message');

		return message;
	}

	button() {
		let restart = document.createElement('button');
		restart.innerHTML = 'Restart a game';

		return restart;
	}
}

const minesweeper = new Minesweeper(document.querySelector('#root'));

console.log(minesweeper);
