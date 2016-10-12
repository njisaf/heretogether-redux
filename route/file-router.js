'use strict';

const fs = require('fs');
const path = require('path');

const del = require('del');
const AWS = require('aws-sdk');
const multer = require('multer');
const debug = require('debug')('ht:hospital-router');
const createError = require('http-errors');

const File = require('../model/file');
const Status = require('../model/status');
const bearerAuth = require('../lib/bearer-auth-middleware');

AWS.config.setPromisesDependency(require('bluebird'));

const s3 = new AWS.S3();
const dataDir =`${__dirname}/../data`;
const upload = multer({dest: dataDir });
const fileRouter = module.exports = require('express').Router();

function s3UploadPromise(params){
  return new Promise((resolve, reject) => {
    s3.upload(params, (err, s3data) => {
      if (err) return reject(err);
      resolve(s3data);
    });
  });
}

//'file' should be added to example file in file-router-test-js
fileRouter.post('/api/status/:statusID/file', bearerAuth, upload.single('file'), function(req, res, next){
  debug('hit POST /api/status/:statusID/file');
  if(!req.file)
    return next(createError(400, 'no file found'));
  if(!req.file)
    return next(createError(500, 'file was saved'));

  let ext = path.extname(req.file.originalname);

  let params = {
    ACL: 'public-read',
    Bucket: 'heretogether-assets',
    Key: `${req.file.filename}${ext}`,
    Body: fs.createReadStream(req.file.path),
  };

  Status.findById(req.params.statusID)
  .catch(err => Promise.reject(createError(404, err.message)))
  .then(() => s3UploadPromise(params))
  .catch(err => err.status ? Promise.reject(err) : Promise.reject(createError(500, err.message)))
  .then(s3data => {
    del([`${dataDir}/*`]);
    let fileData = {
      objectKey: s3data.Key,
      fileURI: s3data.Location,
      userID: req.user._id,
      statusID: req.params.statusID,
    };
    return new File(fileData).save();
  })
  .then(file => res.json(file))
  .catch(err => {
    del([`${dataDir}/*`]);
    next(err);
  });
});

fileRouter.delete('/api/status/:statusID/file/:fileID', bearerAuth, function(req, res, next){
  debug('DELETE /api/status/:statusID/file/:fileID');

  File.findById(req.params.fileID)
  .catch(err => Promise.reject(createError(404, err.message)))
  .then( file => {
    if(file.statusID.toString() !== req.params.statusID)
      return Promise.reject(createError(400, 'bad request wrong gallery'));
    if(file.userID.toString() !== req.user._id.toString())
      return Promise.reject(createError(401, 'user not authtorized to delete this file'));
    let params = {
      Bucket: 'heretogether-assets',
      Key: file.objectKey,
    };
    return s3.deleteObject(params).promise();
  })
  .catch(err => err.status ? Promise.reject(err) : Promise.reject(createError(500, err.message)))
  .then(() => {
    return File.findByIdAndRemove(req.params.fileID);
  })
  .then(() => res.sendStatus(204))
  .catch(next);
});
