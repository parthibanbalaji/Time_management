var express = require('express');
import userControl from './controllers/user';

export default function setRoutes(app) {
    const router = express.Router();
    const userCtrl = new userControl();

    // authentication of route
    // router.use(userCtrl.validateUser);
  
    // registration
    router.route("/registerUser").post(userCtrl.createUser);


    //login
    router.route("/login").post(userCtrl.login);
 
    app.use("/api", router);

}