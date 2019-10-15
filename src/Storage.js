import Dexie from 'dexie';

export default class Storage {
  constructor() {
    this.db = new Dexie('habits');
  }

  getWithVersion() {
    return this.db.version(1);
  }

  setStores() {
    return this.getWithVersion().stores({
      habits: '++id,title,amountInPeriod,amountInPeriodInDays,color,completed,startDate'
    });
  }

  getHabitsDB() {
    return this.db;
  }
};
