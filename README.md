# sproc

shared process

Share resources that only allow a single connection (i.e. serial ports)

## Install

`npm install sproc`

## Use

```javascript

// main.js
var sproc = require('sproc');

sproc({
  script: 'daemon.js',
  port: 4499,
}, function(proc) {
  proc.stream.write('hello');
  stream.on('data', console.log); // outputs hello
});

```

```javascript

// echo daemon (daemon.js)

var clients = 0;

module.exports = function(options, stream) {
  clients++;

  stream.write(clients + ' clients');
  stream.on('end', function() {
    clients--;
    if (clients > 0) {
      stream.write(clients + ' clients');
    } else {
      process.exit();
    }
  });

  stream.pipe(stream, { end: false });
};

```

var settings = {};
client.on('settings', function(s) {
  merge(settings, s);
});


## License

MIT