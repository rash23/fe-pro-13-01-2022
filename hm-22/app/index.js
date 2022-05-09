class ClockAlarm {
	interval;
	constructor(clock, sound) {
		this.clock = clock;
		this.sound = sound;
		this.tableTime = this.clock.querySelector('#time');
		this.hours = this.clock.querySelector('#hours');
		this.minutes = this.clock.querySelector('#minutes');
		this.seconds = this.clock.querySelector('#seconds');
		this.set = this.clock.querySelector('#set');
		this.clear = this.clock.querySelector('#clear');
		this.out = this.clock.querySelector('#out');
		this.repeat = this.clock.querySelector('#repeat');

		this.play();
		this.displayTime();
		this.addMenu();
	}

	play() {
		this.set.addEventListener('click', () => {
			this.setAlarm();
		});

		this.clear.addEventListener('click', () => this.clearAlarm());
		this.song = this.buildAudio(this.sound);
	}

	displayTime() {
		let now = new Date();
		let time = now.toLocaleTimeString();
		this.tableTime.innerHTML = time;

		setTimeout(() => this.displayTime(), 1000);
	}

	creteMenu(item, num) {
		let select = item;
		let hours = num;

		for (let i = 0; i <= hours; i++) {
			select.options[select.options.length] = new Option(i < 10 ? '0' + i : i, i);
		}
	}

	addMenu() {
		this.creteMenu(this.hours, 23);
		this.creteMenu(this.minutes, 59);
		this.creteMenu(this.seconds, 59);
	}

	addZero(i) {
		if (i < 10) {
			i = '0' + i;
		}
		return i;
	}

	setAlarm() {
		let hour = this.hours;
		let min = this.minutes;
		let sec = this.seconds;

		let selectedHour = hour.options[hour.selectedIndex];
		let selectedMin = min.options[min.selectedIndex];
		let selectedSec = sec.options[sec.selectedIndex];

		let alarmTime = this.addZero(selectedHour.value) + ':' + this.addZero(selectedMin.value) + ':' + this.addZero(selectedSec.value);

		this.hours.disabled = true;
		this.minutes.disabled = true;
		this.seconds.disabled = true;

		this.interval = setInterval(() => {
			if (this.tableTime.textContent === alarmTime) {
				this.out.innerHTML = 'Wake up';
				this.song.play();
				clearInterval(this.interval);
			}

			if (this.tableTime.textContent === alarmTime && this.repeat.checked) {
				this.out.innerHTML = 'Wake up';
				this.song.play();
			}
		}, 1000);
	}
	clearAlarm() {
		this.hours.disabled = false;
		this.minutes.disabled = false;
		this.seconds.disabled = false;

		this.out.innerHTML = '';

		clearInterval(this.interval);
	}

	buildAudio(song) {
		let myAudio = document.createElement('audio');
		myAudio.src = song;

		return myAudio;
	}
}

let sound = 'https://www.freespecialeffects.co.uk/soundfx/music/fanfare6.wav';

const clockAlarm = new ClockAlarm(document.querySelector('#clock'), sound);
