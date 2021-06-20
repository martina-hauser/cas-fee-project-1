import express from 'express';
const router = express.Router();
import * as noteController from '../controller/noteController';

router.get('/', noteController.showNotes);
router.post('/notes/new', noteController.addNote);
router.get('/notes/:id/', noteController.showNote);
router.patch('/notes/:id/', noteController.editNote);
router.delete('/notes/:id/', noteController.deleteNote);

export const noteRoutes = router;
