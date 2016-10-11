'use strict';

const Router = require('express').Router;
const debug = require('debug')('ht:hospital-router');
const jsonParser = require('body-parser').json();
const bearerAuth = require('../lib/bearer-auth-middleware');
const Profile = require('../model/profile');

const profileRouter = module.exports = Router();

profileRouter.post('/api/hospital/hospitalID/profile', bearerAuth, jsonParser, function(req, res, next){
  debug('hit POST route /api/hospital/hospitalID/profile');
  new Profile(req.body).save()
  .then( profile => res.json(profile))
  .catch(next);
}); 
