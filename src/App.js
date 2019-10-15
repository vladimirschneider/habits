import API from './API';
import Form from './Form';
import FormHabit from './FormHabit';
import Habits from './Habits';

export default class App {
  constructor() {
    const forms = document.querySelectorAll('form');

    forms.forEach((form) => {
      const CForm = new Form(form);

      if (CForm.action === API.post.habit.action) {
        const habits = new Habits();

        const formHabit = new FormHabit(form);

        CForm.setCallback('sent', ({current, data}) => {
          if (current) {
            const {current} = habits.createHabit(data);

            if (current) {
              CForm.clear();
            }
          }
        });
      }
    });
  }
};
