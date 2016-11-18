'use strict';

const Router = require('express').Router;
const debug = require('debug')('ht:hospital-router');
const jsonParser = require('body-parser').json();
const createError = require('http-errors');
// const bearerAuth = require('../lib/bearer-auth-middleware');
const Hospital = require('../model/hospital');

const hospitalRouter = module.exports = Router();

hospitalRouter.post('/api/hospital', jsonParser, function(req, res, next){
  debug('hit POST /api/hospital');
  new Hospital(req.body).save()
  .then( hospital => res.json(hospital))
  .catch(next);
});

hospitalRouter.delete('/api/hospital/:hospitalID', function(req, res, next) {
  debug('Hit DELETE /api/hospital/:hospitalID');
  if(!req.params.hospitalID) return next(createError(404, 'expected hospitalID'));
  Hospital.findByIdAndRemove(req.params.hospitalID)
  .catch(err => Promise.reject(createError(404, err.message)))
  .then(() => res.sendStatus(204))
  .catch(next);
});

//TODO: Needs testing
hospitalRouter.get('/api/hospital', function(req, res, next){
  debug('Hit GET /api/hospital');
  Hospital.find({})
  .then((hospitals) => {
    console.log(hospitals);
    res.json(hospitals);
  })
  .catch(next);
});
