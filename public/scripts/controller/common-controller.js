export default class CommonController {
  constructor() {
    this.documentBody = document.querySelector('body');
    this.appStyleSwitch = document.querySelector('#app-style-switch');
  }

  toggleDarkModeClass() {
    if (window.location.hash === '#darkmode') {
      if (!this.documentBody.classList.contains('dark-mode')) {
        this.documentBody.classList.add('dark-mode');
      }
    } else if (this.documentBody.classList.contains('dark-mode')) {
      this.documentBody.classList.remove('dark-mode');
    }
  }

  addDarkModeAttributes(button) {
    const buttonHref = button.getAttribute('href');
    if (!button.classList.contains('disabled-button') && buttonHref.search('darkmode') < 0) {
      button.setAttribute('href', `${buttonHref}#darkmode`);
    }
  }

  removeDarkModeAttributes(button) {
    if (!button.classList.contains('disabled-button')) {
      const originalHref = button.getAttribute('href').replace('#darkmode', '');
      button.setAttribute('href', originalHref);
    }
  }

  checkForDarkMode(buttonList, list = true) {
    this.toggleDarkModeClass();
    if (window.location.hash === '#darkmode') {
      if (list) {
        buttonList.forEach((button) => {
          this.addDarkModeAttributes(button);
        });
      } else {
        this.addDarkModeAttributes(buttonList);
      }
    } else if (list) {
      buttonList.forEach((button) => {
        this.removeDarkModeAttributes(button);
      });
    } else {
      this.removeDarkModeAttributes(buttonList);
    }
  }

  dontAllowPastDueDate(noteInput) {
    let today = moment().format('L');
    today = DisplayHelper.formatDateForDisplay(today);
    noteInput.setAttribute('min', today);
  }
}
