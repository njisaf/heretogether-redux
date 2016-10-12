'use strict';

//npm modules
const debug = require('debug')('ht: pic-mock');
const lorem = require('lorem-ipsum');

//app modules
const Pic = require('../../model/pic.js');
// const awsMocks = require('./aws-mocks.js');
const profileMock = require('./profile-mock.js');

module.exports = function(done){
  debug('creating mock pic');
  const tempObjKey = `${lorem({count: 2, unit:'word'}).split(' ').join('-')}.mp3`;
  const tempImageURI = `http://${lorem({count: 2, unit:'words'}).split(' ').join('-')}.com/{tempObjKey}`;
  let examplePicData = {
    name: 'picture',
    desc: 'its a picture',
    alt: 'this is hover text',
    username: ' ',
    imageURI: tempImageURI,
    objectKey: tempObjKey,
  };

  profileMock.call(this, err => {
    if (err) return done(err);
    examplePicData.username = this.tempUser.username;
    examplePicData.userID = this.tempUser._id;
    new Pic(examplePicData).save()
    .then( pic => {
      this.tempPic = pic;
      done();
    })
    .catch(done);
  });
};
