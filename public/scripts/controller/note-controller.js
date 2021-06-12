import noteService from '../services/note-service.js';

export class NoteController {
  constructor() {
    this.notesTemplateCompiled = Handlebars.compile(document.getElementById('note-template').innerHTML);

    this.notesContainer = document.querySelector('.notes-container');
    this.addNoteButton = document.querySelector('.add-note-button');
    this.filterButtons = document.querySelector('.filter-controls');
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

    this.addNoteButton.addEventListener('click', (event) => {
      this.addNoteModal.classList.add('show-modal');
    });

    this.filterButtons.addEventListener('click', (event) => {
      [...this.filterButtons.querySelectorAll('button')].forEach((button) => {
        button.classList.remove('active-filter');
      });
      event.target.classList.add('active-filter');
    });

    this.sortByDueDateButton.addEventListener('click', () => {
      this.showNotes('dueDate');
    });

    this.sortByCreatedDateButton.addEventListener('click', () => {
      this.showNotes('createdDate');
    });

    this.sortByImportanceButton.addEventListener('click', () => {
      this.showNotes('importance');
    });

    this.showFinishedButton.addEventListener('click', () => {
      this.showNotes('finishedState');
    });
  }

  showNotes(sortBy) {
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

    const sortedNotes = noteService.getNotes(sortBy, noteService.notes);

    document.querySelector('#notes-container').innerHTML = this.notesTemplateCompiled(sortedNotes);
  }

  renderView() {
    this.showNotes('dueDate');
  }

  initialize() {
    this.initEventHandlers();
    noteService.loadData();
    this.renderView();
  }
}

new NoteController().initialize();
