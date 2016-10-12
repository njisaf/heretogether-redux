'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const fileSchema = Schema({
  userID: {type: mongoose.Schema.Types.ObjectId, required: true},
  fileURI: {type: String, required: true, unique: true},
  objectKey: {type: String, required: true, unique: true},
  fileType: {type: String, required: true},
  created: {type: Date, default: Date.now},
});

module.exports = mongoose.model('file', fileSchema);
