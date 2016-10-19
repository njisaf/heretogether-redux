'use strict';

require('./lib/test-env.js');
const awsMocks = require('./lib/aws-mocks');

const expect = require('chai').expect;
const request = require('superagent');

const fileMock = require('./lib/file-mock');
const statusMock = require('./lib/status-mock');
const userMock = require('./lib/user-mock');
const cleanDB = require('./lib/clean-db');
const serverCtrl = require('./lib/server-ctrl');

const server = require('../server');
const url = `http://localhost:${process.env.PORT}`;

const exampleFile = {
  file: `${__dirname}/data/shield.png`,
};

describe('testing file-router', function(){

  before( done => serverCtrl.serverUp(server, done));
  after( done => serverCtrl.serverDown(server, done));
  afterEach( done => cleanDB(done));

  describe('testing POST /api/status/:id/file', function(){

    describe('with valid token and data', function(){
      before(done => statusMock.call(this, done));
      it('should return a file', done => {
        request.post(`${url}/api/status/${this.tempStatus._id}/file`)
        .set({Authorization: `Bearer ${this.tempToken}`})
        .attach('file', exampleFile.file)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.fileURI).to.equal(awsMocks.uploadMock.Location);
          expect(res.body.objectKey).to.equal(awsMocks.uploadMock.Key);
          done();
        });
      });
    });

    describe('with no file', function(){
      before(done => statusMock.call(this, done));
      it('should respond with status 400', done => {
        request.post(`${url}/api/status/${this.tempStatus._id}/file`)
        .set({Authorization: `Bearer ${this.tempToken}`})
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.text).to.equal('BadRequestError');
          done();
        });
      });
    });

    describe('with invalid token', function(){
      before(done => statusMock.call(this, done));
      it('should respond with status 401', done => {
        request.post(`${url}/api/status/${this.tempStatus._id}/file`)
        .set({Authorization: `Bearer ${this.tempToken}bad`})
        .attach('file', exampleFile.file)
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.text).to.equal('UnauthorizedError');
          done();
        });
      });
    });

    describe('with no token', function(){
      before(done => statusMock.call(this, done));
      it('should respond with status 400', done => {
        request.post(`${url}/api/status/${this.tempStatus._id}/file`)
        .attach('file', exampleFile.file)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.text).to.equal('BadRequestError');
          done();
        });
      });
    });

    describe('with invalid statusID', function(){
      before(done => statusMock.call(this, done));
      it('should respond with status 404', done => {
        request.post(`${url}/api/status/${this.tempStatus._id}bad/file`)
        .set({Authorization: `Bearer ${this.tempToken}`})
        .attach('file', exampleFile.file)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.text).to.equal('NotFoundError');
          done();
        });
      });
    });

    describe('with no statusID', function(){
      before(done => statusMock.call(this, done));
      it('should respond with status 404', done => {
        request.post(`${url}/api/status/${this.tempStatus}bad/file`)
        .set({Authorization: `Bearer ${this.tempToken}`})
        .attach('file', exampleFile.file)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.text).to.equal('NotFoundError');
          done();
        });
      });
    });

    describe('testing POST for invalid user ID', function(){

      before(done => statusMock.call(this, done));
      before(done => userMock.call(this, done));

      it('should response with status 401 for unauthorized user', done => {
        request.post(`${url}/api/status/${this.tempStatus._id}/file`)
        .set({Authorization: `Bearer ${this.tempToken}`})
        .attach('file', exampleFile.file)
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(err.message).to.equal('Unauthorized');
          done();
        });
      });

    });
  });

  describe('testing DELETE /api/status/:statusID/file/:fileID', function(){
    describe('with valid token and ids', function(){
      before(done => fileMock.call(this, done));

      it('should respond with status 204', done => {
        request.delete(`${url}/api/status/${this.tempStatus._id}/file/${this.tempFile._id}`)
        .set({Authorization: `Bearer ${this.tempToken}`})
        .end((err, res) => {
          if (err)
            return done(err);
          expect(res.status).to.equal(204);
          done();
        });
      });
    });

    describe('with invalid token', function(){
      before(done => fileMock.call(this, done));
      it('should respond with status 401', done => {
        request.delete(`${url}/api/status/${this.tempStatus._id}/file/${this.tempFile._id}`)
        .set({Authorization: `Bearer ${this.tempToken}bad`})
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.text).to.equal('UnauthorizedError');
          done();
        });
      });
    });

    describe('with no token', function(){
      before(done => fileMock.call(this, done));
      it('should respond with status 400', done => {
        request.delete(`${url}/api/status/${this.tempStatus._id}/file/${this.tempFile._id}`)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.text).to.equal('BadRequestError');
          done();
        });
      });
    });

    describe('with no bearer auth', function(){
      before(done => fileMock.call(this, done));
      it('should respond with status 400', done => {
        request.delete(`${url}/api/status/${this.tempStatus._id}/file/${this.tempFile._id}`)
        .set({Authorization: 'invalid auth'})
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.text).to.equal('BadRequestError');
          done();
        });
      });
    });

    describe('with invalid statusID', function(){
      before(done => fileMock.call(this, done));
      it('should respond with status 400', done => {
        request.delete(`${url}/api/status/${this.tempStatus._id}bad/file/${this.tempFile._id}`)
        .set({Authorization: `Bearer ${this.tempToken}`})
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.text).to.equal('BadRequestError');
          done();
        });
      });
    });

    describe('with no statusID', function(){
      before(done => fileMock.call(this, done));
      it('should respond with status 400', done => {
        request.delete(`${url}/api/status/${this.tempStatus}bad/file/${this.tempFile._id}`)
        .set({Authorization: `Bearer ${this.tempToken}`})
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.text).to.equal('BadRequestError');
          done();
        });
      });
    });

    describe('with invalid fileID', function(){
      before(done => fileMock.call(this, done));
      it('should respond with status 404', done => {
        request.delete(`${url}/api/status/${this.tempStatus._id}/file/${this.tempFile._id}bad`)
        .set({Authorization: `Bearer ${this.tempToken}`})
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.text).to.equal('NotFoundError');
          done();
        });
      });
    });

    describe('testing DELETE for invalid user ID', function(){

      before(done => fileMock.call(this, done));
      before(done => userMock.call(this, done));

      it('should response with status 401 for unauthorized user', done => {
        request.delete(`${url}/api/status/${this.tempStatus._id}/file/${this.tempFile._id}`)
        .set({Authorization: `Bearer ${this.tempToken}`})
        .attach('file', exampleFile.file)
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(err.message).to.equal('Unauthorized');
          done();
        });
      });
    });
  });
});
