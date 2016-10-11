'use strict';

require('./lib/test-env.js');

const expect = require('chai').expect;
const request = require('superagent');
const Promise = require('bluebird');
const mongoose = require('mongoose');
const serverCtrl = require('./lib/server-ctrl.js');
const cleanDB = require('./lib/clean-db.js');
const mockUser = require('./lib/user-mock.js');

mongoose.Promise = Promise;

const server = require('../server');
const url = `http://localhost:${process.env.PORT}`;

const exampleUser = {
  username: 'exampleName',
  password: '1234567890',
  email: 'exampleName@exampleEmail.com',
};

describe('testing auth-router', function(){

  before(done => serverCtrl.serverUp(server, done));
  after(done => serverCtrl.serverDown(server, done));
  afterEach(done => cleanDB(done));

  describe('testing POST /api/signup', function(){

    describe('with valid body', function(){
      it('should return a token', (done) => {
        request.post(`${url}/api/signup`)
        .send(exampleUser)
        .end((err, res) => {
          if(err) return done(err);
          expect(res.status).to.equal(200);
          expect(!!res.text).to.equal(true);
          done();
        });
      });
    });

    describe('with no username', function(){
      it('should return a status of 400', (done) => {
        request.post(`${url}/api/signup`)
        .send({
          password: '12345',
          email: exampleUser.email,
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.text).to.equal('BadRequestError');
          done();
        });
      });
    });

    describe('with no password', function(){
      it('should return a status of 400', (done) => {
        request.post(`${url}/api/signup`)
        .send({
          username: exampleUser.name,
          email: exampleUser.email,
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.text).to.equal('BadRequestError');
          done();
        });
      });
    });

    describe('with no email', function(){
      before( done => mockUser.call(this, done));
      it('should return a status code of 400', (done) => {
        request.post(`${url}/api/signup`)
        .send({
          username: exampleUser.username,
          password: exampleUser.password,
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.text).to.equal('BadRequestError');
          done();
        });
      });
    });

    describe('with invalid password length (less than 10)', function(){
      it('should return a status of 400', (done) => {
        request.post(`${url}/api/signup`)
        .send({
          username: 'exampleName',
          password: '12345',
          email: 'exampleName@exampleEmail.com',
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.text).to.equal('BadRequestError');
          done();
        });
      });
    });

    describe('with duplicate user name', function(){
      before( done => mockUser.call(this, done));
      it('should return a status code of 409', (done) => {
        request.post(`${url}/api/signup`)
        .send({
          username: this.tempUser.username,
          password: exampleUser.password,
          email: exampleUser.email,
        })
        .end((err, res) => {
          expect(res.status).to.equal(409);
          expect(res.text).to.equal('ConflictError');
          done();
        });
      });
    });

    describe('with duplicate email', function(){
      before( done => mockUser.call(this, done));
      it('should return a status code of 409', (done) => {
        request.post(`${url}/api/signup`)
        .send({
          username: exampleUser.username,
          password: exampleUser.password,
          email: this.tempUser.email,
        })
        .end((err, res) => {
          expect(res.status).to.equal(409);
          expect(res.text).to.equal('ConflictError');
          done();
        });
      });
    });
  });
});
