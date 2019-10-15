import Storage from './Storage';
import Habit from './Habit';

export default class Habits {
  constructor() {
    this.habitsContainer = document.querySelector('.habits');

    this.fillHabitsFromClientDB();
  }

  createHabit({...habitsData}) {
    habitsData.amountInPeriod = parseInt(habitsData.amountInPeriod) || 0;
    habitsData.amountInPeriodInDays = parseInt(habitsData.amountInPeriodInDays) || 0;

    const resultValidation = this.validationHabitsData(habitsData);

    if (resultValidation) {
      const CHabit = new Habit(habitsData);

      this.insertHabit(CHabit.habit, this.habitsContainer.firstChild);

      return {
        status: true,
      };
    }

    return {
      status: false,
    };
  }

  insertHabit(habit, firstCHild) {
    this.habitsContainer.insertBefore(habit, firstCHild);
  }

  validationHabitsData(habitsData) {
    let resultValidation = true;

    if (habitsData.amountInPeriod <= 0) {
      resultValidation = false;
    }

    if (habitsData.amountInPeriodInDays <= 0) {
      resultValidation = false;
    }

    return resultValidation;
  }

  fillHabitsFromClientDB() {
    const storage = new Storage();

    storage.setStores();
    // storage.getHabitsDB().habits.clear();
    // storage.getHabitsDB().habits.delete();
    storage.getHabitsDB().habits.each((item) => {
      this.createHabit({
        id: item.id,
        ...item,
        fromStorage: true,
      });
    });
  }
};