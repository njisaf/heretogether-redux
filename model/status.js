'use strict';


const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const statusSchema = Schema({
  userID: {type: String, required:true, unique:true},
  text: {type: String},
  fileID: {type: mongoose.Schema.Types.ObjectId, required: true},
  picID: {type: mongoose.Schema.Types.ObjectId, required: true},
  replyTo: {type: String},
  created: {type: Date, default: Date.now},
});

module.exports = mongoose.model('status', statusSchema);
