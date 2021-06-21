import express from 'express';
import {noteController} from '../controller/noteController.js';

const router = express.Router();

router.get('/notes', noteController.getNotesFromDB);
router.post('/notes/new', noteController.addNoteToDB);
router.get('/notes/:id/', noteController.getNoteFromDB);
router.patch('/notes/:id/', noteController.editNoteInDB);
router.delete('/notes/:id/', noteController.deleteNoteInDB);

export const noteRoutes = router;
