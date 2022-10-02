const db = require('../models/database');


const userController = {};

userController.saveUser = async (req, res, next) => {
  console.log("saveUser")
  return next();
};

userController.loginUser = async (req, res, next) => {
  console.log('loginUser');
  return next();
};



module.exports = userController;
