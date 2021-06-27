import noteService from '../services/note-service.js';
import CommonController from './common-controller.js';

moment.locale('de-ch');

export class EditNoteController extends CommonController {
  noteFromDB;
  noteId;

  constructor() {
    super();
    this.editNoteTemplateCompiled = Handlebars.compile(document.getElementById('edit-note-template').innerHTML);
    this.editNoteMessageTemplateCompiled = Handlebars.compile(document.getElementById('edit-note-message-template').innerHTML);
    this.documentBody = document.querySelector('body');
    this.editNoteForm = document.querySelector('#edit-note-form');
    this.editNoteCancelButton = document.querySelector('.edit-note-cancel-button');
    this.editNoteSaveButton = document.querySelector('.edit-note-save-button');
    this.isDarkMode = false;
  }

  initVariablesAfterRender() {
    this.deleteNoteButton = document.querySelector('.note-delete-button');
    this.noteTitle = document.querySelector('#edit-note-title');
    this.noteDescription = document.querySelector('#edit-note-description');
    this.noteImportance = document.querySelector('#edit-note-importance');
    this.noteDueDate = document.querySelector('#edit-note-due-date');
    this.formInputs = [this.noteTitle, this.noteDescription, this.noteImportance, this.noteDueDate];

    const noteTitleBeforeChange = this.noteTitle.value;
    const noteDescriptionBeforeChange = this.noteDescription.value;
    const noteImportanceBeforeChange = this.noteImportance.value;
    const noteDueDateBeforeChange = this.noteDueDate.value;
    this.formInputsValuesBeforeChange = [
      noteTitleBeforeChange,
      noteDescriptionBeforeChange,
      noteImportanceBeforeChange,
      noteDueDateBeforeChange
    ];
  }

  initEventHandlers() {
    this.appStyleSwitch.addEventListener('change', (event) => {
      this.isDarkMode = !this.isDarkMode;
      if (this.isDarkMode) {
        window.location.hash = 'darkmode';
      } else {
        window.history.pushState('', '', window.location.pathname + window.location.search);
      }
      this.checkForDarkMode(this.editNoteCancelButton, false);
    });

    this.editNoteSaveButton.addEventListener('click', async (event) => {
      event.preventDefault();
      if (!this.editNoteSaveButton.classList.contains('disabled-button')) {
        const updatedNote = {
          _id: this.noteId,
          title: this.noteTitle.value,
          description: this.noteDescription.value,
          importance: this.noteImportance.value,
          dueDate: moment(this.noteDueDate.value).format('L'),
        };
        const updateFeedback = await noteService.updateNote(updatedNote);
        this.renderMessage(updateFeedback);
        this.editNoteSaveButton.classList.add('disabled-button');
        this.initVariablesAfterRender();
        this.initEventHandlers();
      }
    });

    this.deleteNoteButton.addEventListener('click', async (event) => {
      event.preventDefault();
      const noteId = event.target.dataset.noteId;
      const deleteConfirmed = confirm('Do you really want to delete this note?');
      if (deleteConfirmed) {
        await noteService.deleteNote(noteId);
        window.location.replace(window.location.origin + window.location.hash);
      }
    });

    this.formInputs.forEach((inputField) => {
      inputField.addEventListener('input', (event) => {
        this.removeMessage();
        const formInputsIndex = this.formInputs.indexOf(event.target);
        if (this.formInputsValuesBeforeChange[formInputsIndex] !== this.formInputs[formInputsIndex].value) {
          this.editNoteSaveButton.classList.remove('disabled-button');
        } else {
          this.editNoteSaveButton.classList.add('disabled-button');
        }
      });
    })
  }

  async renderView() {
    this.noteId = window.location.search.substring(4);
    this.noteFromDB = await noteService.getNoteById(this.noteId);
    this.noteFromDB.dueDate = noteService.formatDateForDisplay(this.noteFromDB.dueDate);
    this.editNoteForm.insertAdjacentHTML('afterbegin', this.editNoteTemplateCompiled(this.noteFromDB));
    this.checkForDarkMode(this.editNoteCancelButton, false);
  }

  renderMessage(feedback) {
    if (document.querySelector('.message') !== null) {
      document.querySelector('.message').remove();
    }
    let message, stylingClass = '';
    if (feedback === 1) {
      message = 'Note was successfully updated!';
      stylingClass = 'success-message';
    } else {
      message = 'There was a problem saving...';
      stylingClass = 'alert-message';
    }
    this.editNoteForm.insertAdjacentHTML('beforebegin', this.editNoteMessageTemplateCompiled({ stylingClass: stylingClass, message: message }));
  }

  removeMessage() {
    if (document.querySelector('.message') !== null) {
      document.querySelector('.message').remove();
    }
  }

  async initialize() {
    this.renderView().then(() => {
      this.initVariablesAfterRender();
      this.initEventHandlers();
    });
  }
}

new EditNoteController().initialize();
