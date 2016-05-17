let app = require('./server-config.js');

const PORT = process.env.PORT || 3000;

app.set('port', PORT);

app.listen(PORT, () => console.log(`server listening on ${PORT}`));
