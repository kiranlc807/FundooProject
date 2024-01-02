// routes/noteRoutes.js
import express from 'express';
const router = express.Router();
import * as noteController from '../controllers/note.controller';
import * as authMiddleware from '../middlewares/auth.middleware';
import { cacheMiddleware } from '../middlewares/cache.middleware';

// Apply authorization middleware to all note routes
// router.use(authMiddleware.userAuth);

router.post('',authMiddleware.userAuth, noteController.createNote);
router.get('',authMiddleware.userAuth, cacheMiddleware, noteController.getAllNotes);
router.get('/:_id',authMiddleware.userAuth, cacheMiddleware, noteController.getNoteById);
router.put('/:_id',authMiddleware.userAuth, cacheMiddleware, noteController.updateNote);
router.delete('/:_id',authMiddleware.userAuth, cacheMiddleware, noteController.deleteNote);
router.put('/:noteId/archive',authMiddleware.userAuth, noteController.archiveNote);
router.put('/:noteId/trash',authMiddleware.userAuth, noteController.trashNote);

export default router