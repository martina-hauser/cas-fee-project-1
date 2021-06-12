import Note from './note.js';
import notes from './data/notemodel.js';

class NoteService {
  constructor() {
    this.notes = [];
  }

  loadData() {
    this.notes = notes;
  }

  sortByDueDate(note1, note2) {
    return note2.dueDate - note1.dueDate;
  }

  sortByCreatedDate(note1, note2) {
    return note2.createdDate - note1.createdDate;
  }

  sortByImportance(note1, note2) {
    return note2.importance - note1.importance;
  }

  filterByFinishedState(note) {
    return note.finishedState;
  }

  // suggested functions for note-service.js
  getNotes(sortBy, notes, filterBy = '') {
    // Notes aus dem Storage abrufen
    if (sortBy === 'dueDate') {
      return [...notes].sort(this.sortByDueDate);
    }
    if (sortBy === 'createdDate') {
      return [...notes].sort(this.sortByCreatedDate);
    }
    if (sortBy === 'importance') {
      return [...notes].sort(this.sortByImportance);
    }
    if (sortBy === 'finishedState') {
      return notes.filter(this.filterByFinishedState);
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
