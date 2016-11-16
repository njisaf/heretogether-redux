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
const mockProfilePic = require('./lib/profile-pic-mock');
const mockFakeHospital = require('./lib/fake-hospital-mock');


mongoose.Promise = Promise;

const server = require('../server');
const url = `http://localhost:${process.env.PORT}`;

const exampleProfile = {
  profileName: 'Name',
  bio: 'Bio',
};

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
          profileName: exampleProfile.profileName,
          userID: `${this.tempUser._id}`,
          bio: exampleProfile.bio,
          hospitalID: `${this.tempHospital._id}`,
        })
        .set({Authorization: `Bearer ${this.tempToken}`})
        .end((err, res) => {
          if(err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.profileName).to.equal(exampleProfile.profileName);
          expect(res.body.bio).to.equal(exampleProfile.bio);
          done();
        });
      });
    });

    describe('Testing POST with VALID IDs but NO HOSPITAL', function() {

      before(done => mockUser.call(this, done));
      before(done => mockFakeHospital.call(this, done));

      it('Should return a status of 404 and an error message', done => {
        request.post(`${url}/api/hospital/${this.tempHospital._id}/profile`)
        .send({
          profileName: exampleProfile.profileName,
          userID: `${this.tempUser._id}`,
          bio: exampleProfile.bio,
          hospitalID: `${this.tempHospital._id}`,
        })
        .set({Authorization: `Bearer ${this.tempToken}`})
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.text).to.equal('NotFoundError');
          done();
        });
      });
    });


    describe('Testing POST with VALID hospitalID, VALID BODY, but NO AUTHORIZATION', function() {

      before(done => mockUser.call(this, done));
      before(done => mockHospital.call(this, done));

      it('Should return a status of 400 and an error message', done => {
        request.post(`${url}/api/hospital/${this.tempHospital._id}/profile`)
        .send({
          profileName: exampleProfile.profileName,
          userID: `${this.tempUser._id}`,
          bio: exampleProfile.bio,
          hospitalID: `${this.tempHospital._id}`,
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.text).to.equal('BadRequestError');
          done();
        });
      });
    });


    describe('Testing POST with VALID hospitalID and INVALID BODY', function() {

      before(done => mockUser.call(this, done));
      before(done => mockHospital.call(this, done));

      it('Should return a status of 400 and an error message', done => {
        request.post(`${url}/api/hospital/${this.tempHospital._id}/profile`)
        .set('Content-type', 'application/json')
        .send('This is a string')
        .set({Authorization: `Bearer ${this.tempToken}`})
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.text).to.equal('SyntaxError');
          done();
        });
      });
    });

    describe('Testing POST with NON-MATCHING hospitalID and VALID BODY', function() {

      before(done => mockUser.call(this, done));
      before(done => mockHospital.call(this, done));

      it('Should return a status of 404 and an error message', done => {
        request.post(`${url}/api/hospital/1234/profile`)
        .send({
          profileName: exampleProfile.profileName,
          userID: `${this.tempUser._id}`,
          bio: exampleProfile.bio,
          hospitalID: `${this.tempHospital._id}`,
        })
        .set({Authorization: `Bearer ${this.tempToken}`})
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.text).to.equal('NotFoundError');
          done();
        });
      });
    });

    describe('Testing POST with MISSING hospitalID and VALID BODY', function() {

      before(done => mockUser.call(this, done));
      before(done => mockHospital.call(this, done));

      it('Should return a status of 404 and an error message', done => {
        request.post(`${url}/api/hospital/1234/profile`)
        .send({
          profileName: exampleProfile.profileName,
          userID: `${this.tempUser._id}`,
          bio: exampleProfile.bio,
          hospitalID: '1234',
        })
        .set({Authorization: `Bearer ${this.tempToken}`})
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.text).to.equal('NotFoundError');
          done();
        });
      });
    });

  });


  describe('Testing GET /api/hospital/:hospitalID/profile/:profileID', function() {

    describe('Testing GET with VALID hospitalID and VALID profileID', function() {

      before(done => mockProfile.call(this, done));

      it('Should return a status of 200 and a profile', done => {
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

    describe('Testing GET with VALID hospitalID, VALID profileID and POPULATE PIC', function() {

      before(done => mockProfilePic.call(this, done));

      it('Should return a status of 200 and a profile w/ a pic populated into picID', done => {
        request.get(`${url}/api/hospital/${this.tempHospital._id}/profile/${this.tempProfile._id}`)
        .set({Authorization: `Bearer ${this.tempToken}`})
        .end((err, res) => {
          if(err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.profileName).to.equal(this.tempProfile.profileName);
          expect(res.body.bio).to.equal(this.tempProfile.bio);
          expect(res.body.hospitalID).to.equal(this.tempHospital._id.toString());
          expect(res.body.userID).to.equal(this.tempUser._id.toString());
          expect(res.body.picID.imageURI).to.equal(this.tempPic.imageURI);
          done();
        });
      });
    });

    describe('Testing GET with VALID hospitalID and INVALID profileID', function() {

      before(done => mockProfile.call(this, done));

      it('Should return a status of 400 and an error message', done => {
        request.get(`${url}/api/hospital/${this.tempHospital._id}/profile/1234`)
        .set({Authorization: `Bearer ${this.tempToken}`})
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.text).to.equal('BadRequestError');
          done();
        });
      });
    });

    describe('Testing GET with INVALID hospitalID and VALID profileID', function() {

      before(done => mockProfile.call(this, done));

      it('Should return a status of 404 and an error message', done => {
        request.get(`${url}/api/hospital/1234/profile/${this.tempProfile._id}`)
        .set({Authorization: `Bearer ${this.tempToken}`})
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.text).to.equal('NotFoundError');
          done();
        });
      });
    });



    describe('Testing GET ALL (NO STATUS ID)', function() {

      before(done => mockProfile.call(this, done));

      it('Should return a status of 200 and an array of statuses', done => {
        request.get(`${url}/api/hospital/${this.tempHospital._id}/all/profile/`)
        .set({Authorization: `Bearer ${this.tempToken}`})
        .end((err, res) => {
          if(err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body[0].profileName).to.equal(this.tempProfile.profileName);
          expect(res.body[0].bio).to.equal(this.tempProfile.bio);
          expect(!!res.body.length).to.equal(true);
          done();
        });
      });
    });

    describe('Testing GET ALL (NO STATUS ID) with POPULATE PICID', function() {

      before(done => mockProfilePic.call(this, done));

      it('Should return a status of 200 and an array of statuses w/ pic populated in picID', done => {
        request.get(`${url}/api/hospital/${this.tempHospital._id}/all/profile/`)
        .set({Authorization: `Bearer ${this.tempToken}`})
        .end((err, res) => {
          if(err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body[0].profileName).to.equal(this.tempProfile.profileName);
          expect(res.body[0].bio).to.equal(this.tempProfile.bio);
          expect(res.body[0].picID._id).to.equal(this.tempPic._id.toString());
          expect(!!res.body.length).to.equal(true);
          done();
        });
      });
    });


    describe('Testing GET ALL with VALID HOSPITAL but NO PROFILE POSTS', function() {

      before(done => mockUser.call(this, done));
      before(done => mockHospital.call(this, done));

      it('Should return a status of 200 and an empty array', done => {
        request.get(`${url}/api/hospital/${this.tempHospital._id}/all/profile/`)
        .set({Authorization: `Bearer ${this.tempToken}`})
        .end((err, res) => {
          if(err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.length).to.equal(0);
          done();
        });
      });
    });

    describe('Testing GET ALL with INVALID HOSPITALID', function() {

      before(done => mockProfile.call(this, done));

      it('Should return a status of 404 and an error message', done => {
        request.get(`${url}/api/hospital/1243/all/profile/`)
        .set({Authorization: `Bearer ${this.tempToken}`})
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.text).to.equal('NotFoundError');
          done();
        });
      });
    });

    describe('Testing GET with VALID IDs but NO AUTHORIZATION', function() {

      before(done => mockProfile.call(this, done));

      it('Should return a status of 400 and an error message', done => {
        request.get(`${url}/api/hospital/${this.tempHospital._id}/profile/${this.tempProfile._id}`)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.text).to.equal('BadRequestError');
          done();
        });
      });
    });


  });

  describe('Testing DELETE /api/hospital/:hospitalID/profile/:profileID', function() {

    describe('Testing DELETE with VALID hospitalID and VALID profileID', function() {

      before(done => mockProfile.call(this, done));

      it('Should return a status of 204', done => {
        request.delete(`${url}/api/hospital/${this.tempHospital._id}/profile/${this.tempProfile._id}`)
        .set({Authorization: `Bearer ${this.tempToken}`})
        .end((err, res) => {
          if(err) return done(err);
          expect(res.status).to.equal(204);
          done();
        });
      });
    });

    describe('Testing DELETE with VALID IDS but USER NOT AUTHORIZED', function() {

      before(done => mockProfile.call(this, done));
      before(done => mockUser.call(this, done));

      it('Should return a status of 401 and an error message', done => {
        request.delete(`${url}/api/hospital/${this.tempHospital._id}/profile/${this.tempProfile._id}`)
        .set({Authorization: `Bearer ${this.tempToken}`})
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.text).to.equal('UnauthorizedError');
          done();
        });
      });
    });

  });


  describe('Testing DELETE /api/hospital/:hospitalID/profile/:profileID', function() {

    describe('Testing DELETE with VALID hospitalID, VALID profileID and a valid PICID', function() {

      before(done => mockProfilePic.call(this, done));

      it('Should return a status of 204', done => {
        request.delete(`${url}/api/hospital/${this.tempHospital._id}/profile/${this.tempProfile._id}`)
        .set({Authorization: `Bearer ${this.tempToken}`})
        .end((err, res) => {
          if(err) return done(err);
          expect(res.status).to.equal(204);
          done();
        });
      });
    });

    describe('Testing DELETE with VALID hospitalID and INVALID profileID', function() {

      before(done => mockProfile.call(this, done));

      it('Should return a status of 404 and an error message', done => {
        request.delete(`${url}/api/hospital/${this.tempHospital._id}/profile/1234`)
        .set({Authorization: `Bearer ${this.tempToken}`})
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.text).to.equal('NotFoundError');
          done();
        });
      });
    });

    describe('Testing DELETE with INVALID hospitalID and VALID profileID', function() {

      before(done => mockProfile.call(this, done));

      it('Should return a status of 404 and an error message', done => {
        request.delete(`${url}/api/hospital/1234/profile/${this.tempProfile._id}`)
        .set({Authorization: `Bearer ${this.tempToken}`})
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.text).to.equal('NotFoundError');
          done();
        });
      });
    });

  });


  describe('Testing PUT /api/hospital/:hospitalID/profile/:profileID', function() {

    describe('Testing PUT with VALID hospitalID, VALID profileID and VALID BODY', function() {

      before(done => mockProfile.call(this, done));

      it('Should return a status of 200 and a profile', done => {
        request.put(`${url}/api/hospital/${this.tempHospital._id}/profile/${this.tempProfile._id}`)
        .set({Authorization: `Bearer ${this.tempToken}`})
        .send({
          profileName: 'Alice Islittle',
          userID: `${this.tempUser._id}`,
          bio: 'My name is Alice and I love being little!',
          hospitalID: `${this.tempHospital._id}`,
        })
        .end((err, res) => {
          if(err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.profileName).to.equal('Alice Islittle');
          expect(res.body.bio).to.equal('My name is Alice and I love being little!');
          expect(res.body.hospitalID).to.equal(this.tempHospital._id.toString());
          expect(res.body.userID).to.equal(this.tempUser._id.toString());
          done();
        });
      });
    });

    describe('Testing PUT with VALID EVERYTHING but USER NOT AUTHORIZED to put this profile', function() {

      before(done => mockProfile.call(this, done));
      before(done => mockUser.call(this, done));

      it('Should return a status of 401 and an error message', done => {
        request.put(`${url}/api/hospital/${this.tempHospital._id}/profile/${this.tempProfile._id}`)
        .set({Authorization: `Bearer ${this.tempToken}`})
        .send({
          profileName: 'Alice Islittle',
          userID: `${this.tempUser._id}`,
          bio: 'My name is Alice and I love being little!',
          hospitalID: `${this.tempHospital._id}`,
        })
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.text).to.equal('UnauthorizedError');
          done();
        });
      });
    });



    describe('Testing PUT with VALID hospitalID, INVALID profileID and VALID BODY', function() {

      before(done => mockProfile.call(this, done));

      it('Should return a status of 401 and an error message', done => {
        request.put(`${url}/api/hospital/${this.tempHospital._id}/profile/1234`)
        .set({Authorization: `Bearer ${this.tempToken}`})
        .send({
          profileName: 'Alice Islittle',
          userID: `${this.tempUser._id}`,
          bio: 'My name is Alice and I love being little!',
          hospitalID: `${this.tempHospital._id}`,
        })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.text).to.equal('NotFoundError');
          done();
        });
      });
    });

    describe('Testing PUT with INVALID hospitalID, VALID profileID and VALID BODY', function() {

      before(done => mockProfile.call(this, done));

      it('Should return a status of 401 and an error message', done => {
        request.put(`${url}/api/hospital/1234/profile/${this.tempProfile._id}`)
        .set({Authorization: `Bearer ${this.tempToken}`})
        .send({
          profileName: 'Alice Islittle',
          userID: `${this.tempUser._id}`,
          bio: 'My name is Alice and I love being little!',
          hospitalID: `${this.tempHospital._id}`,
        })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.text).to.equal('NotFoundError');
          done();
        });
      });
    });

    describe('Testing PUT with VALID hospitalID, VALID profileID and INCORRECT BODY', function() {

      before(done => mockProfile.call(this, done));

      it('Should return a status of 200 and a profile with no updates made', done => {
        request.put(`${url}/api/hospital/${this.tempHospital._id}/profile/${this.tempProfile._id}`)
        .set({Authorization: `Bearer ${this.tempToken}`})
        .set('Content-type', 'application/json')
        .send({
          userName: 'Alice Islittle',
          userID: `${this.tempUser._id}`,
          biography: 'My name is Alice and I love being little!',
          hospitalID: `${this.tempHospital._id}`,
        })
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.profileName).to.equal(this.tempProfile.profileName);
          expect(res.body.bio).to.equal(this.tempProfile.bio);
          expect(res.body.hospitalID).to.equal(this.tempHospital._id.toString());
          expect(res.body.userID).to.equal(this.tempUser._id.toString());
          done();
        });
      });
    });

    describe('Testing PUT with VALID hospitalID, VALID profileID and INVALID BODY', function() {

      before(done => mockProfile.call(this, done));

      it('Should return a status of 400 and an error message', done => {
        request.put(`${url}/api/hospital/${this.tempHospital._id}/profile/${this.tempProfile._id}`)
        .set({Authorization: `Bearer ${this.tempToken}`})
        .set('Content-type', 'application/json')
        .send('Please update my profileName to Testname!')
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.text).to.equal('SyntaxError');
          done();
        });
      });
    });
  });
});
