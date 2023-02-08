const User = require("./../services/userService.js");
const getUserByIdController = async function (req, res, next) {

    let id = req.params.id;

    try {
        let getUser = await User.getUserById(id);
        res.json(getUser);
    } catch (error) {
        res.json(error);
    }
}

const getAllUsersController = async function (req, res, next) {

    try {
        let getUsers = await User.getAllUsers();
        res.json(getUsers);
    } catch (error) {
        res.json(error);
    }
}

const createUserController = async function (req, res, next) {

    console.log(req.body);
    try {
        let createdBike = await User.createUser(req.body);
        res.json(createdBike);
    } catch (error) {
        res.json(error);
    }
}

const deleteUserController = async function (req, res, next) {
    try {
        await User.deleteAllUsers();
        res.json("deleted all");
    } catch (error) {
        res.json(error);
    }
}

module.exports = { getUserByIdController, getAllUsersController, createUserController, deleteUserController }