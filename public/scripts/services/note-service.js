import Note from './note.js';
import {httpService} from './http-service.js';

moment.locale('de-ch');

class NoteService {
  constructor() {}

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
    const newNote = await httpService.exchangeData('POST', '/notes/new', note);
    return newNote;
  }

  async updateNote(updatedNote) {
    const changedProperties = await this.findChanges(updatedNote._id, updatedNote);
    const updateFeedback = await httpService.exchangeData('PATCH', `/notes/${updatedNote._id}`, changedProperties);
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
    const receivedNote = await httpService.exchangeData('GET', `/notes/${id}`);
    return receivedNote;
  }

  async getAllNotes() {
    const receivedNotes = await httpService.exchangeData('GET', '/notes/');
    return receivedNotes;
  }

  async deleteNote(id) {
    await httpService.exchangeData('DELETE', `/notes/${id}`);
  }
}

const noteService = new NoteService();
export default noteService;
