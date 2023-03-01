const BikeRide = require("../services/bikeProgram/bikeRide.js");

const startBikeRideController = async function (req, res, next) {

   try {
        let Bikeride = await new BikeRide().startBikeRide(req.body.bikeId, req.body.userId);
       res.status(201).json(Bikeride);
    } catch (error) {
       res.status(500).json(error);
    }
}

const stopBikeRideController = async function (req, res, next) {

    try {
        let Bikeride = await new BikeRide().stopBikeRide(req.body);
       // console.log(Bikeride)
        res.status(204).json(Bikeride);
    } catch (error) {
        res.status(500).json(error);
    }
}

const getAllBikeRidesController = async function (req, res, next) {

    try {
        let Bikeride = await new BikeRide().getAllBikerides();
        // console.log(Bikeride)
        res.status(200).json(Bikeride);
    } catch (error) {
        res.status(500).json(error);
    }
}

const getAllBikeridesByBikeIdController = async function (req, res, next) {
    try {
        let bikeId = req.params.id;
        let Bikeride = await new BikeRide().getAllBikeRidesByBikeId(bikeId);
        // console.log(Bikeride)
        res.status(200).json(Bikeride);
    } catch (error) {
        res.status(500).json(error)
    }
}


const getAllBikeridesByUserIdController = async function (req, res, next) {
    try {
        let bikeId = req.params.id;
        let Bikeride = await new BikeRide().getAllBikeRidesByUserId(bikeId);
        // console.log(Bikeride)
        res.status(200).json(Bikeride);
    } catch (error) {
        res.status(500).json(error)
    }
}
const getAllBikesInACityController = async function (req, res, next) {
    try {
        let city = req.params.city;
        let Bikeride = await new BikeRide().getAllBikesInACity(city);
        // console.log(Bikeride)
        res.json(Bikeride);
    } catch (error) {
        res.status(500).json(error)
    }
}
module.exports = { getAllBikesInACityController, getAllBikeridesByUserIdController, getAllBikeridesByBikeIdController, startBikeRideController, stopBikeRideController, getAllBikeRidesController }