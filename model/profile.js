'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const profileSchema = Schema({
  profileName: {type: String, required:true},
  userID: {type: mongoose.Schema.Types.ObjectId, required: true},
  picID: {type: mongoose.Schema.Types.ObjectId, ref: 'pic'},
  bio: {type: String, required: true, default: 'Welcome! Tell us a little bit about yourself.'},
  hospitalID: {type: mongoose.Schema.Types.ObjectId, required: true},
  created: {type: Date, default: Date.now},
});

module.exports = mongoose.model('profile', profileSchema);
