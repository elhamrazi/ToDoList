const mongoose = require('mongoose');
const config = require('config');
const uri = config.get('mongoURI');

mongoose.connect(uri)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.log(`Error happened: ${err}`);
    });

