import {noteStore} from '../services/noteStore.js';

export class NoteController {
  async getNotesFromDB(req, res) {
    res.json(await noteStore.getAll());
  }

  async addNoteToDB(req, res) {
    res.json(await noteStore.add(req.body));
  }

  async getNoteFromDB(req, res) {
    res.json(await noteStore.getOne(req.params.id));
  }

  async editNoteInDB(req, res) {
    res.json(await noteStore.edit(req.params.id, req.body));
  }

  async deleteNoteInDB(req, res) {
    res.json(await noteStore.delete(req.params.id));
  }
}

export const noteController = new NoteController();
