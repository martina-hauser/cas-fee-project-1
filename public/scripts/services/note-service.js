import Note from './note.js';
import notes from './data/notemodel.js';
import {httpService} from './http-service.js';

moment.locale('de-ch');

class NoteService {
  constructor() {
    this.notes = [];
  }

  loadData() {
    this.notes = notes;
  }

  sortByDueDate(note1, note2) {
    return moment(note2.dueDate, 'DD-MM-YYYY').isSameOrBefore(moment(note1.dueDate, 'DD-MM-YYYY')) ? 1 : -1;
  }

  sortByCreatedDate(note1, note2) {
    return moment(note2.createdDate, 'DD-MM-YYYY').isSameOrBefore(moment(note1.createdDate, 'DD-MM-YYYY')) ? 1 : -1;
  }

  sortByImportance(note1, note2) {
    return note2.importance - note1.importance;
  }

  getUnfinished(note) {
    return !note.finishedState;
  }

  getFinished(note) {
    return note.finishedState;
  }

  filterNotes(filterBy = 'all', notesToFilter) {
    if (filterBy === 'all') {
      return notesToFilter;
    }
    if (filterBy === 'unfinished') {
      return notesToFilter.filter(this.getUnfinished);
    }
    if (filterBy === 'finished') {
      return notesToFilter.filter(this.getFinished);
    }
  }

  sortNotes(sortBy = 'dueDate', notesToSort) {
    if (sortBy === 'dueDate') {
      return [...notesToSort].sort(this.sortByDueDate);
    }
    if (sortBy === 'createdDate') {
      return [...notesToSort].sort(this.sortByCreatedDate);
    }
    if (sortBy === 'importance') {
      return [...notesToSort].sort(this.sortByImportance);
    }
  }

  formatDateForDisplay(date) {
    return date.split('.').reverse().join('-');
  }

  async addNote(noteInput) {
    const note = new Note(
      noteInput.title,
      noteInput.description,
      noteInput.importance,
      noteInput.createdDate,
      noteInput.dueDate,
      noteInput.finishedState,
      noteInput.finishedDate,
      );
    const newNote = await httpService.postData('/notes/new', note)
      .then((res) => res.json());
    return newNote;
  }

  async updateNote(updatedNote) {
    const changedProperties = await this.findChanges(updatedNote._id, updatedNote);
    const updateFeedback = await httpService.patchData(`/notes/${updatedNote._id}`, changedProperties)
      .then((res) => res.json());
    return updateFeedback;
  }

  async findChanges(noteId, updatedNote) {
    const currentlyStoredNote = await this.getNoteById(noteId);
    const changes = {};
    for (const noteProp in updatedNote) {
      if (updatedNote[noteProp] !== currentlyStoredNote[noteProp]) {
        changes[noteProp] = updatedNote[noteProp];
      }
    }
    return changes;
  }

  async getNoteById(id) {
    // return this.notes.find((note) => parseInt(id, 10) === parseInt(note.id, 10));
    const receivedNote = await httpService.getData(`/notes/${id}`)
      .then((res) => res.json());
    // this.convertDataFormats(receivedNote);
    return receivedNote;
  }

  async getAllNotes() {
    const receivedNotes = await httpService.getData('/notes/')
      .then((res) => res.json());
    // [...receivedNotes].forEach((note) => {
    //   this.convertDataFormats(note);
    // });
    return receivedNotes;
  }

  async deleteNote(id) {
    await httpService.deleteData(`/notes/${id}`);
  }

  convertDataFormats(note) {
    note.createdDate ? moment(note.createdDate).format('L') : '';
    note.dueDate ? moment(note.dueDate).format('L') : '';
    note.finishedDate ? moment(note.finishedDate).format('L') : '';
    return note;
  }
}

// const note = new Note(
//   id,
//   'Test Note',
//   'description',
//   3,
//   '29.05.2021',
//   '27.06.2021',
//   false,
//   '',
// );

const noteService = new NoteService();
export default noteService;
