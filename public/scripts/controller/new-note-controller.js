import noteService from '../services/note-service.js';

moment.locale('de-ch');

export class NewNoteController {

  constructor() {
    this.notesContainer = document.querySelector('.notes-container');
    // this.appStyleSwitch = document.querySelector('#app-style-switch');
    this.documentBody = document.querySelector('body');

    this.editNoteForm = document.querySelector('.edit-note-form');
    this.addNoteSaveButton = document.querySelector('.add-note-save-button');
    this.noteTitle = document.querySelector('#edit-note-title');
    this.noteDescription = document.querySelector('#edit-note-description');
    this.noteImportance = document.querySelector('#edit-note-importance');
    this.noteDueDate = document.querySelector('#edit-note-due-date');
    this.editNoteCancelButton = document.querySelector('.edit-note-cancel-button');
  }

  initEventHandlers() {
    // if (location.pathname.search('edit') >= 0) {
    //   console.log([...this.editNoteForm.children]);
    //
    //   this.addNoteSaveButton.addEventListener('click', (event) => {
    //     event.preventDefault();
    //     noteService.addNote();
    //   });
    //
    //   this.editNoteSaveButton.addEventListener('click', (event) => {
    //     event.preventDefault();
    //     const noteId = Number(event.target.dataset.noteId);
    //     document.querySelector('h1').innerText = this.editNoteTitleInput.value;
    //     noteService.updateNote(noteId);
    //   });
    // }

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

    // this.appStyleSwitch.addEventListener('change', () => {
    //   if (!this.documentBody.classList.contains('dark-mode')) {
    //     this.documentBody.classList.add('dark-mode');
    //   } else {
    //     this.documentBody.classList.remove('dark-mode');
    //   }
    // });
  }

  async initialize() {
    this.initEventHandlers();
  }
}

new NewNoteController().initialize();
