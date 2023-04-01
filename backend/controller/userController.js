const User = require("./../services/userService.js");

const getUserByIdController = async function (req, res, next) {

    let id = req.params.id;

    try {
        let getUser = await User.getUserById(id);
        res.status(201).json(getUser);
    } catch (error) {
        res.status(500).json(error);
    }
}

const getAllUsersController = async function (req, res, next) {
    try {
        let getUsers = await User.getAllUsers();
        res.status(201).json(getUsers);
    } catch (error) {
        res.status(500).json(error);
    }
}

const createUserController = async function (req, res, next) {

    console.log(req.body);
    try {
        let createdBike = await User.createUser(req.body);
        res.status(201).json(createdBike);
    } catch (error) {
        res.status(500).json(error);
    }
}

const deleteUserController = async function (req, res, next) {
    try {
        await User.deleteAllUsers();
        res.status(201).json("deleted all");
    } catch (error) {
        res.status(500).json(error);
    }
}

const deleteUserByIdController = async function (req, res, next) {
    try {
        let userId = req.params.id;
        //console.log(userId);
        await User.deleteUserById(userId);
        res.status(201).json(userId);
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports = { deleteUserByIdController, getUserByIdController, getAllUsersController, createUserController, deleteUserController }