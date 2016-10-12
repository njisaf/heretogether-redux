'use strict';

const debug = require('debug')('debug:ht');

const User = require('../../model/user');
const Hospital = require('../../model/hospital');
const Profile = require('../../model/profile');
const Pic = require('../../model/pic');

module.exports = function(done){
  debug('clean up db running');
  Promise.all([
    User.remove({}),
    Hospital.remove({}),
    Profile.remove({}),
    Pic.remove({}),
  ])
  .then( () => done())
  .catch(done);
};
