'use strict';

const debug = require('debug')('ht: status-mock');
const lorem = require('lorem-ipsum');

const Status = require('../../model/status');
const hospitalMock = require('./hospital-mock');
const userMock = require('./user-mock');

module.exports = function(done){
  debug('create mock status');

  let text = lorem({count: 3, unit:'sentences'}).split(' ').join('-');
  let replyTo = lorem({count: 3, unit:'sentences'}).split(' ').join('-');

  let exampleStatus = {
    text,
    replyTo,
  };

  userMock.call(this, err => {
    if (err) return done (err);
    exampleStatus.userID = this.tempUser._id.toString();

    hospitalMock.call(this, err => {
      if (err) return done (err);
      exampleStatus.hospitalID = this.tempHospital._id.toString();

      console.log('exampleStatus  ', exampleStatus);
      new Status(exampleStatus).save()
      .then( status => {
        this.tempStatus = status;
        done();
      })
      .catch(done);
    });
  });
};
