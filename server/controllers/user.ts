import User from '../models/user';
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcryptjs";

var config = require('../config/defaultConfig');

export default class UserCtrl {


    user = User;

    // validate authentication of route
    validateUser = (req,res,next) => {
        console.log('validated12');
        next();
    }

    // create a new user
    createUser = (req,res) => {
        this.user.findOne({email:req.body.email},(err,user) => {
            // check for user already existed in db
            if(user == null) {
                const obj = new this.user(req.body);
                obj.save((err, item) => {
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
        })
    }

    //login
    
    login = (req,res) => {
        var email = `^${req.body.email}$`;
        this.user.findOne(
          { email: { $regex: email, $options: "i" } },
          (err, user) => {
            if (!user) {
              return res.sendStatus(403);
            }
            user.comparePassword(req.body.password, (error, isMatch) => {
              if (!isMatch) {
                return res.sendStatus(403);
              }
              const token = jwt.sign({ user: user }, config.secretToken); // , { expiresIn: 10 } seconds
              res.status(200).json({ token: token });
            });
          }
        );
    }

}

