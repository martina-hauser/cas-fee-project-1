import noteService from '../services/note-service.js';

moment.locale('de-ch');

export class EditNoteController {
  noteFromDB;
  noteId;

  constructor() {
    this.editNoteTemplateCompiled = Handlebars.compile(document.getElementById('edit-note-template').innerHTML);
    this.editNoteMessageTemplateCompiled = Handlebars.compile(document.getElementById('edit-note-message-template').innerHTML);
    this.editNoteForm = document.querySelector('#edit-note-form');
    this.editNoteSaveButton = document.querySelector('.edit-note-save-button');
    // this.appStyleSwitch = document.querySelector('#app-style-switch');
  }

  initEventHandlers() {
    this.noteTitle = document.querySelector('#edit-note-title');
    this.noteDescription = document.querySelector('#edit-note-description');
    this.noteImportance = document.querySelector('#edit-note-importance');
    this.noteDueDate = document.querySelector('#edit-note-due-date');

    this.editNoteSaveButton.addEventListener('click', async (event) => {
      event.preventDefault();
      const updatedNote = {
        _id: this.noteId,
        title: this.noteTitle.value,
        description: this.noteDescription.value,
        importance: this.noteImportance.value,
        dueDate: moment(this.noteDueDate.value).format('L'),
      };
      const updateFeedback = await noteService.updateNote(updatedNote);
      this.renderMessage(updateFeedback);
    });

    // this.appStyleSwitch.addEventListener('change', () => {
    //   if (!this.documentBody.classList.contains('dark-mode')) {
    //     this.documentBody.classList.add('dark-mode');
    //   } else {
    //     this.documentBody.classList.remove('dark-mode');
    //   }
    // });
  }

  renderView() {
    this.noteFromDB.dueDate = noteService.formatDateForDisplay(this.noteFromDB.dueDate);
    this.editNoteForm.insertAdjacentHTML('afterbegin', this.editNoteTemplateCompiled(this.noteFromDB));
  }

  renderMessage(feedback) {
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

  async initialize() {
    this.noteId = window.location.search.substring(4);
    this.noteFromDB = await noteService.getNoteById(this.noteId);
    this.renderView();
    this.initEventHandlers();
  }
}

new EditNoteController().initialize();
