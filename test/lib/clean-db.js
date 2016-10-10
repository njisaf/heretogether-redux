'use strict';

const debug = require('debug')('debug:ht');

const User = require('../../model/user');

module.exports = function(done){
  debug('clean up db running');
  Promise.all([
    User.remove({}),
  ])
  .then( () => done())
  .catch(done);
};
