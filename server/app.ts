
// import * as dotenv from 'dotenv';
import * as express from 'express';
import * as mongoose from 'mongoose';
import * as path from 'path';
import setRoutes from './routes';

var session = require('express-session');
var cookieParser = require('cookie-parser');
var expressJwt = require('express-jwt')
var config = require('./config/defaultConfig');
var bodyParser =  require('body-parser');
// var express = require('express');
// var mongoose = require('mongoose');


const app = express();

app.set('port', (process.env.PORT || config.nodeServerPort));

//parse data in routes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//session management
app.use(session({
  secret: config.secretToken, // session secret
  resave: true,
  saveUninitialized: true
}));

//To check api routes have token
var unlessArray = ['/api/login','/api/registerUser']
app.use(expressJwt({secret: config.secretToken}).unless({path: unlessArray}));

//To add middleware in routes
setRoutes(app);

// database connection  
mongoose.connect("mongodb://" + config.mongoDbConfiguration.username + ":" + config.mongoDbConfiguration.password + "@" + config.mongoDbConfiguration.server + ":" + config.mongoDbConfiguration.port + "/"+config.mongoDbConfiguration.databaseName);

const db = mongoose.connection;
mongoose.Promise = global.Promise;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');

  process.on('uncaughtException', function (err) {
    console.error((new Date).toUTCString() + ' uncaughtException:', err.message)
    console.error(err.stack)
  })
  if (!module.parent) {
    app.listen(app.get('port'), () => {
      console.log('Angular Full Stack listening on port ' + app.get('port'));
    });
  }

});
export { app };
