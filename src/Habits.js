import Habit from './Habit';

export default class Habits {
  constructor() {
    this.habits = [];
    this.habitsContainer = document.querySelector('.habits');
  }

  createHabit({title, amountInPeriod, amountInPeriodInDays, color}) {
    let current = false;

    if (title && amountInPeriod && amountInPeriodInDays) {
      if (amountInPeriod > 0) {
        const CHabit = new Habit({
          title,
          amountInPeriod,
          amountInPeriodInDays,
          color,
        });

        const pretext = this.habitsContainer.querySelector('.habits__pretext');

        if (pretext) {
          pretext.remove();
        }

        this.habitsContainer.insertBefore(CHabit.habit, this.habitsContainer.firstChild);

        current = true;
      }
    }

    return {
      current
    };
  }
};