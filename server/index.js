//server.js
'use strict'
//first we import our dependencies…
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path')

require('dotenv').config()

//and create our instances
const app = express();
//set our port to either a predetermined port number if you have set
//it up, or 3001
const port = process.env.PORT || 5001;

const people = require('./routes/people')
const index = require('./routes/index')

//db config
mongoose.connection.openUri(`mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@ds135624.mlab.com:35624/keystore-profile-app`)

//now we should configure the API to use bodyParser and look for
//JSON data in the request body
app.use(express.static(path.join(__dirname, '../react-ui/build')));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//To prevent errors from Cross Origin Resource Sharing, we will set
//our headers to allow CORS with middleware like so:
app.use(function(req, res, next) {
 res.setHeader('Access-Control-Allow-Origin', '*');
 res.setHeader('Access-Control-Allow-Credentials', 'true');
 res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
 res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
//and remove cacheing so we get the most recent comments
 res.setHeader('Cache-Control', 'no-cache');
 next();
});


app.use('/api/people', people);

app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
});

//starts the server and listens for requests
app.listen(port, function() {
 console.log(`api running on port ${port}`);
});

module.exports = app
