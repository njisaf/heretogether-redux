'use strict';

require('./lib/test-env.js');

const expect = require('chai').expect;
const request = require('superagent');
const Promise = require('bluebird');
const mongoose = require('mongoose');

const serverCtrl = require('./lib/server-ctrl');
const cleanDB = require('./lib/clean-db');
const mockProfile = require('./lib/profile-mock');
const mockUser = require('./lib/user-mock');
const mockStatus = require('./lib/status-mock');
const mockStatusFile = require('./lib/status-file-mock');

mongoose.Promise = Promise;

const server = require('../server');
const url = `http://localhost:${process.env.PORT}`;

const exampleStatus = {
  text: 'Here is some text',
};

describe('Testing Status routes', function() {

  before(done => serverCtrl.serverUp(server, done));
  after(done => serverCtrl.serverDown(server, done));
  afterEach(done => cleanDB(done));

  //'Testing Status POST routes'
  //  'Testing POST with VALID IDs and VALID BODY'
  //  'Testing POST with INVALID TOKEN'
  //  'Testing POST with NO TOKEN'
  //  'Testing POST with VALID IDs and REPLYTO field'

  describe('Testing Status POST routes', function() {
    describe('Testing POST with VALID IDs and VALID BODY', function() {

      before(done => mockProfile.call(this, done));

      it('Should return a status of 200 and a status post', done => {
        request.post(`${url}/api/status`)
        .send({
          userID: this.tempUser._id,
          text: exampleStatus.text,
        })
        .set({Authorization: `Bearer ${this.tempToken}`})
        .end((err, res) => {
          if(err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.userID).to.equal(this.tempUser._id.toString());
          expect(res.body.text).to.equal(exampleStatus.text);
          done();
        });
      });
    });

    describe('Testing POST with INVALID TOKEN', function() {

      before(done => mockProfile.call(this, done));

      it('Should return a status of 401 for invalid token ', done => {
        request.post(`${url}/api/status`)
        .send({
          userID: this.tempUser._id,
          text: exampleStatus.text,
        })
        .set({Authorization: `Bearer ${this.tempToken}BADTOKEN`})
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(err.message).to.equal('Unauthorized');
          done();
        });
      });
    });

    describe('Testing POST with NO TOKEN', function() {

      before(done => mockProfile.call(this, done));

      it('Should return a status of 400 for no token ', done => {
        request.post(`${url}/api/status`)
        .send({
          userID: this.tempUser._id,
          text: exampleStatus.text,
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(err.message).to.equal('Bad Request');
          done();
        });
      });
    });

    describe('Testing POST with VALID IDs and REPLYTO field', function() {

      before(done => mockStatus.call(this, done));

      it('Should return a status of 200 and a status post', done => {
        request.post(`${url}/api/status`)
        .send({
          userID: this.tempUser._id,
          text: exampleStatus.text,
          replyTo: this.tempStatus._id,
        })
        .set({Authorization: `Bearer ${this.tempToken}`})
        .end((err, res) => {
          if(err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.userID).to.equal(this.tempUser._id.toString());
          expect(res.body.replyTo).to.equal(this.tempStatus._id.toString());
          expect(res.body.text).to.equal(exampleStatus.text);
          done();
        });
      });
    });

  });

  //'Testing Status GET routes'
  //  'Testing GET with VALID IDs'
  //  'Testing GET with VALID IDs and POPULATE FILE'
  //  'Testing GET with userID not matching'
  //  'Testing GET ALL STATUSES'
  //  'Testing GET ALL STATUSES and POPULATED FILES'
  //  'Testing GET ALL STATUSES but there are no statuses'
  //  'Testing GET with INVALID STATUS ID'
  //  'Testing GET with INVALID TOKEN'
  //  'Testing GET with NO TOKEN'

  describe('Testing Status GET routes', function() {
    describe('Testing GET with VALID IDs', function() {

      before(done => mockStatus.call(this, done));

      it('Should return a status of 200 and a status post', done => {
        request.get(`${url}/api/status/${this.tempStatus._id}`)
        .set({Authorization: `Bearer ${this.tempToken}`})
        .end((err, res) => {
          if(err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.userID).to.equal(this.tempUser._id.toString());
          done();
        });
      });
    });

    describe('Testing GET with VALID IDs and POPULATE FILE', function() {

      before(done => mockStatusFile.call(this, done));

      it('Should return a status of 200 and a status post w/ a file populated into fileID', done => {
        request.get(`${url}/api/status/${this.tempStatus._id}`)
        .set({Authorization: `Bearer ${this.tempToken}`})
        .end((err, res) => {
          if(err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.userID).to.equal(this.tempUser._id.toString());
          expect(res.body.fileID.fileURI).to.equal(this.tempFile.fileURI);
          done();
        });
      });
    });


    describe('Testing GET with userID not matching', function() {

      before(done => mockStatus.call(this, done));
      before(done => mockUser.call(this, done));

      it('Should return a status of 401', done => {
        request.get(`${url}/api/status/${this.tempStatus._id}`)
        .set({Authorization: `Bearer ${this.tempToken}`})
        .end((err, res) => {
          expect(res.status).to.equal(401);
          done();
        });
      });
    });

    describe('Testing GET ALL STATUSES', function() {

      before(done => mockStatus.call(this, done));

      it('Should return a status of 200 and an array of statuses', done => {
        request.get(`${url}/api/status/all`)
        .set({Authorization: `Bearer ${this.tempToken}`})
        .end((err, res) => {
          if(err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body[0].text).to.equal(this.tempStatus.text);
          expect(!!res.body.length).to.equal(true);
          done();
        });
      });
    });

    describe('Testing GET ALL STATUSES and POPULATED FILES', function() {

      before(done => mockStatusFile.call(this, done));

      it('Should return a status of 200 and an array of statuses', done => {
        request.get(`${url}/api/status/all`)
        .set({Authorization: `Bearer ${this.tempToken}`})
        .end((err, res) => {
          if(err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body[0].text).to.equal(this.tempStatus.text);
          expect(!!res.body.length).to.equal(true);
          expect(res.body[0].fileID._id).to.equal(this.tempFile._id.toString());
          done();
        });
      });
    });


    describe('Testing GET ALL STATUSES but there are no statuses', function() {

      before(done => mockUser.call(this, done));

      it('Should return a status of 200 and an empty array', done => {
        request.get(`${url}/api/status/all`)
        .set({Authorization: `Bearer ${this.tempToken}`})
        .end((err, res) => {
          if(err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.length).to.equal(0);
          done();
        });
      });
    });

    describe('Testing GET with INVALID STATUS ID', function() {

      before(done => mockStatus.call(this, done));

      it('Should return a status of 400 and an error message', done => {
        request.get(`${url}/api/status/${this.tempStatus._id}BadID/`)
        .set({Authorization: `Bearer ${this.tempToken}`})
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(err.message).to.equal('Bad Request');
          done();
        });
      });
    });

    describe('Testing GET with INVALID TOKEN', function() {

      before(done => mockStatus.call(this, done));

      it('Should return a status of 401 for invalid token', done => {
        request.get(`${url}/api/status/${this.tempStatus._id}`)
        .set({Authorization: `Bearer ${this.tempToken}badTOKEN`})
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(err.message).to.equal('Unauthorized');
          done();
        });
      });
    });

    describe('Testing GET with NO TOKEN', function() {

      before(done => mockStatus.call(this, done));

      it('Should return a status of 400 for no token', done => {
        request.get(`${url}/api/status/${this.tempStatus._id}`)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(err.message).to.equal('Bad Request');
          done();
        });
      });
    });

  });

  //'Testing Status DELETE routes'
  //  'Testing DELETE with VALID IDs'
  //  'Testing DELETE with VALID IDs and FILEID'
  //  'Testing DELETE with userID not matching'
  //  'Testing DELETE with NO TOKEN'
  //  'Testing DELETE with INVALID TOKEN'

  describe('Testing Status DELETE routes', function() {
    describe('Testing DELETE with VALID IDs', function() {

      before(done => mockStatus.call(this, done));

      it('Should return a status of 204', done => {
        request.delete(`${url}/api/status/${this.tempStatus._id}`)
        .set({Authorization: `Bearer ${this.tempToken}`})
        .end((err, res) => {
          if(err) return done(err);
          expect(res.status).to.equal(204);
          done();
        });
      });
    });

    describe('Testing DELETE with VALID IDs and FILEID', function() {

      before(done => mockStatusFile.call(this, done));

      it('Should return a status of 204', done => {
        request.delete(`${url}/api/status/${this.tempStatus._id}`)
        .set({Authorization: `Bearer ${this.tempToken}`})
        .end((err, res) => {
          if(err) return done(err);
          expect(res.status).to.equal(204);
          done();
        });
      });
    });


    describe('Testing DELETE with userID not matching', function() {

      before(done => mockStatus.call(this, done));
      before(done => mockUser.call(this, done));

      it('Should return a status of 401', done => {
        request.delete(`${url}/api/status/${this.tempStatus._id}`)
        .set({Authorization: `Bearer ${this.tempToken}`})
        .end((err, res) => {
          expect(res.status).to.equal(401);
          done();
        });
      });
    });

    describe('Testing DELETE with NO TOKEN', function() {

      before(done => mockStatus.call(this, done));

      it('Should return a status of 400 for no token given', done => {
        request.delete(`${url}/api/status/${this.tempStatus._id}`)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(err.message).to.equal('Bad Request');
          done();
        });
      });
    });

    describe('Testing DELETE with INVALID TOKEN', function() {

      before(done => mockStatus.call(this, done));

      it('Should return a status of 401 for invalid token', done => {
        request.delete(`${url}/api/status/${this.tempStatus._id}`)
        .set({Authorization: `Bearer ${this.tempToken}badTOKEN`})
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(err.message).to.equal('Unauthorized');
          done();
        });
      });
    });

  });

  //'Testing Status PUT routes'
  //  'Testing PUT with VALID IDs and VALID BODY'
  //  'Testing PUT with INVALID STATUS ID'
  //  'Testing PUT with INVALID TOKEN'
  //  'Testing PUT with NO TOKEN'
  //  'Testing PUT with userID not matching'

  describe('Testing Status PUT routes', function() {

    describe('Testing PUT with VALID IDs and VALID BODY', function() {

      before(done => mockStatus.call(this, done));

      it('Should return a status of 200 and an updated status post', done => {
        request.put(`${url}/api/status/${this.tempStatus._id}`)
        .send({
          userID: this.tempUser._id,
          text: 'This is updated text',
        })
        .set({Authorization: `Bearer ${this.tempToken}`})
        .end((err, res) => {
          if(err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.text).to.equal('This is updated text');
          done();
        });
      });
    });

    describe('Testing PUT with INVALID STATUS ID', function() {

      before(done => mockStatus.call(this, done));

      it('Should return a status of 404 for status ID mismatch', done => {
        request.put(`${url}/api/status/${this.tempStatus._id}badID`)
        .send({
          userID: this.tempUser._id,
          text: 'This is updated text',
        })
        .set({Authorization: `Bearer ${this.tempToken}`})
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(err.message).to.equal('Not Found');
          done();
        });
      });
    });

    describe('Testing PUT with INVALID TOKEN', function() {

      before(done => mockStatus.call(this, done));

      it('Should return a status of 401 for invalid token', done => {
        request.put(`${url}/api/status/${this.tempStatus._id}`)
        .set({Authorization: `Bearer ${this.tempToken}badTOKEN`})
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(err.message).to.equal('Unauthorized');
          done();
        });
      });
    });

    describe('Testing PUT with NO TOKEN', function() {

      before(done => mockStatus.call(this, done));

      it('Should return a status of 400 for no token', done => {
        request.put(`${url}/api/status/${this.tempStatus._id}`)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(err.message).to.equal('Bad Request');
          done();
        });
      });
    });

    describe('Testing PUT with userID not matching', function() {

      before(done => mockStatus.call(this, done));
      before(done => mockUser.call(this, done));

      it('Should return a status of 401', done => {
        request.put(`${url}/api/status/${this.tempStatus._id}`)
        .send({
          userID: this.tempUser._id,
          text: 'This is updated text',
        })
        .set({Authorization: `Bearer ${this.tempToken}`})
        .end((err, res) => {
          expect(res.status).to.equal(401);
          done();
        });
      });
    });
  });
});
