import Storage from './Storage';

export default class Habit {
  constructor({...habitData}) {
    this.habitData = habitData;
    this.title = habitData.title;
    this.amountInPeriod = habitData.amountInPeriod;
    this.amountInPeriodInDays = habitData.amountInPeriodInDays;
    this.color = habitData.color;
    this.fromStorage = habitData.fromStorage;

    this.completed = this.fromStorage ? this.habitData.completed : 0;

    const habit = document.createElement('div');
    this.habit = habit;

    this.storage = new Storage();

    this.storage.setStores();

    this.habitsStorage = this.storage.getHabitsDB().habits;

    this.create();
  }

  create() {
    this.habit.classList.add('habits__item');
    this.habit.classList.add('habit');
    this.habit.style.backgroundColor = this.color;

    const habitInfo = document.createElement('div');
    habitInfo.classList.add('habit__info');

    const habitTitle = document.createElement('p');
    habitTitle.classList.add('habit__title');
    habitTitle.innerHTML = this.title;

    const habitQuality = document.createElement('p');
    habitQuality.classList.add('habit__quality');
    habitQuality.innerHTML = `${this.amountInPeriod} times in ${this.amountInPeriodInDays === 7 ? 'week' : `${this.amountInPeriodInDays} days`}`;

    const habitCompleted = document.createElement('p');
    habitCompleted.classList.add('habit__completed');
    habitCompleted.innerHTML = `${this.completed} of ${this.amountInPeriod}`;
    this.habitCompleted = habitCompleted;

    habitInfo.appendChild(habitTitle);
    habitInfo.appendChild(habitQuality);
    habitInfo.appendChild(habitCompleted);

    this.habit.appendChild(habitInfo);

    const habitControls = document.createElement('div');
    habitControls.classList.add('habit__controls');

    const habitBtnsQuality = document.createElement('div');
    habitBtnsQuality.classList.add('habit__btns');

    const habitBtnLess = document.createElement('button');
    habitBtnLess.classList.add('habit__btn');
    habitBtnLess.classList.add('habit__btn--less');
    habitBtnLess.innerHTML = 'less';
    this.habitBtnLess = habitBtnLess;

    habitBtnLess.addEventListener('click', () => {
      this.completed--;
      this.updateCompleted();
    });

    habitBtnsQuality.appendChild(habitBtnLess);

    const habitBtnLarge = document.createElement('button');
    habitBtnLarge.classList.add('habit__btn');
    habitBtnLarge.classList.add('habit__btn--large');
    habitBtnLarge.innerHTML = 'large';
    this.habitBtnLarge = habitBtnLarge;

    habitBtnLarge.addEventListener('click', () => {
      this.completed++;
      this.updateCompleted();
    });

    habitBtnsQuality.appendChild(habitBtnLarge);

    habitControls.appendChild(habitBtnsQuality);

    const habitBtnsBottom = document.createElement('div');
    habitBtnsBottom.classList.add('habit__btns');

    const habitRemove = document.createElement('button');
    habitRemove.classList.add('habit__remove');
    habitRemove.innerHTML = 'delete';

    habitRemove.addEventListener('click', () => this.remove());

    habitBtnsBottom.appendChild(habitRemove);

    habitControls.appendChild(habitBtnsBottom);

    this.habit.appendChild(habitControls);

    if (!this.fromStorage) {
      this.putToBD();
    }

    this.updatePeriod();
    this.update();
  }

  update() {
    if (this.completed === 0) {
      this.habitBtnLess.disabled = true;
    } else {
      this.habitBtnLess.disabled = false;
    }

    if (this.completed === this.amountInPeriod) {
      this.habitBtnLarge.disabled = true;
      this.habit.classList.add('habit--completed');
    } else {
      this.habitBtnLarge.disabled = false;
      this.habit.classList.remove('habit--completed');
    }
  }

  updateCompleted() {
    if (this.fromStorage) {
      this.habitsStorage.update(this.habitData, {
        completed: this.completed
      });
    }

    this.habitCompleted.innerHTML = `${this.completed} of ${this.amountInPeriod}`;

    this.update();
  }

  updatePeriod() {
    const startDate = new Date(this.habitData.startDate).getDate();
    const finishDate = startDate + this.amountInPeriodInDays;

    const today = new Date();
    today.setHours(0,0,0,0);

    if (today.getDate() >= finishDate) {
      this.habitsStorage.update(this.habitData, {
        startDate: today
      });

      this.completed = 0;
    }
  }

  putToBD() {
    const today = new Date();
    today.setHours(0,0,0,0);

    const writable = this.habitsStorage.put({
      title: this.title,
      amountInPeriod: this.amountInPeriod,
      amountInPeriodInDays: this.amountInPeriodInDays,
      color: this.color,
      completed: 0,
      startDate: today,
    });

    writable.then((key) => {
      this.fromStorage = true;
      this.habitData.id = key;
    })
  }

  remove() {
    if (this.fromStorage) {
      this.habit.remove();
      this.habitsStorage.delete(this.habitData.id);
    }
  }
};
