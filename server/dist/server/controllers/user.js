"use strict";
exports.__esModule = true;
var user_1 = require("../models/user");
var jwt = require("jsonwebtoken");
var config = require('../config/defaultConfig');
var UserCtrl = /** @class */ (function () {
    function UserCtrl() {
        var _this = this;
        this.user = user_1["default"];
        // validate authentication of route
        this.validateUser = function (req, res, next) {
            console.log('validated12');
            next();
        };
        // create a new user
        this.createUser = function (req, res) {
            _this.user.findOne({ email: req.body.email }, function (err, user) {
                // check for user already existed in db
                if (user == null) {
                    var obj = new _this.user(req.body);
                    obj.save(function (err, item) {
                        if (err) {
                            res.status(400).send({
                                errorMessage: err
                            });
                        }
                        res.status(200).json(item);
                    });
                }
                else {
                    res.status(403).send({
                        errorMessage: 'Already a user registered with this email id!'
                    });
                }
            });
        };
        //login
        this.login = function (req, res) {
            var email = "^" + req.body.email + "$";
            _this.user.findOne({ email: { $regex: email, $options: "i" } }, function (err, user) {
                if (!user) {
                    return res.sendStatus(403);
                }
                user.comparePassword(req.body.password, function (error, isMatch) {
                    if (!isMatch) {
                        return res.sendStatus(403);
                    }
                    var token = jwt.sign({ user: user }, config.secretToken); // , { expiresIn: 10 } seconds
                    res.status(200).json({ token: token });
                });
            });
        };
    }
    return UserCtrl;
}());
exports["default"] = UserCtrl;
