import Habit from './Habit';

export default class Habits {
  constructor() {
    this.habits = [];
    this.habitsContainer = document.querySelector('.habits');
  }

  createHabit({title, quality, qualityInDay, color}) {
    let current = false;

    if (title && quality && qualityInDay) {
      if (quality > 0) {
        const CHabit = new Habit({
          title,
          quality,
          qualityInDay,
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