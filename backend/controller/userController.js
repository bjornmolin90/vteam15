const userService = require("./../services/userService.js");

const getUserByIdController = function (req, res, next) {
    try {
        let user = userService.getUserById(req.params.id);
        res.json(user);
    } catch (error) {
        res.json(error);
    }
}

let getAllUsersController = function (req, res, next) {
    try {
        let users = userService.getAllUsers();
        res.json(users);
    } catch (error) {
        res.json(error);
    }
}

const createUserController = function (req, res, next) {

    console.log(req.body);
    try {
        let postUser = userService.createUser(req.body);
        res.json(postUser);
    } catch (error) {
        res.json(error);
    }
}

module.exports = { getUserByIdController, getAllUsersController, createUserController }