const geolib = require('geolib');
const bikeModels = require('../models/bike');
// Stockholm, göteborg och malmö chargers & parkingZones
const chargers = [
    // Stockholm
    { latitude: 59.334068, longitude: 18.027938 },
    { latitude: 59.340371, longitude: 18.046135 },
    { latitude: 59.344223, longitude: 18.080124 },
    { latitude: 59.336695, longitude: 18.115486 },
    { latitude: 59.347548, longitude: 18.054718 },
    // Malmö
    { latitude: 55.579310, longitude: 13.005788 },
    { latitude: 55.575713, longitude: 13.029018 },
    { latitude: 55.589018, longitude: 13.034455 },
    { latitude: 55.590344, longitude: 13.029945 },
    { latitude: 55.594045, longitude: 13.054472 },
    // Göteborg
    { latitude: 57.649998, longitude: 11.951757 },
    { latitude: 57.663968, longitude: 12.005519 },
    { latitude: 57.676871, longitude: 11.974944 },
    { latitude: 57.658901, longitude: 11.911498 },
    { latitude: 57.728716, longitude: 12.024272 }
];
const parkingZones = [
    // Stockholm
    { latitude: 59.332750, longitude: 18.013727 },
    { latitude: 59.343989, longitude: 18.073611 },
    { latitude: 59.350458, longitude: 18.049791 },
    { latitude: 59.337405, longitude: 18.060032 },
    { latitude: 59.317077, longitude: 18.057138 },
    // Malmö
    { latitude: 55.599505, longitude: 13.026585 },
    { latitude: 55.593793, longitude: 13.068517 },
    { latitude: 55.580675, longitude: 13.037817 },
    { latitude: 55.544047, longitude: 13.010860 },
    { latitude: 55.598870, longitude: 13.018348 },
    
    // Göteborg
    { latitude: 57.708833, longitude: 12.009578 },
    { latitude: 57.680575, longitude: 11.970096 },
    { latitude: 57.734732, longitude: 11.967846 }, 
    { latitude: 57.687009, longitude: 11.927766 },
    { latitude: 57.714515, longitude: 11.925767 }
     
];

// Definiera radie i meter
const Radius = 1000;


const isPointWithinArea = async function (coordinate, bikeId) {
    // kolla om koordinatern är inom den tillåtna zonen i dom tre städerna

// Gå igenom alla laddstationer och parkingZones om koordinatern är inom zonerna
for (let i = 0; i < chargers.length; i++) {
 
    if (geolib.isPointWithinRadius(coordinate, chargers[i], Radius)) {
        //console.log(`cykeln på ${coordinate.latitude}, ${coordinate.longitude} är inom en charger zon`);
        // Här borde man starta laddningen!
        await bikeModels.setParking(bikeId, "laddnings station")
        await bikeModels.updateBatteriLevel(bikeId, 100)

        return 0;
    }
    if (geolib.isPointWithinRadius(coordinate, parkingZones[i], Radius)) {
       // console.log(`cykeln på ${coordinate.latitude}, ${coordinate.longitude} är inom en parkerings zon`);
        // ingen extra avgift
        return 0;
    }
}
    // Extra avgift 20kr? inom det godkända området men inte på en parkeringsZon eller på en charger zon
    //console.log(`cykeln på ${coordinate.latitude}, ${coordinate.longitude} är inte inom en parkerings/charger zon Extra taxa 20kr!`);
    return 20;
}

module.exports = { isPointWithinArea }