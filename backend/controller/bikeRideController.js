const BikeRide = require("../services/bikeProgram/bikeRide.js");

const startBikeRideController = async function (req, res, next) {

   try {
        let Bikeride = await new BikeRide().startBikeRide(req.body.bikeId, req.body.userId);
        res.json(Bikeride);
    } catch (error) {
        res.json(error);
    }
}

const stopBikeRideController = async function (req, res, next) {

    try {
        let Bikeride = await new BikeRide().stopBikeRideByBikeId(req.body);
       // console.log(Bikeride)
        res.json(Bikeride);
    } catch (error) {
        res.json(error);
    }
}

const getAllBikeRidesController = async function (req, res, next) {

    try {
        let Bikeride = await new BikeRide().getAllBikerides();
        // console.log(Bikeride)
        res.json(Bikeride);
    } catch (error) {
        res.json(error);
    }
}

const getAllBikeridesByBikeIdController = async function (req, res, next) {
    try {
        let bikeId = req.params.id;
        let Bikeride = await new BikeRide().getAllBikeRidesByBikeId(bikeId);
        // console.log(Bikeride)
        res.json(Bikeride);
    } catch (error) {
        res.json(error)
    }
}


const getAllBikeridesByUserIdController = async function (req, res, next) {
    try {
        let bikeId = req.params.id;
        let Bikeride = await new BikeRide().getAllBikeRidesByUserId(bikeId);
        // console.log(Bikeride)
        res.json(Bikeride);
    } catch (error) {
        res.json(error)
    }
}
const getAllBikesInACityController = async function (req, res, next) {
    try {
        let city = req.params.city;
        let Bikeride = await new BikeRide().getAllBikesInACity(city);
        // console.log(Bikeride)
        res.json(Bikeride);
    } catch (error) {
        res.json(error)
    }
}
module.exports = { getAllBikesInACityController, getAllBikeridesByUserIdController, getAllBikeridesByBikeIdController, startBikeRideController, stopBikeRideController, getAllBikeRidesController }