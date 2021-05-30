import noteService from '../services/note-service.js';

export class NoteController {
  constructor() {
    this.notesContainer = document.querySelector('.notes-container');
    this.addNoteButton = document.querySelector('.add-note-button');
    this.sortByDueDateButton = document.querySelector('.sort-by-due-date-button');
    this.sortByCreatedDateButton = document.querySelector('.sort-by-created-date-button');
    this.sortByImportanceButton = document.querySelector('.sort-by-importance-button');
    this.showFinishedButton = document.querySelector('.show-finished-button');
    this.initEditNoteButton = document.querySelector('.note-edit-button');
    this.finishNoteCheckbox = document.querySelector('.note-state');
    this.appStyleSwitch = document.querySelector('.app-style-switch');

    this.editNoteForm = document.querySelector('.edit-note-form');
    this.editNoteTitleInput = document.querySelector('input#edit-note-title');
    this.editNoteSaveButton = document.querySelector('.edit-note-save-button');
    this.editNoteCancelButton = document.querySelector('.edit-note-cancel-button');
  }

  initEventHandlers() {
    console.log('init event handlers');
    console.log([...this.editNoteForm.children]);

    this.editNoteSaveButton.addEventListener('click', (event) => {
      event.preventDefault();
      const noteId = Number(event.target.dataset.noteId);
      document.querySelector('h1').innerText = this.editNoteTitleInput.value;
      noteService.updateNote(noteId);
    });
  }

  renderView() {
    console.log('render view');
  }

  initialize() {
    console.log('initialize view and functionality');
    this.initEventHandlers();
    this.renderView();
  }
}

new NoteController().initialize();
