var test = require('tap').test,
    net = require('net'),
    child = require('child_process'),
    path = require('path'),
    sproc = require('../sproc');

test('ensure sproc spawns the daemon wrapper properly', function(t) {
  var options = {
    keepProcessReference : true,
    script: __dirname + '/fixture/ping-pong-daemon',
    port: 5666
  };

  sproc(options, function(err, a, p) {
    sproc(options, function(err, b) {
      b.on('data', function(buffer) {
        if (buffer.toString().indexOf('pong') > -1) {
          b.end()
          p.kill();
          t.end();
        }
      });
      b.write('ping');
    });

    a.on('data', function(buffer) {
      if (buffer.toString().indexOf('ping') > -1) {
        a.write('pong');
      }
    });
  });
});
