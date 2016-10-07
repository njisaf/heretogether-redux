'use strict';

//npm modules
const expect = require('chai').expect;
const request = require('superagent');
const Promise = require('bluebird');
const mongoose = require('mongoose');


//app modules
const server = require('../server.js');
const User = require('../model/user.js');

const url = `http://localhost:${process.env.PORT}`;

//config
mongoose.Promise = Promise;

describe('test GET routes', function(){
  before(done => {
    if (!server.isRunning){
      server.listen(process.env.PORT), () => {
        server.isRunning = true;
        console.log('server up');
        done();
      };
      return;
    }
    done();
  });

  after(done => {
    if(server.isRunning){
      server.close(err => {
        if (err) return done(err);
        server.isRunning = false;
        console.log('server down');
        done();
      });
      return;
    }
    done();
  });

  afterEach(done => {
    User.remove({})
    .then( () => done())
    .catch(done);
  });
});
