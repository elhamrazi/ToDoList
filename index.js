const express = require('express');
require('./config/db');
const router = require('./router');
const app = express();
const config = require('config');
const port = config.get('port')
const errorHandler = require('./middleware/error');

app.use(express.json());

// app.use(urlencoded());

app.use(router);
app.use(errorHandler);

let PORT = port || 3000;
app.listen(PORT, () => {
    console.log(`Server is up and running on ${PORT} ...`);
});
