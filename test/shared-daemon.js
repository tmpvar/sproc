var test = require('tap').test,
    net = require('net'),
    child = require('child_process'),
    path = require('path');

// Daemon
var clients = [];
module.exports = function(stream) {
  clients.push(stream);
};

test('ensure daemon wrapper spawns correctly', function(t) {
  var p = child.spawn('node', [
    path.join(__dirname, '..','daemon.js'),
    '--options', JSON.stringify({ port : 9999 })
  ]);

  p.stdout.pipe(process.stdout);

  setTimeout(function() {
    net.createConnection({
      host: 'localhost',
      port: 9999
    }, function() {
      p.kill();
      t.end();
    });
  }, 200);
});

test('ensure sproc spawns the daemon wrapper properly', function(t) {
  var sproc = require('../sproc');
  var options = {
    keepProcessReference : true,
    script: __dirname + '/shared-daemon',
    port: 5666
  };

  sproc(options, function(err, stream, p) {
    net.createConnection({
      host: 'localhost',
      port: 5666
    }, function() {
      t.equal(clients.length, 1);
      p.kill();
      t.end();
    });
  });
});
