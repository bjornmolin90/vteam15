const express = require('express');
const router = express.Router();
const userController = require("./../controller/userController.js")

// hämtar user med id
router.get('/:id', userController.getUserByIdController);
// skapar alla users
router.get('/', userController.getAllUsersController);
// skapar en ny user
router.post('/', userController.createUserController);

module.exports = router;