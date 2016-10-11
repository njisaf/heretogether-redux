'use strict';

const Router = require('express').Router;
const debug = require('debug')('ht:hospital-router');
const jsonParser = require('body-parser').json();
const createError = require('http-errors');
const bearerAuth = require('../lib/bearer-auth-middleware');
const Profile = require('../model/profile');

const profileRouter = module.exports = Router();

profileRouter.post('/api/hospital/:hospitalID/profile', bearerAuth, jsonParser, function(req, res, next){
  debug('hit POST route /api/hospital/:hospitalID/profile');
  new Profile(req.body).save()
  .then( profile => res.json(profile))
  .catch(next);
});

profileRouter.get('/api/hospital/:hospitalID/profile/:profileID', bearerAuth, function(req, res, next){
  debug('hit GET route /api/hospital/:hospitalID/profile/:profileID');

  Profile.findById(req.params.profileID)
  .catch(err => Promise.reject(createError(400, err.message)))
  .then( profile => {
    if(profile.userID.toString() !== req.user._id.toString())
      return Promise.reject(createError(401, 'invalid userid'));
    res.json(profile);
  })
  .catch(next);
});

profileRouter.delete('/api/hospital/:hospitalID/profile/:profileID', bearerAuth, function(req, res, next) {
  debug('Hit DELETE /api/hospital/:hospitalID/profile/:profileID');
  Profile.findById(req.params.profileID)
  .then(profile => {
    if(profile.userID.toString() === req.user._id.toString()) {
      Profile.findByIdAndRemove(req.params.profileID)
      .then(() => res.sendStatus(204))
      .catch(next);
    } else {
      return Promise.reject(createError(401, 'Invalid user ID'));
    }
  })
.catch(err => err.status ? next(err) : next(createError(404, err.message)));
});

profileRouter.put('/api/hospital/:hospitalID/profile/:profileID', bearerAuth, jsonParser, function(req, res, next) {
  debug('Hit PUT /api/hospital/:hospitalID/profile/:profileID');
  Profile.findById(req.params.profileID)
  .then(profile => {
    if(profile.userID.toString() === req.user._id.toString()) {
      Profile.findByIdAndUpdate(req.params.profileID, req.body, {new:true})
      .then(profile => res.json(profile))
      .catch(next);
    } else {
      return Promise.reject(createError(401, 'Invalid user ID'));
    }
  })
.catch(err => err.status ? next(err) : next(createError(404, err.message)));
});
