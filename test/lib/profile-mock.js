'use strict';

//npm modules
const debug = require('debug')('ht: profile-mock');
const lorem = require('lorem-ipsum');

//module constants
const Profile = ('../../model/profile');
const hospitalMock = ('./hospital-mock'
);


module.exports = function(done){
  debug('creating mock profile');

  let profileName = lorem({count: 2, units: 'word'}).split(' ').join('-');
  let bio = lorem({count: 3, units: 'sentences', sentenceLowerBound: 5, sentenceUpperBound: 15});

  let exampleProfile = {
    profileName,
    bio,
  };

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
};
