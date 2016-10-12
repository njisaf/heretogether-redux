'use strict';

const path = require('path');
const fs = require('fs');

const del = require('del');
const AWS = require('aws-sdk');
const multer = require('multer');
const createError = require('http-errors');
const debug = require('debug')('cuttlefish:pic-router');

AWS.config.setPromisesDependency(require('bluebird')); // with this line, we can use promises with AWS!

const Pic = require('../model/pic');
const Gallery = require('../model/gallery');
const bearerAuth = require('../lib/bearer-auth-middleware');

const s3 = new AWS.S3();
const upload = multer({dest: `${__dirname}/../data`});
const picRouter = module.exports = require('express').Router();

function s3UploadPromise(params) {
  return new Promise((resolve, reject) => {
    s3.upload(params, (err, s3Data) => {
      if (err) return reject(err);
      resolve(s3Data);
    });
  });
}

picRouter.post('/api/gallery/:galleryID/pic', bearerAuth, upload.single('image'), function(req, res, next) {
  debug('Hit POST /api/gallery/:galleryID/pic');
  if(!req.file) return next(createError(400, 'No file found'));
  if(!req.file.path) return next(createError(500, 'File was not saved'));

  let ext = path.extname(req.file.originalname);

  let params = {
    ACL: 'public-read',
    Bucket: 'octopus-cuttlefish',
    Key: `${req.file.filename}${ext}`,
    Body: fs.createReadStream(req.file.path),
  };

  let s3Data; //i give up, brain dead. check his files.
  Gallery.findById(req.params.galleryID)
  .catch(err => Promise.reject(createError(404, err.message)))
  .then(() => s3UploadPromise(params)) //if fails 500 error, our fault. We can write a catch block below if we feel like it!
  .then(s3Data => {
    let picData = {
      name: req.body.name,
      desc: req.body.desc,
      userID: req.user._id,
      galleryID: req.params.galleryID,
      imageURI: s3Data.Location,
      objectKey: s3Data.Key,
    };
    return new Pic(picData).save();
  })
  .then(pic => res.json(pic))
  .catch(next);

});

picRouter.delete('/api/gallery/:galleryID/pic/:picID', bearerAuth, function(req, res, next) {
  debug('Hit DELETE /api/gallery/:galleryID/pic/:picID');

  Pic.findById(req.params.picID)
  .catch(err => Promise.reject(createError(404, err.message)))
  .then(pic => {
    if(pic.galleryID.toString() !== req.params.galleryID)
      return Promise.reject(createError(400, 'Bad request! Wrong gallery.'));
    if(pic.userID.toString() !== req.user._id.toString())
      return Promise.reject(createError(401, 'Bad request! User not authorized.'));

    let params = {
      Bucket: 'octopus-cuttlefish',
      Key: pic.objectKey,
    };

    return s3.deleteObject(params).promise();
  })
  .catch(err => Promise.reject(createError(500, err.message)))
  .then(s3Data => {
    console.log('s3Data:   ', s3Data);
    return Pic.findByIdAndRemove(req.params.picID);
  })
  .then(() => res.sendStatus(204))
  .catch(next);
});
