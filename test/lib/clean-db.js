'use strict';

const debug = require('debug')('debug:ht');

const User = require('../../model/user');
const Hospital = require('../../model/hospital');
const Profile = require('../../model/profile');
const Pic = require('../../model/pic');
const Status = require('../../model/status');
const File = require('../../model/file');

module.exports = function(done){
  debug('clean up db running');
  Promise.all([
    User.remove({}),
    File.remove({}),
    Hospital.remove({}),
    Pic.remove({}),
    Profile.remove({}),
    Status.remove({}),
  ])
  .then( () => done())
  .catch(done);
};
