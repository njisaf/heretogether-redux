'use strict';

const debug = require('debug')('ht: profile-mock');
const lorem = require('lorem-ipsum');

const Profile = require('../../model/profile');
const Pic = require('../../model/pic');
const userMock = require('./user-mock');
const hospitalMock = require('./hospital-mock');

module.exports = function(done){
  debug('Creating mock profile with pic associated');

  let profileName = lorem({count: 2, units: 'word'}).split(' ').join('-');
  let bio = lorem({count: 3, units: 'sentences', sentenceLowerBound: 5, sentenceUpperBound: 15});

  let exampleProfile = {
    profileName,
    bio,
  };

  const tempObjKey = `${lorem({count: 2, unit:'word'}).split(' ').join('-')}.mp3`;
  const tempImageURI = `http://${lorem({count: 2, unit:'words'}).split(' ').join('-')}.com/{tempObjKey}`;
  let examplePicData = {
    username: ' ',
    imageURI: tempImageURI,
    objectKey: tempObjKey,
  };



  userMock.call(this, err => {
    if (err) return done (err);
    exampleProfile.userID = this.tempUser._id.toString();
    examplePicData.username = this.tempUser.username;
    examplePicData.userID = this.tempUser._id.toString();
    hospitalMock.call(this, err => {
      if (err) return done (err);
      exampleProfile.hospitalID = this.tempHospital._id.toString();
      return new Pic(examplePicData).save()
      .then(pic => {
        this.tempPic = pic;
        exampleProfile.picID = this.tempPic._id.toString();
        return new Profile(exampleProfile).save();
      })
      .then(profile => {
        this.tempProfile = profile;
        done();
      })
      .catch(done);

    });
  });
};
