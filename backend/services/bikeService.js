const bikeModels = require("../models/bike")
   
   /**
     * Create a new bike object in the database and return the newly created object. The database object will contain
     * a unique id.
     * 
     * @param {object} bikeData - A JSON object containing all relevant data according to the bikeTable.
     * @returns {object} - The newly created bike object.
     * @throws {Error} - In case the database operation fails, an error is thrown.
     */
const createBike = async function (bikeData) {
    try {
        return await bikeModels.createBike(bikeData);
    }
    catch (error) {
        return error;
    }
}

    /**
     * Get a bike by id and return the associated object.
     * 
     * @param {number} bikeId - A number to find a specific bike in the database.
     * @returns {object} - The bike object associated with the given id.
     * @throws {Error} - In case the database operation fails, an error is thrown.
     */
const getBikeById = async function(bikeId) {
    try {
        return await bikeModels.getBikeById(bikeId);
    }
    catch (error) {
        return error;
    }
}

    /**
     * Get all bikes.
     * 
     * @returns {Array} - An array of all bike objects in the database.
     * @throws {Error} - In case the database operation fails, an error is thrown.
     */
const getAllBikes = async function() {
    try {
        return await bikeModels.getAllBikes();
    }
    catch (error) {
        return error;
    }
}

    /**
     * Deletes all bikes.
     * 
     * @throws {Error} - In case the database operation fails, an error is thrown.
     */
const deleteAllBikes = async function() {
    try {
        return await this.bikeModels.deleteAllBikes();
    } catch (error) {
        return error;
    }
}

    /**
     * Delete bike with bike_id.
     * 
     * @throws {Error} - In case the database operation fails, an error is thrown.
     */
const deleteBikeById = async function(id) {
    try {
        return await this.bikeModels.deleteBikeById(id);
    } catch (error) {
        return error;
    }
}

const getAllBikesInACity = async function (city) {
    try {
        return await bikeModels.getAllBikesInACity(city);
    } catch (error) {
        return error;
    }
}

module.exports = { createBike, getBikeById, getAllBikes, deleteAllBikes, deleteBikeById, getAllBikesInACity }