'use strict';

require('./lib/test-env.js');
const awsMocks = require('./lib/aws-mocks');


const expect = require('chai').expect;
const request = require('superagent');
const Promise = require('bluebird');
const mongoose = require('mongoose');
const debug = require('debug')('ht: pic-router-test');


const serverCtrl = require('./lib/server-ctrl');
const cleanDB = require('./lib/clean-db');
const mockProfile = require('./lib/profile-mock');
const mockPic = require('./lib/pic-mock');

mongoose.Promise = Promise;

const server = require('../server');
const url = `http://localhost:${process.env.PORT}`;

const examplePic = {
  image: `${__dirname}/data/shield.png`,
};



describe('testing PIC routes', function() {
  debug();
  before(done => serverCtrl.serverUp(server, done));
  after(done => serverCtrl.serverDown(server, done));
  afterEach(done => cleanDB(done));

  describe('testing POST to /api/profile/:profileID/pic', function(){
    describe('with valid token and data', function(){

      before(done => mockProfile.call(this, done));

      it('should return a pic', (done) => {
        request.post(`${url}/api/profile/${this.tempProfile._id}/pic`)

        .set({Authorization: `Bearer ${this.tempToken}`})
        .attach('image', examplePic.image)
        .field('username', this.tempUser.username)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          //TODO: AWS mocks comparisons here
          expect(res.body.imageURI).to.equal(awsMocks.uploadMock.Location);
          expect(res.body.objectKey).to.equal(awsMocks.uploadMock.Key);
          done();
        });
      });
    });
  });


  describe('no image attached', function(){
    before(done => mockProfile.call(this, done));

    it('should respond with status 400', done => {
      request.post(`${url}/api/profile/${this.tempProfile._id}/pic`)
        .set({Authorization: `Bearer ${this.tempToken}`})
        .field('username', this.tempUser.username)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.text).to.equal('BadRequestError');
          done();
        });
    });
  });

  describe('with invalid token', function(){
    before(done => mockProfile.call(this, done));

    it('should response with status 401', done => {
      request.post(`${url}/api/profile/${this.tempProfile._id}/pic`)
        .set({Authorization: `Bearer ${this.tempToken}badtoken`})
        .field('username', this.tempUser.username)
        .attach('image', examplePic.image)
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.text).to.equal('UnauthorizedError');
          done();
        });
    });
  });

  describe('with invalid profile ID', function(){
    before(done => mockProfile.call(this, done));

    it('should response with status 404', done => {
      request.post(`${url}/api/profile/${this.tempProfile._id}badID/pic`)
        .set({Authorization: `Bearer ${this.tempToken}`})
        .field('username', this.tempUser.username)
        .attach('image', examplePic.image)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.text).to.equal('NotFoundError');
          done();
        });
    });
  });

  //DELETE routes
  describe('testing DELETE routes to /api/profile/:profileID/pic/:picID', function(){
    describe('with successful deletion', function(){
      before(done => mockPic.call(this, done));
      it('should return status 204', (done) => {
        request.delete(`${url}/api/profile/${this.tempProfile._id}/pic/${this.tempPic._id}`)
       .set({Authorization: `Bearer ${this.tempToken}`})
       .end((err, res) => {
         if (err) return done(err);
         console.log('HBHFBDHGBHDHBDFHBFD ', res.body);
         expect(res.status).to.equal(204);
         done();
       });
      });
    });
  });

});
