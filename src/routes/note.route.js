// routes/noteRoutes.js
import express from 'express';
const router = express.Router();
import * as noteController from '../controllers/note.controller';
import * as authMiddleware from '../middlewares/auth.middleware';

// Apply authorization middleware to all note routes
router.use(authMiddleware.userAuth);

router.post('',noteController.createNote);
router.get('',noteController.getAllNotes);
router.get('/:_id',noteController.getNoteById);
router.put('/:_id',noteController.updateNote);
router.delete('/:_id',noteController.deleteNote);

export default router