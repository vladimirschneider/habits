import Habit from './Habit';

export default class Habits {
  constructor() {
    this.habits = [];
    this.habitsContainer = document.querySelector('.habits');
  }

  createHabit({title, amountInPeriod, amountInPeriodInDays, color}) {
    let current = false;

    if (title && amountInPeriod && amountInPeriodInDays) {
      if (amountInPeriod > 0 && amountInPeriodInDays > 0) {
        const CHabit = new Habit({
          title,
          amountInPeriod,
          amountInPeriodInDays,
          color,
        });

        this.habitsContainer.insertBefore(CHabit.habit, this.habitsContainer.firstChild);

        current = true;
      }
    }

    return {
      current,
    };
  }
};