'use strict';

const googleOAUTH = require('../lib/google-oauth-middleware.js');
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

authRouter.get('/api/auth/oauth_callback', googleOAUTH, function(req, res){
  // should have either req.googleError or req.googleOAUTH
  console.log('googleError', req.googleError);
  console.log('googleOAUTH', req.googleOAUTH);

  // if googleError deal with google error
  if(req.googleError){
    return res.redirect('/#/join');
  }
  // check if user already exists
  User.findOne({email: req.googleOAUTH.email})
  .then( user => {
    if (!user) return Promise.reject(new Error('user not found'));
    return user;
  })
  .catch(err => {
    if(err.message === 'user not found'){
      let userData = {
        username: req.googleOAUTH.email,
        email: req.googleOAUTH.email,
        google: {
          googleID: req.googleOAUTH.googleID,
          tokenTTL: req.googleOAUTH.tokenTimeToLive,
          tokenTimestamp: Date.now(),
          refreshToken: req.googleOAUTH.refreshToken,
          accessToken: req.googleOAUTH.accessToken,
        },
      };
      console.log('userData', userData);
      return new User(userData).save();
    }
    return Promise.reject(err);
  })
  .then( user => {
    console.log('a user was created');
    return user.generateToken();
  })
  .then(token => {
    res.redirect(`/#/join?token=${token}`);
  })
  .catch(err => {
    console.log('errrrrrrrrrr', err);
    console.log('user not found');
    res.redirect('/#/join');
  });
});
