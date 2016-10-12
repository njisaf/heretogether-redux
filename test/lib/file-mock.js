'use strict';

require('./aws-mocks.js');

const debug = require('debug')('ht:file-mock');
const File = require('../../model/file');
const statusMock = require('./status-mock');
const lorem = require('lorem-ipsum');

module.exports = function(done){
  debug('creating mock file');
  const tempObjKey = `${lorem({count: 2, unit:'word'}).split(' ').join('-')}.mp3`;
  const tempFileURI = `http://${lorem({count: 2, unit:'words'}).split(' ').join('-')}.com/{tempObjKey}`;
  let exampleFileData = {
    fileURI: tempFileURI,
    objectKey: tempObjKey,
    fileType: 'audio/mp3',
  };
  statusMock.call(this, err => {
    if (err) return done(err);
    exampleFileData.userID = this.tempUser._id.toString();
    new File(exampleFileData).save()
    .then( file => {
      this.tempFile = file;
      done();
    })
    .catch(done);
  });
};
