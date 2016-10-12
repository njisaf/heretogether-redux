'use strict';

require('./lib/test-env.js');

const expect = require('chai').expect;
const request = require('superagent');
const Promise = require('bluebird');
const mongoose = require('mongoose');

const serverCtrl = require('./lib/server-ctrl');
const cleanDB = require('./lib/clean-db');
const mockProfile = require('./lib/profile-mock');
const mockStatus = require('./lib/status-mock');

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

  describe('Testing Status POST routes', function() {
    describe('Testing POST with VALID IDs and VALID BODY', function() {

      before(done => mockProfile.call(this, done));

      it('Should return a status of 200 and a status post', done => {
        request.post(`${url}/api/hospital/${this.tempHospital._id}/status`)
        .send({
          userID: this.tempUser._id,
          text: exampleStatus.text,
          hospitalID: this.tempHospital._id,
        })
        .set({Authorization: `Bearer ${this.tempToken}`})
        .end((err, res) => {
          if(err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.userID).to.equal(this.tempUser._id.toString());
          expect(res.body.hospitalID).to.equal(this.tempHospital._id.toString());
          expect(res.body.text).to.equal(exampleStatus.text);
          done();
        });
      });
    });
  });

  describe('Testing Status GET routes', function() {
    describe('Testing GET with VALID IDs', function() {

      before(done => mockStatus.call(this, done));

      it('Should return a status of 200 and a status post', done => {
        request.get(`${url}/api/hospital/${this.tempHospital._id}/status/${this.tempStatus._id}`)
        .set({Authorization: `Bearer ${this.tempToken}`})
        .end((err, res) => {
          if(err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.userID).to.equal(this.tempUser._id.toString());
          expect(res.body.hospitalID).to.equal(this.tempHospital._id.toString());
          done();
        });
      });
    });
  });

  describe('Testing Status DELETE routes', function() {
    describe('Testing DELETE with VALID IDs', function() {

      before(done => mockStatus.call(this, done));

      it('Should return a status of 204', done => {
        request.delete(`${url}/api/hospital/${this.tempHospital._id}/status/${this.tempStatus._id}`)
        .set({Authorization: `Bearer ${this.tempToken}`})
        .end((err, res) => {
          if(err) return done(err);
          expect(res.status).to.equal(204);
          done();
        });
      });
    });
  });

  describe('Testing Status PUT routes', function() {
    describe('Testing PUT with VALID IDs and VALID BODY', function() {

      before(done => mockStatus.call(this, done));

      it('Should return a status of 200 and an updated status post', done => {
        request.put(`${url}/api/hospital/${this.tempHospital._id}/status/${this.tempStatus._id}`)
        .send({
          userID: this.tempUser._id,
          text: 'This is updated text',
          hospitalID: this.tempHospital._id,
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
  });


});
