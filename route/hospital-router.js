'use strict';

const Router = require('express').Router;
const debug = require('debug')('ht:hospital-router');
const jsonParser = require('body-parser').json();
const bearerAuth = require('../lib/bearer-auth-middleware');
const Hospital = require('../model/hospital');

const hospitalRouter = module.exports = Router();

hospitalRouter.post('/api/hospital', bearerAuth, jsonParser, function(req, res, next){
  debug('hit POST route /api/hospital');
  new Hospital(req.body).save()
  .then( hospital => res.json(hospital))
  .catch(next);
});
