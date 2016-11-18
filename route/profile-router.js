'use strict';

const Router = require('express').Router;
const debug = require('debug')('ht:hospital-router');
const AWS = require('aws-sdk');
const jsonParser = require('body-parser').json();
const createError = require('http-errors');

AWS.config.setPromisesDependency(require('bluebird'));

const bearerAuth = require('../lib/bearer-auth-middleware');
const Profile = require('../model/profile');
const Hospital = require('../model/hospital');
const Pic = require('../model/pic');

const s3 = new AWS.S3();
const profileRouter = module.exports = Router();

profileRouter.post('/api/hospital/:hospitalID/profile', bearerAuth, jsonParser, function(req, res, next){
  debug('hit POST route /api/hospital/:hospitalID/profile');
  if(req.body.hospitalID !== req.params.hospitalID) return next(createError(404, 'Hospital not found.'));
  if(!req.body.profileName) req.body.profileName = req.user.username;
  if(!req.body.userID) req.body.userID = req.user._id;

  Hospital.findById(req.params.hospitalID)
  .catch(err => Promise.reject(createError(404, err.message)))
  .then(hospital => {
    if(!hospital) return Promise.reject(createError(404, 'Hospital does not exist'));
    return new Profile(req.body).save();
  })
  .then(profile => res.json(profile))
  .catch(next);
});

profileRouter.get('/api/hospital/:hospitalID/profile/:profileID', bearerAuth, function(req, res, next){
  debug('hit GET route /api/hospital/:hospitalID/profile/:profileID');

  Profile.findById(req.params.profileID)
  .populate('picID')
  .catch(err => Promise.reject(createError(400, err.message)))
  .then( profile => {
    // if(profile.userID.toString() !== req.user._id.toString()) return Promise.reject(createError(401, 'invalid userid'));
    if(profile.hospitalID.toString() !== req.params.hospitalID.toString()) return Promise.reject(createError(404, 'Hospital mismatch'));
    res.json(profile);
  })
  .catch(next);
});

profileRouter.get('/api/hospital/:hospitalID/all/profile', bearerAuth, function(req, res, next) {
  debug('Hit GET ALL /api/hospital/:hospitalID/all/profile');
  Hospital.findById(req.params.hospitalID)
  .catch(err => Promise.reject(createError(404, err.message)))
  .then(() => {
    return Profile.find({hospitalID: req.params.hospitalID})
    .populate('picID');
  })
  .then(profArr => {
    res.json(profArr);
  })
  .catch(next);
});


//needs tests
profileRouter.get('/api/hospital/:hospitalID/profile/', bearerAuth, function(req, res, next) {
  debug('Hit GET ONE /api/hospital/:hospitalID/profile');

  Profile.findOne({userID: req.user._id})
  .populate('picID')
  .catch(err => Promise.reject(createError(400, err.message)))
  .then(profile => {
    if(profile.hospitalID.toString() !== req.params.hospitalID.toString()) return Promise.reject(createError(404, 'Hospital mismatch'));
    console.log('PROFILE', profile);
    res.json(profile);
  })
  .catch(next);
});


profileRouter.delete('/api/hospital/:hospitalID/profile/:profileID', bearerAuth, function(req, res, next) {
  debug('Hit DELETE /api/hospital/:hospitalID/profile/:profileID');
  let tempProfile = null;
  Profile.findById(req.params.profileID)
  .then(profile => {
    tempProfile = profile;
    if(profile.userID.toString() === req.user._id.toString()) {
      if(profile.hospitalID.toString() !== req.params.hospitalID) return Promise.reject(createError(404, 'Hospital mismatch'));
      Profile.findByIdAndRemove(req.params.profileID)
      .then(() => res.sendStatus(204))
      .catch(next);
    } else {
      return Promise.reject(createError(401, 'Invalid user ID'));
    }
    if (profile.picID) {
      return Pic.findById(profile.picID)
      .then(pic => {

        let params = {
          Bucket: 'heretogether-assets',
          Key: pic.objectKey,
        };
        return s3.deleteObject(params).promise();
      })
      .catch(err => err.status ? Promise.reject(err) : Promise.reject(createError(500, err.message)))
      .then(() => Pic.findByIdAndRemove(tempProfile.picID))
      .catch(next);
    }
  })
.catch(err => err.status ? next(err) : next(createError(404, err.message)));
});

profileRouter.put('/api/hospital/:hospitalID/profile/:profileID', bearerAuth, jsonParser, function(req, res, next) {
  debug('Hit PUT /api/hospital/:hospitalID/profile/:profileID');
  Profile.findById(req.params.profileID)
  .then(profile => {
    if(profile.hospitalID.toString() !== req.params.hospitalID) return Promise.reject(createError(404, 'Profile not found.'));
    if(profile.userID.toString() === req.user._id.toString()) {
      Profile.findByIdAndUpdate(req.params.profileID, req.body, {new:true})
      .then(profile => res.json(profile))
      .catch(next);
    } else {
      return Promise.reject(createError(401, 'Invalid user'));
    }
  })
.catch(err => err.status ? next(err) : next(createError(404, err.message)));
});
