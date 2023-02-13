const userModels = require("./../models/user.js");


const createUser = async function(userData) {
        /* 
        Create a new object in the database and return the newly created object. The database object will contain
        a unique id.

        parameters:
        userData-- a json? containing all relevant data according to the bikeTable

        catch:
        Exception-- in case the database operation fails, raise an exception
         */
        try {
            return await userModels.createUser(userData);
        }
        catch (error) {
            return error;
        }
    }

const getUserById = async function(userId) {
        /*
        Get a user by id and return the associated.

        parameters:
        bikeId-- a number to find a specific bike in the database.

        catch:
        Exception-- in case the database operation fails, raise an exception
        */
        try {
            return await userModels.getUserById(userId);
        }
        catch (error) {
            return error;
        }
    }

const getAllUsers = async function() {
        /*
        Get all bikes.
        */
        try {
            return await userModels.getAllUsers();
        }
        catch (error) {
            return error;
        }
    }

const deleteUserById = async function (id_) {
    try {
        return await userModels.deleteUser(id_);
    } catch (error) {
        return error;
    }
}

const deleteAllUsers = async function() {
        try {
            return await userModels.deleteAllUsers();        
        } catch (error) {
            return error;
        }
    }

module.exports = { deleteUserById, deleteAllUsers, getAllUsers, getUserById, createUser }