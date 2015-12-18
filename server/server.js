var app = require('./server-config.js');

var PORT = process.env.PORT || 3000;

app.set('port', PORT);

app.listen(PORT);

console.log('server listening on ', PORT);