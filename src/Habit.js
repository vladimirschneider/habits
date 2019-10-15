export default class Habit {
  constructor({title, amountInPeriod, amountInPeriodInDays, color = 'tomato'}) {
    this.title = title;
    this.amountInPeriod = +amountInPeriod;
    this.amountInPeriodInDays = +amountInPeriodInDays;

    this.completed = 0;

    const habit = document.createElement('div');
    habit.classList.add('habits__item');
    habit.classList.add('habit');
    habit.style.backgroundColor = color;
    this.habit = habit

    const habitInfo = document.createElement('div');
    habitInfo.classList.add('habit__info');

    const habitTitle = document.createElement('p');
    habitTitle.classList.add('habit__title');
    habitTitle.innerHTML = title;

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

    habit.appendChild(habitInfo);

    const habitControls = document.createElement('div');
    habitControls.classList.add('habit__controls');

    const habitBtnsQuality = document.createElement('div');
    habitBtnsQuality.classList.add('habit__btns');

    const habitBtnLess = document.createElement('button');
    habitBtnLess.classList.add('habit__btn');
    habitBtnLess.classList.add('habit__btn--less');
    habitBtnLess.innerHTML = 'less';
    this.habitBtnLess = habitBtnLess;

    if (this.completed === 0) {
      habitBtnLess.disabled = true;
    }

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

    habitRemove.addEventListener('click', () => this.habit.remove());

    habitBtnsBottom.appendChild(habitRemove);

    habitControls.appendChild(habitBtnsBottom);

    habit.appendChild(habitControls);
  }

  updateCompleted() {
    if (this.completed === 0) {
      this.habitBtnLess.disabled = true;
    } else {
      this.habitBtnLess.disabled = false;
    }

    if (this.completed === this.amountInPeriod) {
      this.habit.classList.add('habit--completed');
    }

    this.habitCompleted.innerHTML = `${this.completed} of ${this.amountInPeriod}`;
  }
};