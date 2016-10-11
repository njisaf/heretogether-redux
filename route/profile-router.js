'use strict';

const Router = require('express').Router;
const debug = require('debug')('ht:hospital-router');
const jsonParser = require('body-parser').json();
const createError = require('http-errors');
const bearerAuth = require('../lib/bearer-auth-middleware');
const basicAuth = require('../lib/basic-auth-middleware');
const Profile = require('../model/profile');

const profileRouter = module.exports = Router();

profileRouter.post('/api/hospital/:hospitalID/profile', bearerAuth, jsonParser, function(req, res, next){
  debug('hit POST route /api/hospital/:hospitalID/profile');
  new Profile(req.body).save()
  .then( profile => res.json(profile))
  .catch(next);
});

profileRouter.get('/api/hospital/:hospitalID/profile/:profileID', basicAuth, function(req, res, next){
  debug('hit GET route /api/hospital/:hospitalID/profile/:profileID');

  Profile.findByOd(req.params.id)
  .catch(err => Promise.reject(createError(400, err.message)))
  .then( profile => {
    if(profile.userID.toString()!== req.user._id.toString())
      return Promise.reject(createError(401, 'invalid userid'));
    res.json(profile);
  })
  .catch(next);
});
