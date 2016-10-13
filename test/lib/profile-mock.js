'use strict';

const debug = require('debug')('ht: profile-mock');
const lorem = require('lorem-ipsum');

const Profile = require('../../model/profile');
const hospitalMock = require('./hospital-mock');
const userMock = require('./user-mock');


module.exports = function(done){
  debug('creating mock profile');

  let profileName = lorem({count: 2, units: 'word'}).split(' ').join('-');
  let bio = lorem({count: 3, units: 'sentences', sentenceLowerBound: 5, sentenceUpperBound: 15});

  let exampleProfile = {
    profileName,
    bio,
  };

  userMock.call(this, err => {
    if (err) return done (err);
    exampleProfile.userID = this.tempUser._id.toString();

    hospitalMock.call(this, err => {
      if (err) return done (err);
      exampleProfile.hospitalID = this.tempHospital._id.toString();

      new Profile(exampleProfile).save()
      .then( profile => {
        this.tempProfile = profile;
        done();
      })
      .catch(done);
    });
  });
};
