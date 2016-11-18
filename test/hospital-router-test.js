'use strict';

require('./lib/test-env.js');

const expect = require('chai').expect;
const request = require('superagent');
const Promise = require('bluebird');
const mongoose = require('mongoose');
const serverCtrl = require('./lib/server-ctrl');
const cleanDB = require('./lib/clean-db');
const mockUser = require('./lib/user-mock');
const mockHospital = require('./lib/hospital-mock');

mongoose.Promise = Promise;

const server = require('../server');
const url = `http://localhost:${process.env.PORT}`;

const exampleHospital = {
  name: 'Seattle Childrens',
};

describe('testing hospital-router', function(){

  before(done => serverCtrl.serverUp(server, done));
  after(done => serverCtrl.serverDown(server, done));
  afterEach(done => cleanDB(done));

  describe('testing POST /api/hospital', function(){

    describe('testing valid POST request', function(){

      before(done => mockUser.call(this, done));

      it('should return a status code of 200', (done) => {
        request.post(`${url}/api/hospital`)
        .send(exampleHospital)
        .set({Authorization: `Bearer ${this.tempToken}`})
        .end((err, res) => {
          if(err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.name).to.equal(exampleHospital.name);
          done();
        });
      });
    });

    describe('testing POST request with invalid body', function(){

      before(done => mockUser.call(this, done));

      it('should return a status code of 400', (done) => {
        request.post(`${url}/api/hospital`)
        .send('{youshallnotpass')
        .set({Authorization: `Bearer ${this.tempToken}`})
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.text).to.equal('BadRequestError');
          done();
        });
      });
    });

    describe('testing POST request with no body', function(){

      before(done => mockUser.call(this, done));

      it('should return a status code of 400', (done) => {
        request.post(`${url}/api/hospital`)
        .set({Authorization: `Bearer ${this.tempToken}`})
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.text).to.equal('BadRequestError');
          done();
        });
      });
    });

    //   describe('testing POST request with invalid token', function(){
    //
    //     before(done => mockUser.call(this, done));
    //
    //     it('should return a status code of 401', (done) => {
    //       request.post(`${url}/api/hospital`)
    //       .send(exampleHospital)
    //       .set({Authorization: 'Bearer badtoken'})
    //       .end((err, res) => {
    //         expect(res.status).to.equal(401);
    //         expect(res.text).to.equal('UnauthorizedError');
    //         done();
    //       });
    //     });
    //   });
    // });

    describe('testing DELETE /api/hospital', function(){

      describe('testing valid DELETE request', function(){

        before(done => mockUser.call(this, done));
        before(done => mockHospital.call(this, done));

        it('should return a status code of 204', (done) => {
          request.delete(`${url}/api/hospital/${this.tempHospital._id}`)
          .set({Authorization: `Bearer ${this.tempToken}`})
          .end((err, res)=> {
            if(err) return done(err);
            expect(res.status).to.equal(204);
            done();
          });
        });
      });

      describe('testing DELETE request with invalid id', function(){

        before(done => mockUser.call(this, done));
        before(done => mockHospital.call(this, done));

        it('should return a status code of 404', (done) => {
          request.delete(`${url}/api/hospital/123`)
          .set({Authorization: `Bearer ${this.tempToken}`})
          .end((err, res)=> {
            expect(res.status).to.equal(404);
            expect(res.text).to.equal('NotFoundError');
            done();
          });
        });
      });


      describe('testing DELETE request with no id', function(){

        before(done => mockUser.call(this, done));
        before(done => mockHospital.call(this, done));

        it('should return a status code of 404', (done) => {
          request.delete(`${url}/api/hospital/`)
          .set({Authorization: `Bearer ${this.tempToken}`})
          .end((err, res)=> {
            expect(res.status).to.equal(404);
            done();
          });
        });
      });

      // describe('testing DELETE request with no auth', function(){
      //
      //   before(done => mockUser.call(this, done));
      //   before(done => mockHospital.call(this, done));
      //
      //   it('should return a status code of 400', (done) => {
      //     request.delete(`${url}/api/hospital/${this.tempHospital._id}`)
      //     .end((err, res)=> {
      //       expect(res.status).to.equal(400);
      //       expect(res.text).to.equal('BadRequestError');
      //       done();
      //     });
      //   });
      // });

      // describe('testing DELETE request with invalid auth', function(){
      //
      //   before(done => mockUser.call(this, done));
      //   before(done => mockHospital.call(this, done));
      //
      //   it('should return a status code of 400', (done) => {
      //     request.delete(`${url}/api/hospital/${this.tempHospital._id}`)
      //     .set({Authorization: `${this.tempToken}`})
      //     .end((err, res)=> {
      //       expect(res.status).to.equal(400);
      //       expect(res.text).to.equal('BadRequestError');
      //       done();
      //     });
      //   });
      // });
    });
  });
});
