import * as NoteService from '../services/note.service'
import HttpStatus from "http-status-codes"

export const createNote = async (req, res) => {
    try {
      const newNote = await NoteService.createNote(req.body, req.user.userId);
      res.status(HttpStatus.CREATED).json(newNote);
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ 
        error: error.message 
      });
    }
  };

  export const getAllNotes = async (req, res) => {
    try {
      const notes = await NoteService.getAllNotes(req.user.userId);
      res.status(HttpStatus.OK).json(notes);
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ 
        error: error.message 
      });
    }
  };

  export const getNoteById = async (req, res) => {
    try {
      const note = await NoteService.getNoteById(req.params);
      res.status(HttpStatus.OK).json(note);
    } catch (error) {
      res.status(HttpStatus.NO_CONTENT).json({ 
        message: error.message
      });
    }
  };

  export const updateNote = async (req, res) => {
    try {
      const updatedNote = await NoteService.updateNote(req.params,req.body);
      res.status(HttpStatus.OK).json({
        data: updatedNote,
        message:'Updated Succesfully'
      });
    } catch (error) {
      res.status(HttpStatus.NO_CONTENT).json({
        error: error.message
      });
    }
  };


  export const deleteNote = async (req, res) => {
    try {
      const deletedNote = await NoteService.deleteNote(req.params);
      res.status(HttpStatus.OK).json({
        data:deletedNote,
        message:'Deleted succesfully'
      });
    } catch (error) {
      res.status(HttpStatus.NO_CONTENT).json({
        error: error.message 
      });
    }
  };

  export const archiveNote = async (req, res) => {
    try {
      const noteId = req.params.noteId;
      const userId = req.user.userId;
      const updatedNote = await NoteService.archiveNote(noteId, userId);
      res.status(HttpStatus.OK).json(updatedNote);
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
         error: error.message
      });
    }
  };

  export const unArchiveNote = async (req, res) => {
    try {
      const noteId = req.params.noteId;
      const userId = req.user.userId;
      const updatedNote = await NoteService.unArchiveNote(noteId, userId);
      res.status(HttpStatus.OK).json(updatedNote);
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
         error: error.message
      });
    }
  };

  export const trashNote = async (req, res) => {
    try {
      const noteId = req.params.noteId;
      const userId = req.user.userId;
      const updatedNote = await NoteService.trashNote(noteId, userId);
      res.status(HttpStatus.OK).json(updatedNote);
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ 
        error: error.message 
      });
    }
  };