'use strict';

const debug = require('debug')('debug:ht');

const User = require('../../model/user');
const Hospital = require('../../model/hospital');

module.exports = function(done){
  debug('clean up db running');
  Promise.all([
    User.remove({}),
    Hospital.remove({}),
  ])
  .then( () => done())
  .catch(done);
};
