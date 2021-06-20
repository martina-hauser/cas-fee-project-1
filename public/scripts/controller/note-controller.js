import noteService from '../services/note-service.js';

moment.locale('de-ch');

export class NoteController {
  notesFromDB;

  constructor() {
    this.notesTemplateCompiled = Handlebars.compile(document.getElementById('note-template').innerHTML);

    this.notesContainer = document.querySelector('.notes-container');
    this.addNoteButton = document.querySelector('.add-note-button');
    this.filterButtons = document.querySelector('.filter-group');
    this.sortBySelection = 'dueDate';
    this.sortByDueDateButton = document.querySelector('.sort-by-due-date-button');
    this.sortByCreatedDateButton = document.querySelector('.sort-by-created-date-button');
    this.sortByImportanceButton = document.querySelector('.sort-by-importance-button');
    this.filterStateMenu = document.querySelector('.filter-state-select');
    this.filterStateMenuSelection = 'all';
    this.initEditNoteButton = document.querySelector('.note-edit-button');
    this.finishNoteCheckbox = document.querySelector('.note-state');
    this.appStyleSwitch = document.querySelector('#app-style-switch');
    this.documentBody = document.querySelector('body');

    this.editNoteForm = document.querySelector('.edit-note-form');
    this.editNoteTitleInput = document.querySelector('input#edit-note-title');
    this.editNoteSaveButton = document.querySelector('.edit-note-save-button');
    this.editNoteCancelButton = document.querySelector('.edit-note-cancel-button');
  }

  initEventHandlers() {
    if (location.pathname.search('edit') >= 0) {
      console.log([...this.editNoteForm.children]);

      this.addNoteSaveButton.addEventListener('click', (event) => {
        event.preventDefault();
        noteService.addNote();
      });

      this.editNoteSaveButton.addEventListener('click', (event) => {
        event.preventDefault();
        const noteId = Number(event.target.dataset.noteId);
        document.querySelector('h1').innerText = this.editNoteTitleInput.value;
        noteService.updateNote(noteId);
      });
    }

    if (location.pathname.search('new') >= 0) {
      console.log('??');
      this.noteTitle = document.querySelector('#edit-note-title').value;
      console.log(this.noteTitle);
    }

    this.appStyleSwitch.addEventListener('change', () => {
      if (!this.documentBody.classList.contains('dark-mode')) {
        this.documentBody.classList.add('dark-mode');
      } else {
        this.documentBody.classList.remove('dark-mode');
      }
    });

    this.filterButtons.addEventListener('click', (event) => {
      this.filterButtons.querySelectorAll('button').forEach((button) => {
        button.classList.remove('active-filter');
      });
      event.target.classList.add('active-filter');
    });

    this.filterStateMenu.addEventListener('change', (event) => {
      this.filterStateMenuSelection = event.target.value;
      this.showNotes();
    });

    this.sortByDueDateButton.addEventListener('click', () => {
      this.sortBySelection = 'dueDate';
      this.showNotes();
    });

    this.sortByCreatedDateButton.addEventListener('click', () => {
      this.sortBySelection = 'createdDate';
      this.showNotes();
    });

    this.sortByImportanceButton.addEventListener('click', () => {
      this.sortBySelection = 'importance';
      this.showNotes();
    });
  }

  async showNotes() {
    // function getUniqueDueDates(notes) {
    //   let uniqueDueDates = new Set();
    //   notes.forEach((note) => {
    //     uniqueDueDates.add(note.dueDate);
    //   });
    //   return uniqueDueDates;
    // }
    //
    // function checkDueDate(note) {
    //   return note.dueDate === this.toString();
    // }
    //
    // function getNoteGroups(notes) {
    //   const uniqueDates = getUniqueDueDates(notes);
    //   let noteGroups = [];
    //   uniqueDates.forEach((dueDate) => {
    //     noteGroups.push(notes.filter(checkDueDate, dueDate));
    //   });
    //   return noteGroups;
    // }
    //
    // const noteGroups = getNoteGroups(sampleNotes);
    //
    // noteGroups.forEach((group) => {
    //   const notesFragmentTemplateSource = document.getElementById('entry-template').innerHTML;
    //   const createNotesFragmentHtmlString = Handlebars.compile(notesFragmentTemplateSource);
    //   document.querySelector('#notes-container').insertAdjacentHTML('beforeend', createNotesFragmentHtmlString(group));
    // });

    const filteredNotes = noteService.filterNotes(this.filterStateMenuSelection, this.notesFromDB);
    const sortedNotes = noteService.sortNotes(this.sortBySelection, filteredNotes);

    document.querySelector('#notes-container').innerHTML = this.notesTemplateCompiled(sortedNotes);
  }

  renderView() {
    this.showNotes('dueDate');
  }

  async initialize() {
    console.log('Initializing...');
    this.initEventHandlers();
    this.notesFromDB = await noteService.getAllNotes();
    // noteService.loadData();
    this.renderView();
  }
}

new NoteController().initialize();
