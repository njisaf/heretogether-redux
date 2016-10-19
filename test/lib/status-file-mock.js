'use strict';

const debug = require('debug')('ht: profile-mock');
const lorem = require('lorem-ipsum');

const Status = require('../../model/status');
const File = require('../../model/file');
const userMock = require('./user-mock');
const hospitalMock = require('./hospital-mock');


module.exports = function(done){
  debug('Creating mock profile with pic associated');

  let text = lorem({count: 3, unit:'sentences'}).split(' ').join('-');

  let exampleStatus = {
    text,
  };

  const tempObjKey = `${lorem({count: 2, unit:'word'}).split(' ').join('-')}.mp3`;
  const tempFileURI = `http://${lorem({count: 2, unit:'words'}).split(' ').join('-')}.com/{tempObjKey}`;
  let exampleFileData = {
    fileURI: tempFileURI,
    objectKey: tempObjKey,
    fileType: 'audio/mp3',
  };

  userMock.call(this, err => {
    if (err) return done (err);
    exampleStatus.userID = this.tempUser._id.toString();
    exampleFileData.userID = this.tempUser._id.toString();
    hospitalMock.call(this, err => {
      if (err) return done (err);
      exampleStatus.hospitalID = this.tempHospital._id.toString();
      return new File(exampleFileData).save()
      .then(file => {
        this.tempFile = file;
        exampleStatus.fileID = this.tempFile._id.toString();
        return new Status(exampleStatus).save();
      })
      .then(status => {
        this.tempStatus = status;
        done();
      })
      .catch(done);
    });
  });
};
