'use strict';

require('./lib/test-env.js');

const expect = require('chai').expect;
// const request = require('superagent');
// const Promise = require('bluebird');
// const mongoose = require('mongoose');
// const serverCtrl = require('./lib/server-ctrl.js');
// const cleanDB = require('./lib/clean-db.js')
// const mockUser = require('./lib/user-mock.js')
describe('initial test', function(){
  it('should return true', done => {
    expect(true).to.equal(true);
    done();
  });
});
