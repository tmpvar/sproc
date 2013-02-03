console.log('here')
// Daemon
var clients = [];

module.exports = function(options, stream) {
  stream.setMaxListeners(0);

  clients.forEach(function(client) {
    client.pipe(stream);
    stream.pipe(client);
  });

  clients.push(stream);
};
