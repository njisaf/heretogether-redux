'use strict';

const Router = require('express').Router;
const debug = require('debug')('ht:hospital-router');
const jsonParser = require('body-parser').json();
const createError = require('http-errors');
const bearerAuth = require('../lib/bearer-auth-middleware');
const Hospital = require('../model/hospital');

const hospitalRouter = module.exports = Router();

hospitalRouter.post('/api/hospital', bearerAuth, jsonParser, function(req, res, next){
  debug('hit POST /api/hospital');
  new Hospital(req.body).save()
  .then( hospital => res.json(hospital))
  .catch(next);
});

hospitalRouter.delete('/api/hospital/:hospitalID', bearerAuth, function(req, res, next) {
  debug('Hit DELETE /api/hospital/:hospitalID');
  Hospital.findByIdAndRemove(req.params.hospitalID)
  .catch(err => Promise.reject(createError(404, err.message)))
  .then(() => res.sendStatus(204))
  .catch(next);
});
