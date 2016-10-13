'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const statusSchema = Schema({
  userID: {type: mongoose.Schema.Types.ObjectId, required:true},
  text: {type: String},
  fileID: {type: mongoose.Schema.Types.ObjectId, ref: 'file'},
  picID: {type: mongoose.Schema.Types.ObjectId, ref: 'pic'},
  replyTo: {type: mongoose.Schema.Types.ObjectId},
  hospitalID: {type: mongoose.Schema.Types.ObjectId, required: true},
  created: {type: Date, default: Date.now},
});

module.exports = mongoose.model('status', statusSchema);
