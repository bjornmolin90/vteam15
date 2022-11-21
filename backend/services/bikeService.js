const bikeModels = require("./../models/bike.js");

const createBike = function (data) {
    try {
        return bikeModels.createBike(data);
    } catch (error) {
         return error;
    }
}

const getBike = function (id) {
    try {
        return bikeModels.getBikeById(id)
    } catch (error) {
        return error;
    }
}

const getAllBikes = function () {
    try {
        return bikeModels.getAllBikes()
    } catch (error) {
        return error;
    }
}

module.exports = { createBike, getBike, getAllBikes }