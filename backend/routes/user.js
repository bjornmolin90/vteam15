const express = require('express');
const router = express.Router();
const userController = require("./../controller/userController.js")
const oauth = require("../services/oauthCheck");

// hämtar user med id
router.get('/:id', oauth.oauthCheck, userController.getUserByIdController);
// hämtar alla users
router.get('/', oauth.oauthCheck, userController.getAllUsersController);
// skapar en ny user
router.post('/', userController.createUserController);
// tar bort en user
router.delete('/', userController.deleteUserController);

module.exports = router;
