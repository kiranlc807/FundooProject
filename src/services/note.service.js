import User from '../models/user.model'
import Note from '../models/note.model'
import {client} from '../config/redis'

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
      // Check if the notes are already in the Redis cache
      const cacheKey = `notes:${userId}`;
      // const cachedNotes = await client.get(cacheKey);
      const notes = await Note.find({
        userId:userId
      });

      if(!notes){
        throw new Error('No Note Found')
      }
      client.set(cacheKey, JSON.stringify(notes));
      return notes;  
  };

  export const getNoteById = async (noteId,userId) => {
      const cacheKey = `notes:${userId}`;
      const note = await Note.findOne({ _id: noteId,userId});
      if (!note) {
        throw new Error('Note not found');
      }
      client.setEx(cacheKey, 3600, JSON.stringify(note));
      return note;
  };

  export const updateNote = async (noteId,body,userId) => {
      const updatedNote = await Note.findOneAndUpdate(
        { _id: noteId,userId },
        { $set: body },
        { new: true }
      );
      if (!updatedNote) {
        throw new Error('Note not found');
      }
      client.del(`notes:${userId}`);
      const cacheKey = `notes:${userId}`;
      client.set(cacheKey, JSON.stringify(updatedNote));
      return updatedNote;
  };

  export const deleteNote = async (noteId,userId) => {
      const deletedNote = await Note.findOneAndDelete({ _id: noteId,userId});
      if (!deletedNote) {
        throw new Error('Note not found');
      }
      const cacheKey = `notes:${userId}`;
      client.del(cacheKey);
      return deletedNote;
  };

  export const archiveNote = async (noteId, userId) => {
      const existingNote = await Note.findOne({_id:noteId,userId})
      if(!existingNote)
      {
        throw new Error('Note Not Found!')
      }
      const updatedNote = await Note.findOneAndUpdate(
        { _id: noteId, userId },
          { $set: { archived: !existingNote.archived } },
          { new: true }
      );
      return updatedNote;   
  };

  export const trashNote = async (noteId, userId) => {
    const existingNote = await Note.findOne({_id:noteId,userId})
      if(!existingNote)
      {
        throw new Error('Note Not Found!')
      }
      const updatedNote = await Note.findOneAndUpdate(
        { _id: noteId, userId },
        { $set: { trashed: !existingNote.trashed } },
        { new: true }
      );
      return updatedNote;
  };