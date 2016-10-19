'use strict';

const fs = require('fs');
const path = require('path');

const del = require('del');
const AWS = require('aws-sdk');
const multer = require('multer');
const createError = require('http-errors');
const debug = require('debug');

const Pic = require('../model/pic');
const Profile = require('../model/profile');
const picRouter = module.exports = require('express').Router();
const bearerAuth = require('../lib/bearer-auth-middleware');

AWS.config.setPromisesDependency(require('bluebird'));

const s3 = new AWS.S3();
const dataDir = `${__dirname}/../data`;
const upload = multer({dest: dataDir});

function s3UploadPromise(params){
  return new Promise((resolve, reject) => {
    s3.upload(params, (err, s3data) => {
      if (err) return reject(err);
      resolve (s3data);
    });
  });
}

picRouter.post('/api/profile/:profileID/pic', bearerAuth, upload.single('image'), function(req, res, next){
  debug('hit POST route /api/profile/:profileID/pic');
  if(!req.file)
    return next(createError(400, 'no file found'));

  let ext = path.extname(req.file.originalname);

  let params = {
    ACL: 'public-read',
    Bucket: 'heretogether-assets',
    Key: `${req.file.filename}${ext}`,
    Body: fs.createReadStream(req.file.path),
  };
  let tempProfile = null;
  let tempPic = null;
  Profile.findById(req.params.profileID)
  .catch(err => Promise.reject(createError(404, err.message)))
  .then(profile => {
    if(profile.userID.toString() !== req.user._id.toString()) {
      return Promise.reject(createError(401, 'User not authorized'));
    }
    tempProfile = profile;
    return s3UploadPromise(params);
  })
  .catch(err => err.status ? Promise.reject(err) : Promise.reject(createError(500, err.message)))
  .then(s3data => {
    console.log('req.body', req.body);

    del([`${dataDir}/*`]);
    let picData = {
      username: req.user.username,
      userID: req.user._id,
      imageURI: s3data.Location,
      objectKey: s3data.Key,
    };
    return new Pic(picData).save();
  })
  .then(pic => {
    tempPic = pic;
    tempProfile.picID = tempPic._id.toString();
    return tempProfile.save();
  })
  .then(() => res.json(tempPic))
  .catch(err => {
    del([`${dataDir}/*`]);
    next(err);
  });
});

picRouter.delete('/api/profile/:profileID/pic/:picID', bearerAuth, function(req, res, next){
  debug('DELETE /api/profile/:profileID/pic/:picID');

  Pic.findById(req.params.picID)
  .catch(err => Promise.reject(createError(404, err.message)))
  .then(pic => {
    if(pic.userID.toString() !== req.user._id.toString())
      return Promise.reject(createError(401, 'user not authorized to delete picture'));

    let params = {
      Bucket: 'heretogether-assets',
      Key: pic.objectKey,
    };
    return s3.deleteObject(params).promise();
  })
  .catch(err => err.status ? Promise.reject(err) : Promise.reject(createError(500, err.message)))
  .then(() => {
    return Pic.findByIdAndRemove(req.params.picID);
  })
  .then(() => res.sendStatus(204))
  .catch(next);
});
