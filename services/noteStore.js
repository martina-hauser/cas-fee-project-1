import Datastore from 'nedb-promise';

export class NoteStore {
  constructor(db) {
    this.notesDB = db || new Datastore({filename: './data/notes.db', autoload: true});
  }

  getAll() {
    return this.notesDB.cfind({}).sort({ dueDate: 1 }).exec();
  }

  getOne(id) {
    return this.notesDB.findOne({_id: id});
  }

  add(note) {
    return this.notesDB.insert(note);
  }

  edit(noteId, noteChanges) {
    return this.notesDB.update({_id: noteId}, {$set: noteChanges});
  }

  async delete(id) {

  }
}

export const noteStore = new NoteStore();
