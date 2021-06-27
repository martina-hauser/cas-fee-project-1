import noteService from '../services/note-service.js';
import CommonController from './common-controller.js';

moment.locale('de-ch');

export class NewNoteController extends CommonController {

  constructor() {
    super();
    this.isDarkMode = false;

    this.editNoteForm = document.querySelector('.edit-note-form');
    this.addNoteSaveButton = document.querySelector('.add-note-save-button');
    this.noteTitle = document.querySelector('#edit-note-title');
    this.noteDescription = document.querySelector('#edit-note-description');
    this.noteImportance = document.querySelector('#edit-note-importance');
    this.noteDueDate = document.querySelector('#edit-note-due-date');
    this.editNoteCancelButton = document.querySelector('.edit-note-cancel-button');
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

    this.appStyleSwitch.addEventListener('change', () => {
      this.isDarkMode = !this.isDarkMode;
      if (this.isDarkMode) {
        window.location.hash = 'darkmode';
      } else {
        window.history.pushState('', '', window.location.pathname + window.location.search);
      }
      this.checkForDarkMode(this.editNoteCancelButton, false);
    });
  }

  async initialize() {
    this.initEventHandlers();
    this.checkForDarkMode(this.editNoteCancelButton, false);
  }
}

new NewNoteController().initialize();
