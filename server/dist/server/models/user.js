"use strict";
exports.__esModule = true;
var bcrypt = require('bcryptjs');
var mongoose = require('mongoose');
var Schema = mongoose.Schema, ObjectId = Schema.ObjectId;
var userSchema = new mongoose.Schema({
    userName: { type: String, unique: true, trim: true },
    email: { type: String, unique: true, lowercase: true, trim: true },
    date: { type: Date, "default": Date.now() },
    password: String,
    role: String,
    phone: String
});
// Before saving the user, hash the password
userSchema.pre('save', function (next) {
    var user = this;
    if (!user.isModified('password')) {
        return next();
    }
    bcrypt.genSalt(10, function (err, salt) {
        if (err) {
            return next(err);
        }
        bcrypt.hash(user.password, salt, function (error, hash) {
            if (error) {
                return next(error);
            }
            user.password = hash;
            next();
        });
    });
});
userSchema.methods.comparePassword = function (candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) {
            return callback(err);
        }
        callback(null, isMatch);
    });
};
// Omit the password when returning a user
userSchema.set('toJSON', {
    transform: function (doc, ret, options) {
        delete ret.password;
        return ret;
    }
});
var User = mongoose.model('User', userSchema);
exports["default"] = User;
