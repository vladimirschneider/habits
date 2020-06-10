import Form from './Form';
import HabitsFormUI from './HabitsFormUI';
import Habits from './Habits';

export default class App {
  constructor() {
    const habits = new Habits();

    const habitsFormElement = document.querySelector('.habits-form');

    const HabitsForm = new Form(habitsFormElement);

    new HabitsFormUI(habitsFormElement);

    HabitsForm.on('sent', ({status, data}) => {
      if (status) {
        const habit = habits.createHabit(data);

        if (habit.status) {
          HabitsForm.clear();
        }
      }
    });
  }
};
