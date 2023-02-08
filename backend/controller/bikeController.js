
const bikeService = require("../services/bikeService");

const createBikeController = async function (req, res, next) {

    console.log(req.body);
    try {
        let createdBike = await bikeService.createBike(req.body);
        res.json(createdBike);
    } catch (error) {
        res.json(error);
    }
}

const getBikeController = async function (req, res, next) {

    let id = req.params.id;

    try {
        let getBike = await bikeService.getBikeById(id);
        res.json(getBike);
    } catch (error) {
        res.json(error);
    }
}

const getAllBikesController = async function (req, res, next) {
    try {
        let getBike = await bikeService.getAllBikes();
        res.json(getBike);
    } catch (error) {
        res.json(error);
    }
}

const deleteAllBikesController = async function (req, res, next) {
    //  console.log(req.body.status);
    try {
        let getBike = await bikeService.deleteAllBikes();
        res.json(getBike);
    } catch (error) {
        res.json(error);
    }
}

const deleteBikeByIdController = async function (req, res, next) {
    try {
        let deleteBike = await bikeService.deleteBikeById(req.params.id);
        console.log(deleteBike);
        res.json(deleteBike);
    } catch (error) {
        res.json(error);
    }
}
const getAllBikesInACityController = async function (req, res, next) {
    try {
        let city = req.params.city;
        let getAllBikesInACity = await bikeService.getAllBikesInACity(city);
        res.json(getAllBikesInACity);
    } catch (error) {
        res.json(error)
    }
}

module.exports = { deleteBikeByIdController, deleteAllBikesController, createBikeController, getBikeController, getAllBikesController, getAllBikesInACityController }