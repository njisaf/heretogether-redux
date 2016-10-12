'use strict';

require('./lib/test-env.js');

const expect = require('chai').expect;
const request = require('superagent');
const Promise = require('bluebird');
const mongoose = require('mongoose');

const serverCtrl = require('./lib/server-ctrl');
const cleanDB = require('./lib/clean-db');
const mockProfile = require('./lib/profile-mock');

mongoose.Promise = Promise;

const server = require('../server');
const url = `http://localhost:${process.env.PORT}`;

const examplePic = {
  name: 'picture',
  desc: 'its a picture',
  alt: 'this is hover text',
  image: `${__dirname}/data/shield.png`,
  imageURI: 'fakeURI',
  objectKey: 'fakeKey',
};



describe('testing PIC routes', function() {
  before(done => serverCtrl.serverUp(server, done));
  after(done => serverCtrl.serverDown(server, done));
  afterEach(done => cleanDB(done));

  describe('testing POST to /api/profile/:profileID/pic', function(){
    describe('with valid token and data', function(){

      before(done => mockProfile.call(this, done));

      it('should return a pic', (done) => {
        request.post(`${url}/api/profile/${this.tempProfile._id}/pic`)

        .set({Authorization: `Bearer ${this.tempToken}`})
        .field('name', examplePic.name)
        .field('desc', examplePic.desc)
        .field('alt', examplePic.alt)
        .attach('image', examplePic.image)
        .field('username', this.tempUser.username)
        // .field('userID', this.tempUser._id)
        .field('imageURI', examplePic.imageURI)
        .field('objectKey', examplePic.objectKey)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.name).to.equal(examplePic.name);
          expect(res.body.desc).to.equal(examplePic.desc);
          expect(res.body.alt).to.equal(examplePic.alt);
          //TODO: AWS mocks comparisons here
          done();
        });

      });
    });
  });
});
