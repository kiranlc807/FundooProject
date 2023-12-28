import { expect } from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';
import app from '../../src/index';

var token;
var noteId;
describe('User APIs Test', () => {
  before((done) => {
    const clearCollections = () => {
      for (const collection in mongoose.connection.collections) {
        mongoose.connection.collections[collection].deleteOne(() => {});
      }
    };

    const mongooseConnect = async () => {
      await mongoose.connect(process.env.DATABASE_TEST);
      clearCollections();
    };

    if (mongoose.connection.readyState === 0) {
      mongooseConnect();
    } else {
      clearCollections();
    }

    done();
  });

  describe('POST /users /signup', () => {
    it('create a new user', (done) => {
      const userObject = {
        "name": "Kirana",
        "email": "kirankk8861@gmail.com",
        "password": "Kirana@4455"
      };
    
      request(app)
        .post('/api/v1/user/signup')
        .send(userObject)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(201);
          done();
        });
    });
  });

  describe('POST /user /login', () => {
    it('should return token', (done) => {
      request(app)
        .post('/api/v1/user/login')
        .send({
          "email": "kirankk8861@gmail.com",
          "password": "Kirana@4455"
        })
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(201);
          token = res.body.data;
          done();
        });
    });
  });
});

describe('Note API Test',function(){
  describe('Create Note',function(){
    it('create new note',(done)=>{
      const noteObject = {
        "title":"Note Tesing",
        "description":"Using Mocha and Chai",
        "color":"Red"
      }

      request(app)
        .post('/api/v1/note')
        .set('Authorization', token)
        .send(noteObject)
        .end((err,res)=>{
          expect(res.statusCode).to.be.equal(201);
          noteId=res.body._id;
          done();
        })
    })
  });

  describe('getAllNote',function(){
    it('getAll the note of user',(done)=>{
      request(app)
        .get('/api/v1/note')
        .set('Authorization', token)
        .end((err,res)=>{
          expect(res.statusCode).to.be.equal(200);
          done();
        })
    })
  });

  describe('getNoteByID',function(){
    it('getNotByID',(done)=>{
      request(app)
        .get(`/api/v1/note/${noteId}`)
        .set('Authorization', token)
        .end((err,res)=>{
          expect(res.statusCode).to.be.equal(200);
          done();
        })
    })
  });

  describe('UpdateNote',function(){
    it('updateNote By Id',(done)=>{
      const updatedNoteObject = {
        "description":"Using Mocha and Chai updating note",
      }
      request(app)
        .put(`/api/v1/note/${noteId}`)
        .set('Authorization', token)
        .send(updatedNoteObject)
        .end((err,res)=>{
          expect(res.statusCode).to.be.equal(200);
          done();
        })
    })
  });

  describe('Archive Note',function(){
    it('archive make true',(done)=>{
      request(app)
        .put(`/api/v1/note/${noteId}/archive`)
        .set('Authorization', token)
        .end((err,res)=>{
          expect(res.statusCode).to.be.equal(200);
          done();
        })
    })
  });

  describe('Trash Note',function(){
    it('make trash true',(done)=>{
      request(app)
        .put(`/api/v1/note/${noteId}/trash`)
        .set('Authorization', token)
        .end((err,res)=>{
          expect(res.statusCode).to.be.equal(200);
          done();
        })
    })
  });

  describe('DeleteNote',function(){
    it('deleteNote By Id',(done)=>{
      request(app)
        .delete(`/api/v1/note/${noteId}`)
        .set('Authorization', token)
        .end((err,res)=>{
          expect(res.statusCode).to.be.equal(200);
          done();
        })
    })
  });
})