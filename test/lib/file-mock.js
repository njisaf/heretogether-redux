'use strict';

const debug = require('debug')('ht:file-mock');
const File = require('../../model/file');
const awsMocks = require('./aws-mocks');
const statusMock = require('./status-mock');

module.exports = function(done){
  debug('creating mock file');
  let exampleFileData = {
    name: 'Tom',
    desc: 'heir of slytherin',
    created: new Date(),
    imageURI: awsMocks.uploadMock.Location,
    objectKey: awsMocks.uploadMock.Key,
  };
  statusMock.call(this, err => {
    if (err) return done(err);
    exampleFileData.userID = this.tempUser._id.toString();
    exampleFileData.statusID = this.tempStatus._id.toString();
    new File(exampleFileData).save()
    .then( file => {
      this.tempFile = file;
      done();
    })
    .catch(done);
  });
};
