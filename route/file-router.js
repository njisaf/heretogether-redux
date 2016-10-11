'use strict';

const fs = require('fs');
const path = require('path');
const Router = require('express').Router;
const debug = require('debug')('ht:hospital-router');
const jsonParser = require('body-parser').json();
const createError = require('http-errors');
const bearerAuth = require('../lib/bearer-auth-middleware');

const Status = require('../model/status');

const fileRouter = module.exports = Router();

fileRouter.post('/api/status/:statusID/file', bearerAuth, jsonParser, function(req, res, next){
  debug('hit POST /api/status/:statusID/file');
  if(!req.file)
    return next(createError(400, 'no file found'));
  if(!req.file)
    return next(createError(500, 'file was saved'));

  let ext = path.extname(req.file.originalname);

  let params = {
    ACL: 'public-read',
    Bucket: 'heretogether-assets',
    Key: `${req.file.filename}${ext}`,
    Body: fs.createReadStream(req.file.path),
  };

  Status.findById(req.params.statusID)
  .catch(err => Promise.reject(createError(404, err.message)))
  .then(() => )
});
