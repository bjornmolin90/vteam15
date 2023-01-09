const express = require('express');
const router = express.Router();
const bikeController = require("../controller/bikeController.js")

// http://localhost:1337/v1/city - hämtar alla städer - nödvändigt?
//router.get('/', bikeRideController.getAllBikeRidesController);

// http://localhost:1337/v1/city - lägger till en stad - nödvändigt?
//router.post('/', bikeRideController.getAllBikeRidesController);

// http://localhost:1337/v1/city - Tar bort en stad - nödvändigt?
//router.delete('/', bikeRideController.startBikeRideController);

// http://localhost:1337/v1/city/{city} - Hämtar alla cyklar och laddstationer i den valda staden.
router.get('/:city', bikeController.getAllBikesInACityController);

module.exports = router;