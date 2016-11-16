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

fileRouter.post('/api/status/:statusID/file', bearerAuth, upload.single('file'), function(req, res, next){
  debug('hit POST /api/status/:statusID/file');
  if(!req.file)
    return next(createError(400, 'no file found'));

  let ext = path.extname(req.file.originalname);

  let params = {
    ACL: 'public-read',
    Bucket: 'heretogether-assets',
    Key: `${req.file.filename}${ext}`,
    Body: fs.createReadStream(req.file.path),
  };


  let tempStatus = null;
  let tempFile = null;
  Status.findById(req.params.statusID)
  .catch(err => Promise.reject(createError(404, err.message)))
  .then(status => {
    if(status.userID.toString() !== req.user._id.toString()) {
      return Promise.reject(createError(401, 'User not authorized'));
    }
    tempStatus = status;
    return s3UploadPromise(params);
  })
  .catch(err => err.status ? Promise.reject(err) : Promise.reject(createError(500, err.message)))
  .then(s3data => {
    del([`${dataDir}/*`]);
    let fileData = {
      objectKey: s3data.Key,
      fileURI: s3data.Location,
      userID: req.user._id,
      fileType: req.file.mimetype,
    };
    return new File(fileData).save();
  })
  .then(file => {
    tempFile = file;
    tempStatus.fileID = tempFile._id.toString();
    console.log('tempStatus', tempStatus);
    return tempStatus.save();
  })
  .then(() => res.json(tempFile))
  .catch(err => {
    del([`${dataDir}/*`]);
    next(err);
  });
});


fileRouter.post('/api/hospital/:hospitalID/statusfile', bearerAuth, upload.single('file'), function(req, res, next){
  debug('hit POST /api/hospital/:hospitalID/statusfile');

  // create a status
  // with UserID and HospitalID and text
  if(!req.file)
    return next(createError(400, 'no file found'));

  let ext = path.extname(req.file.originalname);

  let params = {
    ACL: 'public-read',
    Bucket: 'heretogether-assets',
    Key: `${req.file.filename}${ext}`,
    Body: fs.createReadStream(req.file.path),
  };


  let tempStatus = null;
  let tempFile = null;
  new Status({
    userID: req.user._id.toString(),
    hospitalID: req.params.hospitalID,
    text: req.body.text,
  }).save()
  .catch(err => Promise.reject(createError(404, err.message)))
  .then(status => {
    if(status.userID.toString() !== req.user._id.toString()) {
      return Promise.reject(createError(401, 'User not authorized'));
    }
    tempStatus = status;
    return s3UploadPromise(params);
  })
  .catch(err => err.status ? Promise.reject(err) : Promise.reject(createError(500, err.message)))
  .then(s3data => {
    del([`${dataDir}/*`]);
    let fileData = {
      objectKey: s3data.Key,
      fileURI: s3data.Location,
      userID: req.user._id,
      fileType: req.file.mimetype,
    };
    return new File(fileData).save();
  })
  .then(file => {
    tempFile = file;
    tempStatus.fileID = tempFile._id.toString();
    console.log('tempStatus', tempStatus);
    return tempStatus.save();
  })
  .then((status) => {
    return Status.findById(status._id)
    .populate('fileID');
  })
  .then(status => res.json(status))
  .catch(err => {
    del([`${dataDir}/*`]);
    next(err);
  });
});

fileRouter.delete('/api/status/:statusID/file/:fileID', bearerAuth, function(req, res, next){
  debug('DELETE /api/status/:statusID/file/:fileID');

  Status.findById(req.params.statusID)
  .catch(err => Promise.reject(createError(400, err.message)))
  .then(() => {
    return File.findById(req.params.fileID);
  })
  .catch(err => err.status ? Promise.reject(err) : Promise.reject(createError(404, err.message)))
  .then( file => {
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
