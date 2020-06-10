export default class HabitsFormUI {
  constructor(habit) {
    this.habit = habit;

    this.periodicity = document.querySelectorAll('[name="periodicity"]');
    this.qualityInDay = document.querySelector('.field--days');
    this.qualityInDayField = this.qualityInDay.querySelector('.field__input');

    this.periodicity.forEach((per) => {
      const {id, checked} = per;

      if (checked) {
        this.showingPeriodicityCustom(id);
      }

      per.addEventListener('click', () => {
        this.showingPeriodicityCustom(id);
      });
    });
  }

  showingPeriodicityCustom(id) {
    if (id === 'periodicity-custom') {
      this.qualityInDay.classList.remove('field--hidden');
    } else {
      this.qualityInDay.classList.add('field--hidden');
    }

    switch(id) {
      case 'periodicity-day':
        this.qualityInDayField.value = 1;
        break;
      case 'periodicity-week':
        this.qualityInDayField.value = 7;
        break;
    }
  }
};
