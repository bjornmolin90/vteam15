const bikeService = require("../services/bikeService");

const createBikeController = async function (req, res, next) {

    try {
        let createdBike = await bikeService.createBike(req.body);
        res.status(201).json(createdBike);
    } catch (error) {
        res.status(500).json(error);
    }
}

const getBikeController = async function (req, res, next) {

    let id = req.params.id;

    try {
        let getBike = await bikeService.getBikeById(id);
        res.status(200).json(getBike);
    } catch (error) {
        res.status(500).json(error);
    }
}

const getAllBikesController = async function (req, res, next) {

    try {
        let getBike = await bikeService.getAllBikes();
        res.status(200).json(getBike);
    } catch (error) {
        res.status(500).json(error);
    }
}

const deleteAllBikesController = async function (req, res, next) {
    //  console.log(req.body.status);
    try {
        let getBike = await bikeService.deleteAllBikes();
        res.status(204).json(getBike);
    } catch (error) {
        res.status(500).json(error);
    }
}

const deleteBikeByIdController = async function (req, res, next) {
    try {
        let deleteBike = await bikeService.deleteBikeById(req.params.id);
        res.status(204).json(deleteBike);
    } catch (error) {
        res.status(500).json(error);
    }
}

const getAllBikesInACityController = async function (req, res, next) {
    try {
        let city = req.params.city;
        let getAllBikesInACity = await bikeService.getAllBikesInACity(city);
        res.status(200).json(getAllBikesInACity);
    } catch (error) {
        res.status(500).json(error)
    }
}

const changeLocationBikeController = async function (req, res) {
    let location = `${req.body.coordinate.latitude} ${req.body.coordinate.longitude}`;
    let bike_id = req.body.bike_id;
    try {
        let changeLocation = await bikeService.getAllBikesInACity(bike_id, location);
        res.status(200).json(changeLocation);
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = { changeLocationBikeController, deleteBikeByIdController, deleteAllBikesController, createBikeController, getBikeController, getAllBikesController, getAllBikesInACityController }