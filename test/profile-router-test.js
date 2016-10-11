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
const mockHospital = require('./lib/hospital-mock');

mongoose.Promise = Promise;

const server = require('../server');
const url = `http://localhost:${process.env.PORT}`;

describe('Testing Profile routes', function() {

  before(done => serverCtrl.serverUp(server, done));
  after(done => serverCtrl.serverDown(server, done));
  afterEach(done => cleanDB(done));

  describe('Testing POST /api/hospital/:hospitalID/profile', function() {

    describe('Testing POST with VALID hospitalID and VALID BODY', function() {

      before(done => mockUser.call(this, done));
      before(done => mockHospital.call(this, done));

      it('Should return a status of 200 and a profile', done => {
        request.post(`${url}/api/hospital/${this.tempHospital._id}/profile`)
        .send({
          profileName: 'Werner Poorlyboy',
          userID: `${this.tempUser._id}`,
          bio: 'My name is Werner and I am a sick child in a hospital!',
          hospitalID: `${this.tempHospital._id}`,
        })
        .set({Authorization: `Bearer ${this.tempToken}`})
        .end((err, res) => {
          if(err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.profileName).to.equal('Werner Poorlyboy');
          expect(res.body.bio).to.equal('My name is Werner and I am a sick child in a hospital!');
          done();
        });
      });
    });
  });


  describe('Testing GET /api/hospital/:hospitalID/profile/:profileID', function() {

    describe('Testing GET with VALID hospitalID and VALID profileID', function() {

      // before(done => mockUser.call(this, done));
      before(done => mockProfile.call(this, done));

      it('Should return a status of 200 and a profile', done => {
        console.log('tempToken', this.tempToken);
        console.log('tempProfile', this.tempProfile);
        console.log('tempUser', this.tempUser);
        console.log('tempHospital', this.tempHospital);
        request.get(`${url}/api/hospital/${this.tempHospital._id}/profile/${this.tempProfile._id}`)
        .set({Authorization: `Bearer ${this.tempToken}`})
        .end((err, res) => {
          if(err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.profileName).to.equal(this.tempProfile.profileName);
          expect(res.body.bio).to.equal(this.tempProfile.bio);
          expect(res.body.hospitalID).to.equal(this.tempHospital._id.toString());
          expect(res.body.userID).to.equal(this.tempUser._id.toString());
          done();
        });
      });
    });
  });

});
