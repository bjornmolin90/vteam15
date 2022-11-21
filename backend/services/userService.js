const userModels = require("./../models/user.js");

const getUserById = function (id) {

    try {
        console.log("id");
        let user = userModels.getUserById(id);
        return user;
    } catch (e) {
        // Log Errors
        return e;
    }
}

const getAllUsers = function () {

    try {
        let users = userModels.getAllUsers();
        return users;
    } catch (e) {
        // Log Errors
        return e;
    }
}

const createUser = function (data) {
    try {
        return userModels.createUser(data);
    } catch (error) {
        return error;
    }
}

module.exports = { getUserById, getAllUsers, createUser }