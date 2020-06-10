export default class Form {
  constructor(form) {
    this.form = form;

    this.events = {
      sent: () => {},
    };

    this.form.addEventListener('submit', (e) => {
      e.preventDefault();

      const formData = new FormData(e.target);

      const data = {};
      let resultValidation = true;

      formData.forEach((value, key) => data[this.convertStringToCamelCase(key)] = value);

      for (let key in data) {
        if (!data[key]) resultValidation = false;
      }

      if (resultValidation) {
        this.event('sent', {
          status: true,
          data
        });
      }
    });
  }

  convertStringToCamelCase(s) {
    return s.split('-').reduce((str, k) => str ? `${str}${k[0].toUpperCase()}${k.slice(1)}` : str)
  }

  on(event, callback) {
    this.events[event] = callback;
  }

  event(eventName, options) {
    const event =this.events[eventName];

    if (event) {
      event(options);
    }
  }

  clear() {
    this.form.reset();
  }
};
