'use strict';

const debug = require('debug')('ht:hospital-mock');
const Hospital = require('../../model/hospital');
const lorem = require('lorem-ipsum');

module.exports = function(done){
  debug('create hospital mock');
  let exampleHospital = {
    name: lorem({count: 2, units:'word'}).split(' ').join('-'),
  };

  new Hospital(exampleHospital).save()
  .then( hospital => {
    this.tempHospital = hospital;
    done();
  })
  .catch(done);
};
