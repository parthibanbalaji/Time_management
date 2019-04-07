// config.js
require('dotenv').config();
var convict = require('convict');
var config = convict({
    env: {
        format: ['test', 'dev'],
        "default": 'test',
        arg: 'nodeEnv',
        env: 'NODE_ENV'
    },
    "environment": "test",
    "nodeServerPort": 3000,
    "mongoDbConfiguration": {
        "username": "timeAdmin",
        "password": "time",
        "server": "localhost",
        "port": "27017",
        "databaseName": "Time_Management"
    },
    "baseURL": "http://localhost:4200/",
    "secretToken": "catswillruletheworld"
});
var env = config.get('env');
config.loadFile("./config/" + env + ".json");
config.validate({ allowed: 'strict' }); // throws error if config does not conform to schema
module.exports = config.getProperties();
