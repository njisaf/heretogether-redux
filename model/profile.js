'use strict';

const mongoose = require('mongoose');
// const debug = require('debug')('ht:profile');

const Schema = mongoose.Schema;

const profileSchema = Schema({
  profileName: {type: String, required:true, unique:true},
  userID: {type: mongoose.Schema.Types.ObjectId, required: true},
  picID: {type: mongoose.Schema.Types.ObjectId, required: true},
  bio: {type: String, required: true},
  created: {type: Date, default: Date.now},
});

module.exports = mongoose.model('profile', profileSchema);
