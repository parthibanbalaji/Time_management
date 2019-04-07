"use strict";
exports.__esModule = true;
var express = require('express');
var user_1 = require("./controllers/user");
function setRoutes(app) {
    var router = express.Router();
    var userCtrl = new user_1["default"]();
    // authentication of route
    // router.use(userCtrl.validateUser);
    // registration
    router.route("/registerUser").post(userCtrl.createUser);
    //login
    router.route("/login").post(userCtrl.login);
    app.use("/api", router);
}
exports["default"] = setRoutes;
