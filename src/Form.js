export default class Form {
  constructor(form) {
    this.form = form;

    const {action, method} = this.form;

    this.action = action;
    this.method = method;

    this.callback = {
      sent: () => {},
    };

    this.form.addEventListener('submit', (e) => {
      e.preventDefault();

      const formData = new FormData(e.target);

      const data = {};

      formData.forEach((value, key) => data[this.convertStringToCamelCase(key)] = value);

      this.callback.sent({
        status: true,
        data
      });
    });
  }

  convertStringToCamelCase(s) {
    return s.split('-').reduce((str, k) => str ? `${str}${k[0].toUpperCase()}${k.slice(1)}` : str)
  }

  setCallback(event, callback) {
    this.callback[event] = callback;
  }

  clear() {
    this.form.reset();
  }
};
