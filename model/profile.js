'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const profileSchema = Schema({
  profileName: {type: String, required:true, unique:true},
  userID: {type: mongoose.Schema.Types.ObjectId, required: true},
  picID: {type: mongoose.Schema.Types.ObjectId, ref: 'pic'},
  bio: {type: String, required: true},
  hospitalID: {type: mongoose.Schema.Types.ObjectId, required: true},
  created: {type: Date, default: Date.now},
});

module.exports = mongoose.model('profile', profileSchema);
