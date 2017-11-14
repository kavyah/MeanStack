//express
const express = require('express');
const app = express();
//mongodb
const mongoose = require('mongoose');
const config= require('./config/database'); //for uri 
mongoose.Promise = global.Promise;//needed to reduce warnings
const path=require('path');
//connect and print log error
mongoose.connect(config.uri, (err) => {
    if (err) {
        console.log('could not connect', err)
    }
    else {
        console.log('Connected' + config.db)
    }

});
app.use(express.static(__dirname + '/client/dist/'))
//url in webpage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname +'/client/dist/index.html'))
});

app.listen(8080, () => {
    console.log('Listening on port 8080')
}); 