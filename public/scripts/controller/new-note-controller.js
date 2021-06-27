import CommonController from './common-controller.js';
import noteService from '../services/note-service.js';

moment.locale('de-ch');

export class NewNoteController extends CommonController {
  constructor() {
    super();
    this.isDarkMode = false;

    this.addNoteSaveButton = document.querySelector('.add-note-save-button');
    this.noteTitle = document.querySelector('#add-note-title');
    this.noteDescription = document.querySelector('#add-note-description');
    this.noteImportance = document.querySelector('#add-note-importance');
    this.noteDueDate = document.querySelector('#add-note-due-date');
    this.addNoteCancelButton = document.querySelector('.add-note-cancel-button');
  }

  initEventHandlers() {
    this.addNoteSaveButton.addEventListener('click', async (event) => {
      event.preventDefault();
      const newNote = {
        title: this.noteTitle.value,
        description: this.noteDescription.value,
        importance: this.noteImportance.value,
        createdDate: moment().format('L'),
        dueDate: moment(this.noteDueDate.value).format('L'),
        finishedState: false,
        finishedDate: '',
      };
      const result = await noteService.addNote(newNote);
      window.location.replace(`${window.location.origin}/templates/edit.html?id=${result._id}`);
    });

    this.appStyleSwitch.addEventListener('click', () => {
      this.isDarkMode = !this.isDarkMode;
      if (this.isDarkMode) {
        window.location.hash = 'darkmode';
      } else {
        window.history.pushState('', '', window.location.pathname + window.location.search);
      }
      this.checkForDarkMode(this.addNoteCancelButton, false);
    });
  }

  initialize() {
    this.initEventHandlers();
    this.checkForDarkMode(this.addNoteCancelButton, false);
  }
}

new NewNoteController().initialize();
