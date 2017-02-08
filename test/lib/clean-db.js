'use strict';

const debug = require('debug')('debug:ht');

const User = require('../../model/user');
const Profile = require('../../model/profile');
const Status = require('../../model/status');
const File = require('../../model/file');

module.exports = function(done){
  debug('clean up db running');
  Promise.all([
    User.remove({}),
    File.remove({}),
    Profile.remove({}),
    Status.remove({}),
  ])
  .then( () => done())
  .catch(done);
};
