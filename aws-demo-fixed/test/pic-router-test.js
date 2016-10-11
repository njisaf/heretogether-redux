'use strict';

const AWSmocks = require('./lib/aws-mocks'); //must happen first, literally overrides the S3 constructor in the function

const request = require('superagent');
const expect = require('chai').expect;
const debug = require('debug')('cuttlefish:pic-router-test');
const Promise = require('bluebird');

const Pic = require('../model/pic');
const Gallery = require('../model/gallery');
const User = require('../model/user');
const serverControl = require('./lib/server-control');

const server = require('../server');

const url = 'http://localhost:3000';

const exampleUser = {
  username: 'busta',
  password: '123',
  email: 'b.fish@fish.com',
};

const exampleGallery = {
  name: 'Experiment 15 (partial failure)',
  desc: 'Suppurating pit',
};

const examplePic = {
  name: 'Dr. Samson',
  desc: 'Lead Researcher of Project Cuttlefish',
  image: `${__dirname}/data/baby_rhino.jpg`,
};

const examplePicData = {
  name: 'Subject Alpha-15',
  desc: 'Skin inversion',
  created: new Date(),
  imageURI: AWSmocks.uploadMock.Location,
  objectKey: AWSmocks.uploadMock.Key,
};

describe('Testing pic router', function() {
  before(done => serverControl.serverUp(server, done));
  after(done => serverControl.serverDown(server, done));

  afterEach(done => {
    debug('Cleaning all afterEach');
    Promise.all([
      User.remove({}),
      Gallery.remove({}),
      Pic.remove({}),
    ])
    .then(() => done())
    .catch(done);
  });

  describe('Testing POST /api/gallery/:id/pic', function() {
    describe('With VALID token and data', function() {

      before(done => {
        debug('Creating tempuser and temptoken');
        new User(exampleUser).generatePasswordHash(exampleUser.password)
        .then(user => user.save())
        .then(user => {
          this.tempuser = user;
          return user.generateToken();
        })
        .then(token => {
          this.temptoken = token;
          done();
        })
        .catch(done);
      });

      before(done => {
        debug('Creating tempgallery');
        exampleGallery.userID = this.tempuser._id.toString();
        new Gallery(exampleGallery).save()
        .then(gallery => {
          this.tempgallery = gallery;
          done();
        })
        .catch(done);
      });

      before(done => {
        debug('Creating temppic');
        examplePicData.userID = this.tempuser._id.toString();
        examplePicData.galleryID = this.tempgallery._id.toString();
        new Pic(examplePicData).save()
        .then(pic => {
          this.temppic = pic;
          done();
        })
        .catch(done);
      });

      after(() => {
        debug('Cleaning exampleGallery');
        delete exampleGallery.userID;
      });


      it('Should return a pic', done => {
        request.post(`${url}/api/gallery/${this.tempgallery._id}/pic`)
        .set({Authorization: `Bearer ${this.temptoken}`})
        .field('name', examplePic.name)
        .field('desc', examplePic.desc)
        .attach('image', examplePic.image)
        .then(res => {
          console.log('should be pic', res.body);
          expect(res.statusCode).to.equal(200);
          expect(res.body.name).to.equal(examplePic.name);
          expect(res.body.desc).to.equal(examplePic.desc);
          expect(res.body.galleryID).to.equal(this.tempgallery._id.toString());
          expect(res.body.imageURI).to.equal(AWSmocks.uploadMock.Location);
          expect(res.body.objectKey).to.equal(AWSmocks.uploadMock.Key);
          done();
        })
        .catch(done);
      });
    });
  });

  describe('With VALID token and data', function() {

    before(done => {
      debug('Creating tempuser and temptoken');
      new User(exampleUser).generatePasswordHash(exampleUser.password)
      .then(user => user.save())
      .then(user => {
        this.tempuser = user;
        return user.generateToken();
      })
      .then(token => {
        this.temptoken = token;
        done();
      })
      .catch(done);
    });

    before(done => {
      debug('Creating tempgallery');
      exampleGallery.userID = this.tempuser._id.toString();
      new Gallery(exampleGallery).save()
      .then(gallery => {
        this.tempgallery = gallery;
        done();
      })
      .catch(done);
    });

    after(() => {
      debug('Cleaning exampleGallery');
      delete exampleGallery.userID;
    });


    it('Should return a pic', done => {
      request.post(`${url}/api/gallery/${this.tempgallery._id}/pic`)
      .set({Authorization: `Bearer ${this.temptoken}`})
      .field('name', examplePic.name)
      .field('desc', examplePic.desc)
      .attach('image', examplePic.image)
      .then(res => {
        console.log('should be pic', res.body);
        expect(res.statusCode).to.equal(200);
        expect(res.body.name).to.equal(examplePic.name);
        expect(res.body.desc).to.equal(examplePic.desc);
        expect(res.body.galleryID).to.equal(this.tempgallery._id.toString());
        expect(res.body.imageURI).to.equal(AWSmocks.uploadMock.Location);
        expect(res.body.objectKey).to.equal(AWSmocks.uploadMock.Key);
        done();
      })
      .catch(done);
    });
  });
});
