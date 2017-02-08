'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const profileSchema = Schema({
  profileName: {type: String, required:true},
  userID: {type: mongoose.Schema.Types.ObjectId, required: true},
  fileID: {type: mongoose.Schema.Types.ObjectId, ref: 'file'},
  bio: {type: String, required: true, default: 'Welcome! Tell us a little bit about yourself.'},
  created: {type: Date, default: Date.now},
});

module.exports = mongoose.model('profile', profileSchema);
