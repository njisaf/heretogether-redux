'use strict';

const AWSmock = require('aws-sdk-mock');

module.exports = exports = {};

exports.uploadMock = {
  ETag: '"7ec868ff8e708d2fb6281a425903c619"',
  VersionId: 'JgpEssKkOP61LjvG8WdoW0WAsMKq7fTL',
  Location: 'https://octopus-cuttlefish.s3.amazonaws.com/65fef1b3382f55a3c689f2bc9bf72896.jpg',
  key: '65fef1b3382f55a3c689f2bc9bf72896.jpg',
  Key: '65fef1b3382f55a3c689f2bc9bf72896.jpg',
  Bucket: 'octopus-cuttlefish',
};

AWSmock.mock('S3', 'upload', function(params, callback){
  if(params.ACL !== 'public-read') return callback(new Error('ACL must be public-read'));
  if(params.Bucket !== 'octopus-cuttlefish') return callback(new Error('Bucket must be octopus-cuttlefish'));
  if(!params.Key) return callback(new Error('Requires key'));
  if(!params.Body) return callback(new Error('Requires body'));
  callback(null, exports.uploadMock);
});

exports.deleteMock = {
  //put delete mock data here. deleteMarker, versionID
};

AWSmock.mock('S3', 'deleteObject', function(params, callback){
  if(params.Bucket !== 'octopus-cuttlefish') return callback(new Error('Bucket must be octopus-cuttlefish'));
  if(!params.Key) return callback(new Error('Requires key'));
  callback(null, exports.deleteMock);
});
