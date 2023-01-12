const bikeModels = require("../../models/bike.js");

module.exports = class Bike {
    constructor(bikeModel = bikeModels) {
        this.bikeModels = bikeModel;
    }

    /**
     * Update the speed of a bike.
     * 
     * @param {number} bikeId - The id of the bike to update.
     * @param {number} bikeSpeed - The new speed of the bike.
     * @returns {object} - The updated bike object.
     * @throws {Error} - In case the database operation fails, an error is thrown.
     */
    async updateSpeed(bikeId, bikeSpeed) {
        try {
            return await this.bikeModels.updateSpeed(bikeId, bikeSpeed);
        }
        catch (error) {
            return error;
        }
    }

    /**
     * Get the speed of a bike.
     * 
     * @returns {number} - The speed of the bike.
     */
    async getSpeed() {
        return this.speed;
    }

    /**
    * Sets the status of the bike.
    * @param {number} bikeId - bikeId of the bike.
    * @param {string} status - The new status of the bike.
     */
    async setStatus(bikeId, status) {
        try {
            // Get the status of the bike from the bikeModels object
            return await this.bikeModels.setStatus(bikeId, status);
        } catch (error) {
            // Return the error if there is a problem getting the status of the bike
            return error;
        }
    }


    /**
     * Returns the status of the bike with the specified ID.
     * 
     * @param {number} bikeId - The ID of the bike.
     * @returns {string} - The status of the bike.
     * @throws {Error} - If there is an error getting the status of the bike.
     */
    async getStatus(bikeId) {
        try {
            // Get the status of the bike from the bikeModels object
            return await this.bikeModels.getStatus(bikeId);
        } catch (error) {
            // Return the error if there is a problem getting the status of the bike
            return error;
        }
    }

    /**
     * Sets the location of the bike.
     * 
     * @param {string} location - The new location of the bike.
     */
    async setLocation(bikeId, location) {
        try {
            // Get the status of the bike from the bikeModels object
            return await this.bikeModels.setLocation(bikeId, location);
        } catch (error) {
            // Return the error if there is a problem getting the status of the bike
            return error;
        }
    }

    /**
     * Returns the current location of the bike.
     * 
     * @returns {string} - The current location of the bike.
     */
    async getLocation(bikeId) {
        try {
            // Get the location of the bike from the bikeModels object
            return await this.bikeModels.getLocation(bikeId);
        } catch (error) {
            // Return the error if there is a problem getting the location of the bike
            return error;
        }
    }

    /**
     * Updates the battery level of the bike with the given bikeId.
     * 
     * @param {number} bikeId - The id of the bike to update.
     * @param {number} battery - The new battery level of the bike.
     * @returns {object} - The updated bike object.
     * @throws {Error} - In case the database operation fails, an error is thrown.
     */
    async updateBatteriLevel(bikeId, battery) {
        await this.bikeModels.updateBatteriLevel(bikeId, battery);
    }
}