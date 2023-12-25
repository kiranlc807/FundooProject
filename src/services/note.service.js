import User from '../models/user.model'
import Note from '../models/note.model'

export const createNote = async (body,userId) => {

      const user = await User.findOne({ _id: userId});
      if (!user) {
        throw new Error('User not found');
      }
      else{
      const savedNote = await Note.create({
        ...body,
        userId:userId
      });
      return savedNote;
      }

  };

  export const getAllNotes = async (userId) => {

      const user = await User.findById(userId);
  
      if (!user) {
        throw new Error('User not found');
      }
      else{
      const notes = await Note.find({
        userId:userId
      });
      if(!notes){
        throw new Error('No Note Found')
      }
      return notes;
      }

  };

  export const getNoteById = async (noteId) => {
      const note = await Note.findOne({ _id: noteId});
      if (!note) {
        throw new Error('Note not found');
      }
      return note;
  };

  export const updateNote = async (noteId,body) => {
      const updatedNote = await Note.findOneAndUpdate(
        { _id: noteId },
        { $set: body },
        { new: true }
      );
      if (!updatedNote) {
        throw new Error('Note not found');
      }
      return updatedNote;
  };

  export const deleteNote = async (noteId) => {
      const deletedNote = await Note.findOneAndDelete({ _id: noteId});
      if (!deletedNote) {
        throw new Error('Note not found');
      }
      return deletedNote;
  };