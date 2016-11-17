'use strict';

const Router = require('express').Router;
const debug = require('debug')('ht:status-router');
const jsonParser = require('body-parser').json();
const AWS = require('aws-sdk');
const createError = require('http-errors');

AWS.config.setPromisesDependency(require('bluebird'));

const bearerAuth = require('../lib/bearer-auth-middleware');
const Status = require('../model/status');
const Hospital = require('../model/hospital');
const File = require('../model/file');

const s3 = new AWS.S3();
const statusRouter = module.exports = Router();

statusRouter.post('/api/hospital/:hospitalID/status', bearerAuth, jsonParser, function(req, res, next) {
  debug('Hit POST /api/hospital/:hospitalID/status');
  if(req.body.hospitalID !== req.params.hospitalID) return next(createError(404, 'Hospital not found.'));
  if(!req.body.userID) req.body.userID = req.user._id;

  Hospital.findById(req.params.hospitalID)
  .catch(err => Promise.reject(createError(404, err.message)))
  .then(hospital => {
    if(!hospital) return Promise.reject(createError(404, 'Hospital does not exist'));
    new Status(req.body).save()
    .then(status => res.json(status));
  })
  .catch(next);
});

statusRouter.get('/api/hospital/:hospitalID/status/:statusID', bearerAuth, function(req, res, next) {
  debug('Hit GET /api/hospital/:hospitalID/status/:statusID');

  Status.findById(req.params.statusID)
  .populate('fileID')
  .catch(err => Promise.reject(createError(400, err.message)))
  .then(status => {
    if(status.userID.toString() !== req.user._id.toString()) return Promise.reject(createError(401, 'invalid userid'));
    if(status.hospitalID.toString() !== req.params.hospitalID.toString()) return Promise.reject(createError(404, 'Hospital mismatch'));
    res.json(status);
  })
  .catch(next);
});

statusRouter.get('/api/hospital/:hospitalID/all/status/', bearerAuth, function(req, res, next) {
  debug('Hit GET ALL /api/hospital/:hospitalID/all/status/');
  Hospital.findById(req.params.hospitalID)
  .catch(err => Promise.reject(createError(404, err.message)))
  .then(() => {
    return Status.find({hospitalID: req.params.hospitalID})
    .populate('fileID');
  })
  .then(statArr => {
    res.json(statArr);
  })
  .catch(next);
});

//TODO: needs tests
statusRouter.get('/api/hospital/:hospitalID/all/status/:userID', bearerAuth, function(req, res, next) {
  debug('Hit GET ALL /api/hospital/:hospitalID/all/status/:userID');
  Hospital.findById(req.params.hospitalID)
  .catch(err => Promise.reject(createError(404, err.message)))
  .then(() => {
    return Status.find({userID: req.params.userID})
    .populate('fileID');
  })
  .then(statArr => {
    res.json(statArr);
  })
  .catch(next);
});

statusRouter.delete('/api/hospital/:hospitalID/status/:statusID', bearerAuth, function(req, res, next) {
  debug('Hit DELETE /api/hospital/:hospitalID/status/:statusID');

  let tempStatus = null;
  Status.findById(req.params.statusID)
  .then(status => {
    tempStatus = status;
    if(status.userID.toString() === req.user._id.toString()) {
      if(status.hospitalID.toString() !== req.params.hospitalID) return Promise.reject(createError(404, 'Hospital mismatch'));
      Status.findByIdAndRemove(req.params.statusID)
      .then(() => res.sendStatus(204))
      .catch(next);
    } else {
      return Promise.reject(createError(401, 'Invalid user ID'));
    }
    if (status.fileID) {
      return File.findById(status.fileID)
      .then(file => {

        let params = {
          Bucket: 'heretogether-assets',
          Key: file.objectKey,
        };
        return s3.deleteObject(params).promise();
      })
      .catch(err => err.status ? Promise.reject(err) : Promise.reject(createError(500, err.message)))
      .then(() => File.findByIdAndRemove(tempStatus.fileID))
      .catch(next);
    }
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
