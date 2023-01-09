const Bike = require("./bike");
const bikeService = require("./../bikeService");
const User = require("./../userService");
const BikeRide = require("./bikeRide");
const bikeModels = require("../../models/bikeride.js");
const startSimulator = async function () {
    // om det finns cyklar så raderas dom här
    await bikeService.deleteAllBikes();
    await User.deleteAllUsers();
    try {
        await bikeModels.deleteAllBikeRides();   
    } catch (error) {
        console.log(error);
    }
    // skapar 1000 cyklar och användare med saldo
   
    for (let i = 0; i < 2000; i++) {
        await bikeService.createBike({
            "city": "stockholm",
            "parking": "on-street",
            "charging_status": "50",
            "available_status": "ledig",
            "m_location": "40.7128, -74.0060",
            "speed": "0 km/h"
        });
        await User.createUser({
            "username": "mange123",
            "u_type": "kund",
            "u_password": "123",
            "firstname": "Magnus",
            "lastname": "ostling",
            "adress": "adress 1a",
            "postcode": "31123",
            "city": "Stockholm",
            "saldo": 1000
        });
    }
    
    let allUsers = await User.getAllUsers()
    let temp = [];

    for (let i = 0; i < allUsers.length; i++) {
        //console.log( await new BikeRide().startBikeRide(allUsers[i].user_id, i + 1));
        temp.push(await new BikeRide().startBikeRide(allUsers[i].user_id, i + 1))
    }
    setTimeout(async () => {
        for (let i = 0; i < allUsers.length; i++) {
            let log = {
                "bike_id": temp[i].bike_id,
                "startTime": temp[i].startTime,
                "startLocation": temp[i].startLocation,
                "user_id": temp[i].bike_id
            }
            await new BikeRide().stopBikeRideByBikeId(log);
        }
    }, 60000);

}

module.exports = { startSimulator };