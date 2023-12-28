// routes/noteRoutes.js
import express from 'express';
const router = express.Router();
import * as noteController from '../controllers/note.controller';
import * as authMiddleware from '../middlewares/auth.middleware';

// Apply authorization middleware to all note routes
// router.use(authMiddleware.userAuth);

router.post('',authMiddleware.userAuth,noteController.createNote);
router.get('',authMiddleware.userAuth,noteController.getAllNotes);
router.get('/:_id',authMiddleware.userAuth,noteController.getNoteById);
router.put('/:_id',authMiddleware.userAuth,noteController.updateNote);
router.delete('/:_id',authMiddleware.userAuth,noteController.deleteNote);
router.put('/:noteId/archive',authMiddleware.userAuth, noteController.archiveNote);
router.put('/:noteId/trash',authMiddleware.userAuth, noteController.trashNote);

export default router