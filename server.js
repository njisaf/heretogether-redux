'use strict';

const dotenv = require('dotenv');
const morgan = require('morgan');
const express = require('express');
const Promise = require('bluebird');
const mongoose = require('mongoose');
const debug = require('debug')('ht:server');

const authRouter = require('./route/auth-router');
const hospitalRouter = require('./route/hospital-router');
const picRouter = require('./route/pic-router');
const profileRouter = require('./route/profile-router');
const fileRouter = require('./route/file-router');
const statusRouter = require('./route/status-router');
const errorMiddleware = require('./lib/error-middleware');

dotenv.load();

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI);

const PORT = process.env.PORT;
const app = express();

app.use(morgan('dev'));

app.use(express.static(`${__dirname}/build`));
app.use(authRouter);
app.use(fileRouter);
app.use(hospitalRouter);
app.use(picRouter);
app.use(profileRouter);
app.use(statusRouter);
app.use(errorMiddleware);

const server = module.exports = app.listen(PORT, () => {
  debug(`server up on ${PORT}`);
});

server.isRunning = true;
