const express = require('express');
const router = express.Router();
const bikeRideController = require("../controller/bikeRideController.js")

// hämtar alla rides
router.get('/', bikeRideController.getAllBikeRidesController);

// Hämtar alla cykelturer för den valda cykeln
router.get('/bike/:id', bikeRideController.getAllBikeridesByBikeIdController);

// Hämtar alla cykelturer för den valda user
router.get('/user/:id', bikeRideController.getAllBikeridesByUserIdController);

// startar bikeRide
router.post('/', bikeRideController.startBikeRideController);

// stoppar bikeRide
router.put('/stop', bikeRideController.stopBikeRideController);


module.exports = router;