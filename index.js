//express
const express = require('express');
const router = express.Router();
const app = express();

//mongodb
const mongoose = require('mongoose');
const config= require('./config/database'); //for uri 
mongoose.Promise = global.Promise;//needed to reduce warnings
const path = require('path');
const authentication = require('./routes/authentication.js')(router);
const blog = require('./routes/blogs.js')(router);
const bodyParser = require('body-parser')
const cors = require('cors');


app.use(cors({ origin: 'http://localhost:4200' }));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(bodyParser.json({ type: 'application/*+json' }))
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }))
app.use(bodyParser.text({ type: 'text/html' }))



//connect and print log error
mongoose.connect(config.uri, (err) => {
    if (err) {
        console.log('could not connect', err)
    }
    else {
        console.log('Connected' + config.db)
    }

});
app.use(express.static(__dirname + '/client/src/index.html'));
app.use('/authentication', authentication);
app.use('/blogs', blog);

//url in webpage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/src/index.html'));
});

app.listen(8080, () => {
    console.log('Listening on port 8080')
}); 