'use strict';

const debug = require('debug')('ht:hospital-mock');
const Hospital = require('../../model/hospital');
const lorem = require('lorem-ipsum');

module.exports = function(done){
  debug('Create fake hospital mock');
  let exampleHospital = {
    name: lorem({count: 2, units:'word'}).split(' ').join('-'),
  };

  let hospital = new Hospital(exampleHospital);
  this.tempHospital = hospital;
  done();
};
