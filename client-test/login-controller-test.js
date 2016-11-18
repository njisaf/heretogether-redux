// 'use strict';
//
// const camelcase = require('camelcase');
//
// describe('testing login-controller', function(){
//
//   beforeEach(() => {
//     angular.mock.module(camelcase(__TITLE__));
//     angular.mock.inject(($rootScope, $location, $window, $httpBackend, $componentController, authService) => {
//       authService.setToken('1234');
//
//       this.$location = $location;
//       this.$window = $window;
//       this.$rootScope = $rootScope;
//       this.$httpBackend = $httpBackend;
//       this.authService = authService;
//       this.$componentController = $componentController;
//     });
//   });
//
//   afterEach(() => {
//     this.authService.logout();
//   });
//
//   it('testing login controller', () => {
//     let user = {
//       username: 'mockUserName',
//       password: 'mockPassword',
//     };
//     let base64 = this.$window.btoa(`${user.username}:${user.password}`);
//     let url = 'http://localhost:3000/api/login';
//     let headers = {
//       Accept: 'application/json',
//       Authorization: `Basic ${base64}`,
//     };
//     this.$httpBackend.expectGET(url, headers)
//     .respond(200, {_id: '1234FIVE', username: 'mockUserName', password: 'mockPassword'});
//
//     let loginCtrl = this.$componentController('login');
//
//     loginCtrl.login(user);
//
//     this.$httpBackend.flush();
//
//     expect(this.$location.path()).toBe('/home');
//
//     this.$rootScope.$apply();
//   });
// });
