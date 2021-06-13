import Note from './note.js';
import notes from './data/notemodel.js';

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

  addNote(id, title, description, importance, createdDate, dueDate, finishedState, finishedDate) {
    // neues Note in den Storage einfügen
    const note = new Note(
      id,
      title,
      description,
      importance,
      createdDate,
      dueDate,
      finishedState,
      finishedDate,
      );
    this.notes.push(note);
    return note;
  }

  updateNote(note) {
    // Note im Storage aktualiseren
  }

  getNoteById(id) {
    // Gezielt ein Note aus dem Storage abrufen
    return this.notes.find((note) => parseInt(id, 10) === parseInt(note.id, 10));
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
