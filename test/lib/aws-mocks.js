'use strict';

const AWSMock = require('aws-sdk-mock');

module.exports = exports = {};

exports.uploadMock = {
  ETag: '"5eefd06b5b384cc52f35a0c49414ea31',
  Location: 'https://heretogether-assets.s3.amazonaws.com/59f1919f92651d13d8693fc887887aa2.png',
  key: '59f1919f92651d13d8693fc887887aa2.png',
  Key: '59f1919f92651d13d8693fc887887aa2.png',
  Bucket: 'heretogether-assets',
};

AWSMock.mock('S3', 'upload', function(params, callback){
  if(params.ACL !== 'public-read')
    return callback(new Error('ACL must be public read'));

  if(params.Bucket !== 'heretogether-assets')
    return callback(new Error('Bucket must be heretogether-assets'));

  if(!params.Key)
    return callback(new Error('requires Key'));

  if(!params.Body)
    return callback(new Error('requires body'));

  callback(null, exports.uploadMock);

});

exports.deleteMock = {
  DeleteMarker: 'true',
  VersionId: 'lv9XPH0r.UfGZERuv3u7WwxkIzwPKP2d',
};

AWSMock.mock('S3', 'deleteObject', function(params, callback){
  if(params.Bucket !== 'heretogether-assets')
    return callback(new Error('Bucket must be heretogether-assets'));
  if(!params.Key)
    return callback(new Error('requres Key'));
  callback(null, exports.deleteMock);
});
