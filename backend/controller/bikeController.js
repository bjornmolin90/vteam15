const bikeService = require("./../services/bikeService.js");

const createBikeController = async function (req, res, next) {

   console.log(req.body);
    try {
        let startBike = await bikeService.createBike(req.body);
        res.json(startBike);
    } catch (error) {
        res.json(error);
    }
}

const getBikeController = async function (req, res, next) {

    let id = req.params.id;

    try {
        let getBike = await bikeService.getBike(id);
        console.log(getBike);
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


module.exports = { createBikeController, getBikeController, getAllBikesController }