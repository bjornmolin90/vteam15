const express = require('express');
const router = express.Router();
const bikeController = require("./../controller/bikeController.js")

// hämtar alla användare
router.get('/', bikeController.getAllBikesController);
// hämtar användare med id
router.get('/:id', bikeController.getBikeController);
// skapar en ny användare
router.post('/', bikeController.createBikeController);

module.exports = router;