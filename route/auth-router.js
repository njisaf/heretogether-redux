'use strict';

const Router = require('express').Router;
const debug = require('debug')('ht:auth-router');
const jsonParser = require('body-parser').json();
const createError = require('http-errors');

const basicAuth = require('../lib/basic-auth-middleware');
const User = require('../model/user');

const authRouter = module.exports = Router();

authRouter.post('/api/signup', jsonParser, function(req, res, next) {
  debug('Hit POST /api/signup');

  let password = req.body.password;
  delete req.body.password;
  let user = new User(req.body);

  if(!password) return next(createError(400, 'Requires password'));
  if(password.length < 10) return next(createError(400, 'Password must be at least 10 characters'));

  user.generatePasswordHash(password)
  .then(user => user.save())
  .then(user => user.generateToken())
  .then(token => res.send(token))
  .catch(next);
});

authRouter.get('/api/login', basicAuth, function(req, res, next) {
  debug('Hit GET /api/login');

  User.findOne({username: req.auth.username})
  .catch(err => Promise.reject(createError(401, err.message)))
  .then(user => user.comparePasswordHash(req.auth.password))
  .catch(err => Promise.reject(createError(401, err.message)))
  .then(user => user.generateToken())
  .then(token => res.send(token))
  .catch(next);
});
