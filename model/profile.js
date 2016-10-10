'use strict';

const mongoose = require('mongoose');
// const debug = require('debug')('ht:user');

const Schema = mongoose.Schema;

const profileSchema = Schema({
  username: {type: String, required:true, unique:true},
  userID: {type: mongoose.Schema.Types.ObjectId, required: true},
  profilePicID: {type: mongoose.Schema.Types.ObjectId, required: true},
});

module.exports = mongoose.model('profile', profileSchema);
