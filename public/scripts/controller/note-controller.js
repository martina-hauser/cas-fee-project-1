import noteService from '../services/note-service.js';
import CommonController from './common-controller.js';

moment.locale('de-ch');

export class NoteController extends CommonController {
  notesFromDB;

  constructor() {
    super();
    this.notesTemplateCompiled = Handlebars.compile(document.getElementById('note-template').innerHTML);

    this.addNoteButton = document.querySelector('.add-note-button');
    this.filterButtons = document.querySelector('.filter-group');
    this.sortBySelection = 'dueDate';
    this.sortByDueDateButton = document.querySelector('.sort-by-due-date-button');
    this.sortByCreatedDateButton = document.querySelector('.sort-by-created-date-button');
    this.sortByImportanceButton = document.querySelector('.sort-by-importance-button');
    this.filterStateMenu = document.querySelector('.filter-state-select');
    this.filterStateMenuSelection = 'all';
    this.isDarkMode = false;
  }

  initEventHandlers() {
    this.initEditNoteButtons = document.querySelectorAll('.note-edit-button');
    this.appStyleSwitch.addEventListener('click', (event) => {
      this.isDarkMode = !this.isDarkMode;
      if (this.isDarkMode) {
        window.location.hash = 'darkmode';
      } else {
        history.pushState('', '', window.location.pathname + window.location.search);
      }
      this.checkForDarkMode([...this.initEditNoteButtons], true);
      this.checkForDarkMode(this.addNoteButton, false);

    });

    this.filterButtons.addEventListener('click', (event) => {
      this.filterButtons.querySelectorAll('button').forEach((button) => {
        button.classList.remove('active-filter');
      });
      event.target.classList.add('active-filter');
    });

    this.filterStateMenu.addEventListener('change', async (event) => {
      this.filterStateMenuSelection = event.target.value;
      await this.initialize();
    });

    this.sortByDueDateButton.addEventListener('click', async () => {
      this.sortBySelection = 'dueDate';
      await this.initialize();
    });

    this.sortByCreatedDateButton.addEventListener('click', async () => {
      this.sortBySelection = 'createdDate';
      await this.initialize();
    });

    this.sortByImportanceButton.addEventListener('click', async () => {
      this.sortBySelection = 'importance';
      await this.initialize();
    });

    this.deleteNoteButtons = document.querySelectorAll('.note-delete-button');
    [...this.deleteNoteButtons].forEach((deleteButton) => {
      deleteButton.addEventListener('click', async (event) => {
        event.preventDefault();
        const noteId = event.target.dataset.noteId;
        const deleteConfirmed = confirm('Do you really want to delete this note?');
        if (deleteConfirmed) {
          await noteService.deleteNote(noteId);
          await this.renderView();
        }
      });
    });

    this.finishedStateCheckboxes = document.querySelectorAll('.note-state');
    [...this.finishedStateCheckboxes].forEach((stateBox) => {
    stateBox.addEventListener('change', async (event) => {
      event.preventDefault();
      const noteId = event.target.dataset.noteId;
      const updatedNote = {
        _id: noteId,
        finishedState: event.target.checked,
        finishedDate: event.target.checked ? moment().format('L') : '',
      };
      await noteService.updateNote(updatedNote).then(async () => {
        await this.initialize();
      })
    });
  })
  }

  showNotes() {
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

  async renderView() {
    this.notesFromDB = await noteService.getAllNotes();
    this.showNotes();
    this.initEditNoteButtons = document.querySelectorAll('.note-edit-button');
    this.checkForDarkMode([...this.initEditNoteButtons], true);
    this.checkForDarkMode(this.addNoteButton, false);
  }

  initialize() {
    console.log('Initializing...');
    this.renderView().then(() => {
      this.initEventHandlers();
    });
  }
}

new NoteController().initialize();
