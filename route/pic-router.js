'use strict';

//node module
const fs = require('fs');
const path = require('path');


//npm module
const del = require('del');
const AWS = require('aws-sdk');
const multer = require('multer');
const createError = require('createError');
const debug = require('debug');


//app module
const Pic = require('../model/pic');
const Profile = require('../model/profile');
//TODO: uncomment Status later when we have Status
// const Status = require('../model/status');

//bluebird
AWS.config.setPromisesDependency(require('bluebird'));

//module constants
const s3 = new AWS.S3();
const dataDir = `${__dirname}/../data`;
const upload = multer({dest: dataDir});
const picRouter = module.exports = require('express').Router();


function s3UploadPromise(params){
  return new Promise((resolve, reject) => {
    s3.upload(params, (err, s3data) => {
      if (err) return reject(err);
      resolve (s3data);
    });
  });
}

picRouter.post('/api/profile/:profileID'
