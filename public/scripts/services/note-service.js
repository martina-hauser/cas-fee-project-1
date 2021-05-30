import Note from './note.js';

class NoteService {
  constructor() {
    this.notes = [];
  }

  orderByFinishedDate(note1, note2) {
    return note2.finishDate - note1.finishDate;
  }

  // suggested functions for note-service.js
  getNote(orderBy, filterBy) {
    // Notes aus dem Storage abrufen
    if (orderBy === 'finishedDate') {
      return [...this.notes].sort(this.orderByFinishedDate);
    }
  }

  addNote(id, title, description, importance, createdDate, duedate, finishedState, finishedDate) {
    // neues Note in den Storage einfügen
    const note = new Note(
      id,
      title,
      description,
      importance,
      createdDate,
      duedate,
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
