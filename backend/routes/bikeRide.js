const express = require('express');
const router = express.Router();
const bikeRideController = require("../controller/bikeRideController.js")
const oauth = require("../services/oauthCheck");
// hämtar alla rides
router.get('/', bikeRideController.getAllBikeRidesController);

// Hämtar alla cykelturer för den valda cykeln
router.get('/bike/:id', bikeRideController.getAllBikeridesByBikeIdController);

// Hämtar alla cykelturer för den valda user
router.get('/user/:id', bikeRideController.getAllBikeridesByUserIdController);

// Hämtar alla cykelturer för den valda user
router.get('/user', bikeRideController.getAllBikeridesByUserIdController);

// startar bikeRide
router.post('/', bikeRideController.startBikeRideController);

// stoppar bikeRide
router.put('/stop', oauth.oauthCheck, bikeRideController.stopBikeRideController);


module.exports = router;