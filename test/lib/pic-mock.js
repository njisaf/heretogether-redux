'use strict';

//npm modules
const debug = require('debug')('ht: pic-mock');

//app modules
const Pic = require('../../model/pic.js');
const awsMocks = require('./aws-mocks.js');
const profileMock = require('./profile-mock.js');

module.exports = function(done){
  debug('creating mock pic');
  let examplePicData = {
    name: 'picture',
    desc: 'its a picture',
    alt: 'this is hover text',
    username: ' ',
    imageURI: awsMocks.uploadMock.Location,
    objectKey: awsMocks.uploadMock.Key,
    created: new Date(),
  };

  profileMock.call(this, err => {
    if (err) return done(err);
    examplePicData.username = this.tempUser.username;
    new Pic(examplePicData).save()
    .then( pic => {
      this.tempPic = pic;
      done();
    })
    .catch(done);
  });
};
