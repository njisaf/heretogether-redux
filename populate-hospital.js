require('dotenv').load();
const mongoose = require('mongoose');
const Promise = require('bluebird');
const Hospital = require('./model/hospital.js');

mongoose.connect(process.env.MONGODB_URI);

Promise.all([
  Hospital.remove({}),
  new Hospital({
    name: 'Seattle Children\'s',
  }).save(),
  // new Hospital({
  //   name: 'Sweedish',
  // }).save(),
  // new Hospital({
  //   name: 'Providence',
  // }).save(),
  // new Hospital({
  //   name: 'Larys Lulwat',
  // }).save(),
  // new Hospital({
  //   name: 'U DUB',
  // }).save(),
])
.then( hospitals => {
  console.log('hospitals\n', hospitals);
  mongoose.disconnect();
})
.catch(err => {
  mongoose.disconnect();
  console.error(err);
});
