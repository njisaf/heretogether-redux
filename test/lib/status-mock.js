'use strict';

const debug = require('debug')('ht: status-mock');
const lorem = require('lorem-ipsum');

const Status = require('../../model/status');
const hospitalMock = require('./hospital-mock');
const userMock = require('./user-mock');

module.exports = function(done){
  debug('create mock profile');

  let text = lorem({count: 3, unit:'sentences'}).split(' ').join('-');
  let replyTo = lorem({count: 3, unit:'sentences'}).split(' ').join('-');
  let profileName = lorem({count: 2, unit:'word'}).split(' ').join('-');

  let exampleStatus = {
    text,
    replyTo,
    profileName,
  };

  userMock.call(this, err => {
    if (err) return done (err);
    exampleStatus.userID = this.tempUser._id.toString();

    hospitalMock.call(this, err => {
      if (err) return done (err);
      exampleStatus.hospitalID = this.tempHospital._id.toString();

      new Status(exampleStatus).save()
      .then( status => {
        this.tempStatus = status;
        done();
      })
      .catch(done);
    });
  });
};
