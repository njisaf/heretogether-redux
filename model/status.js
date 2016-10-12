'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const statusSchema = Schema({
  userID: {type: String, required:true},
  text: {type: String},
  fileID: {type: mongoose.Schema.Types.ObjectId},
  picID: {type: mongoose.Schema.Types.ObjectId},
  replyTo: {type: mongoose.Schema.Types.ObjectId},
  hospitalID: {type: mongoose.Schema.Types.ObjectId, required: true},
  created: {type: Date, default: Date.now},
});

module.exports = mongoose.model('status', statusSchema);
