'use strict';

const debug = require('debug')('ht:status-mock');
const lorem = require('lorem-ipsum');

const Status = require('../../model/status');
const userMock = require('./user-mock');

module.exports = function(done){
  debug('create mock status');

  let exampleStatus = {
    text: lorem({count: 3, unit:'sentences'}).split(' ').join('-'),
  };

  userMock.call(this, err => {
    if (err) return done (err);
    exampleStatus.userID = this.tempUser._id.toString();

    new Status(exampleStatus).save()
    .then( status => {
      this.tempStatus = status;
      done();
    })
    .catch(done);
  });
};
