const express = require('express');
const router = express.Router();
const bikeController = require("./../controller/bikeController.js");

// localhost:1337/api/v01/bike - hämtar alla bikes.
router.get('/', bikeController.getAllBikesController);

// localhost:1337/api/v01/bike/{id} - hämtar bikes med bike_id.
router.get('/:id', bikeController.getBikeController);

// localhost:1337/api/v01/bike/ - Hämta alla cyklar med status "Ledig".
//router.get('/', bikeController.changeStatusBikeController);

// localhost:1337/api/v01/bike - skapar en ny bike.
router.post('/', bikeController.createBikeController);

// localhost:1337/api/v01/bike - ta bort alla cyklar
router.delete('/', bikeController.deleteAllBikesController);

// localhost:1337/api/v01/bike - ta bort en cykel med bikeId
router.delete('/:id', bikeController.deleteBikeByIdController);

module.exports = router;