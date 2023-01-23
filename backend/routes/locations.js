const express = require('express');
const router = express.Router();


router.get('/charger', (req, res) => {
    const chargers = [
        // Stockholm chargers
        { latitude: 59.334068, longitude: 18.027938 },
        { latitude: 59.340371, longitude: 18.046135 },
        { latitude: 59.344223, longitude: 18.080124 },
        { latitude: 59.336695, longitude: 18.115486 },
        { latitude: 59.347548, longitude: 18.054718 },
        // Malmö chargers
        { latitude: 55.579310, longitude: 13.005788 },
        { latitude: 55.575713, longitude: 13.029018 },
        { latitude: 55.589018, longitude: 13.034455 },
        { latitude: 55.590344, longitude: 13.029945 },
        { latitude: 55.594045, longitude: 13.054472 },
        // Göteborg chargers
        { latitude: 57.649998, longitude: 11.951757 },
        { latitude: 57.663968, longitude: 12.005519 },
        { latitude: 57.676871, longitude: 11.974944 },
        { latitude: 57.658901, longitude: 11.911498 },
        { latitude: 57.728716, longitude: 12.024272 }
    ];
   
    res.json(chargers);
})

router.get('/parkingzones', (req, res) => {
    const parkingZones = [
        // Stockholm parkingZones
        { latitude: 59.332750, longitude: 18.013727 },
        { latitude: 59.343989, longitude: 18.073611 },
        { latitude: 59.350458, longitude: 18.049791 },
        { latitude: 59.337405, longitude: 18.060032 },
        { latitude: 59.317077, longitude: 18.057138 },
        // Malmö parkingZones
        { latitude: 55.599505, longitude: 13.026585 },
        { latitude: 55.593793, longitude: 13.068517 },
        { latitude: 55.580675, longitude: 13.037817 },
        { latitude: 55.544047, longitude: 13.010860 },
        { latitude: 55.598870, longitude: 13.018348 },
        // Göteborg parkingZones
        { latitude: 57.708833, longitude: 12.009578 },
        { latitude: 57.680575, longitude: 11.970096 },
        { latitude: 57.734732, longitude: 11.967846 },
        { latitude: 57.687009, longitude: 11.927766 },
        { latitude: 57.714515, longitude: 11.925767 }

    ];

    res.json(parkingZones);
})

module.exports = router;