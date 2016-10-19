'use strict';

require('./aws-mocks.js');

const debug = require('debug')('ht: pic-mock');
const lorem = require('lorem-ipsum');

const Pic = require('../../model/pic.js');
const profileMock = require('./profile-mock.js');

module.exports = function(done){
  debug('creating mock pic');
  const tempObjKey = `${lorem({count: 2, unit:'word'}).split(' ').join('-')}.mp3`;
  const tempImageURI = `http://${lorem({count: 2, unit:'words'}).split(' ').join('-')}.com/{tempObjKey}`;
  let examplePicData = {
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
