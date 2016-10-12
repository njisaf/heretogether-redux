'use strict';

const debug = require('debug')('cuttlefish:server-control');

module.exports = exports = {};

exports.serverUp = function(server, done){
  if(!server.isRunning){
    server.listen(process.env.PORT, () => {
      server.isRunning = true;
      debug('Server is up on PORT ' + process.env.PORT);
      done();
    });
    return;
  }
  done();
};

exports.serverDown = function(server, done){
  if(server.isRunning){
    server.close(err => {
      if (err) return done(err);
      server.isRunning = false;
      debug('Server is down!!');
      done();
    });
    return;
  }
  done();
};
