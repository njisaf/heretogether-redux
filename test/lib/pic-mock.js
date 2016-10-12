'use strict';

//npm modules
const debug = require('debug')('ht: pic-mock');

//app modules
const Pic = require('../../model/pic.js');
const awsMocks = require('./aws-mocks.js')
const profileMock = require('./profile-mock.js');

module.exports = function(done){
  debug('creating mock pic');
  let examplePicData = {
    name: 'picture',
    desc: 'its a picture',
    alt: 'this is hover text',
    imagePath: `${__dirname}/data/shield.png`,
    // username: 'fake',
    imageURI: 'fakeURI',
    objectKey: 'fakeKey',
    created: new Date(),
  };
  profileMock.call(this, err => {
    if (err) return done(err);
    examplePicData.picID = this.tempProfile.picID.toString();
    examplePicData.username = this.tempUser.username.toString();
    new Pic(examplePicData).save()
    .then( pic => {
      this.tempPic = pic;
      done();
    })
    .catch(done);
  });
};
