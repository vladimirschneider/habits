export default class Form {
  constructor(form, options) {
    this.form = form;
    this.options = Object.assign({
      allRequired: true,
    }, options);

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
      let resultValidation = true;

      formData.forEach((value, key) => data[this.convertStringToCamelCase(key)] = value);

      for (let key in data) {
        if (!this.validate(key, data[key])) resultValidation = false;
      }

      if (resultValidation) {
        this.callback.sent({
          status: true,
          data
        });
      }
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

  updateOptions(options) {
    this.options = Object.assign(this.options, options);
  }

  validate(fieldName, value) {
    if (((this.options.fields && this.options.fields[fieldName].isRequired) || this.options.allRequired) && !value) return false;

    return true;
  }
};
