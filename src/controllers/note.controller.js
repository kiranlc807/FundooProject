import * as NoteService from '../services/note.service'

export const createNote = async (req, res) => {
    try {
      const newNote = await NoteService.createNote(req.body, req.user.userId);
      res.status(201).json(newNote);
    } catch (error) {
      res.status(500).json({ 
        error: error.message 
      });
    }
  };

  export const getAllNotes = async (req, res) => {
    try {
      const notes = await NoteService.getAllNotes(req.user.userId);
      res.status(200).json(notes);
    } catch (error) {
      res.status(500).json({ 
        error: error.message 
      });
    }
  };

  export const getNoteById = async (req, res) => {
    try {
      const note = await NoteService.getNoteById(req.params);
      res.status(200).json(note);
    } catch (error) {
      res.status(404).json({ 
        error: error.message
      });
    }
  };

  export const updateNote = async (req, res) => {
    try {
      const updatedNote = await NoteService.updateNote(req.params,req.body);
      res.status(200).json({
        data: updatedNote,
        message:'Updated Succesfully'
      });
    } catch (error) {
      res.status(404).json({
        error: error.message
      });
    }
  };


  export const deleteNote = async (req, res) => {
    try {
      const deletedNote = await NoteService.deleteNote(req.params);
      res.status(200).json({
        data:deletedNote,
        message:'Deleted succesfully'
      });
    } catch (error) {
      res.status(404).json({
        error: error.message 
      });
    }
  };