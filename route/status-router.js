'use strict';

const Router = require('express').Router;
const debug = require('debug')('ht:status-router');
const jsonParser = require('body-parser').json();
const AWS = require('aws-sdk');
const createError = require('http-errors');

AWS.config.setPromisesDependency(require('bluebird'));

const bearerAuth = require('../lib/bearer-auth-middleware');
const Status = require('../model/status');
// const File = require('../model/file');

// const s3 = new AWS.S3();
const statusRouter = module.exports = Router();

statusRouter.post('/api/status', bearerAuth, jsonParser, function(req, res, next) {
  debug('Hit POST /api/status');
  if(!req.body.userID) req.body.userID = req.user._id;

  new Status(req.body).save()
  .then(status => res.json(status))
  .catch(next);
});

statusRouter.get('/api/status/:statusID', bearerAuth, function(req, res, next) {
  debug('Hit GET /api/status/:statusID');

  if (req.params.statusID === 'all') {
    Status.find()
    .populate('fileID')
    .then(statArr => res.json(statArr))
    .catch(next);
    return;
  }

  Status.findById(req.params.statusID)
  .populate('fileID')
  .catch(err => Promise.reject(createError(400, err.message)))
  .then(status => {
    if(status.userID.toString() !== req.user._id.toString()) return Promise.reject(createError(401, 'invalid userid'));
    res.json(status);
  })
  .catch(next);
});

statusRouter.delete('/api/status/:statusID', bearerAuth, function(req, res, next) {
  debug('Hit DELETE /api/status/:statusID');

  // let tempStatus = null;
  Status.findById(req.params.statusID)
  .then(status => {
    // tempStatus = status;
    if(status.userID.toString() === req.user._id.toString()) {
      Status.findByIdAndRemove(req.params.statusID)
      .then(() => res.sendStatus(204))
      .catch(next);
    } else {
      return Promise.reject(createError(401, 'Invalid user ID'));
    }
    // if (status.fileID) {
    //   return File.findById(status.fileID)
    //   .then(file => {
    //
    //     let params = {
    //       Bucket: 'heretogether-assets',
    //       Key: file.objectKey,
    //     };
    //     return s3.deleteObject(params).promise();
    //   })
    //   .catch(err => err.status ? Promise.reject(err) : Promise.reject(createError(500, err.message)))
    //   .then(() => File.findByIdAndRemove(tempStatus.fileID))
    //   .catch(next);
    // }
  })
.catch(err => err.status ? next(err) : next(createError(404, err.message)));
});

statusRouter.put('/api/hospital/:hospitalID/status/:statusID', bearerAuth, jsonParser, function(req, res, next) {
  debug('Hit PUT /api/hospital/:hospitalID/status/:statusID');

  Status.findById(req.params.statusID)
  .then(status => {
    if(status.userID.toString() === req.user._id.toString()) {
      if(status.hospitalID.toString() !== req.params.hospitalID) return Promise.reject(createError(404, 'Hospital mismatch'));
      Status.findByIdAndUpdate(req.params.statusID, req.body, {new: true})
      .then((status) => {
        return Status.findById(status._id)
        .populate('fileID');
      })
      .then(status => res.json(status))
      .catch(next);
    } else {
      return Promise.reject(createError(401, 'Invalid user ID'));
    }
  })
.catch(err => err.status ? next(err) : next(createError(404, err.message)));
});
