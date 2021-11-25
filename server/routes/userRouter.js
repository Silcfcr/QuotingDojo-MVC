const express = require("express");
const UserRouter = express.Router();
const UserController = require("./../controllers/userController")

UserRouter 
    .get( '/', UserController.loadIndex);

UserRouter
    .get ('/getById', UserController.getUser)

UserRouter
    .post ('/addUser', UserController.addUser)

UserRouter
    .get ('/quotes', UserController.viewQuotes)

module.exports  = { UserRouter};