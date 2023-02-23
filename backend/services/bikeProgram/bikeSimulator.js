//const Bike = require("./bike");
const bikeService = require("./../bikeService");
const User = require("./../userService");
const BikeRide = require("./bikeRide");
const bikeModels = require("../../models/bike");

const startSimulator = async function () {

    await bikeModels.deleteAllTables();
    // skapar 1000 cyklar
    for (let i = 0; i < 1000; i++) {
        bikeService.createBike({
            "city": "stockholm",
            "parking": "on-street",
            "charging_status": "100",
            "available_status": "ledig",
            "m_location": "59.338758, 18.052715",
            "speed": "0"
        })
    }
    // skapar 1000 användare
    for (let i = 0; i < 1000; i++) {
        await User.createUser({
            "username": `user${i}`,
            "u_type": "kund",
            "u_password": "123",
            "firstname": "förnamn",
            "lastname": "efternamn",
            "adress": "adress 1a",
            "postcode": "31123",
            "city": "Stockholm"
        })
    }
    let allUsers = await User.getAllUsers()
    let temp = [];

    for (let i = 0; i < allUsers.length; i++) {
        temp.push(await new BikeRide().startBikeRide(allUsers[i].user_id, i + 1))
    }
    setTimeout(async () => {
        for (let i = 0; i < allUsers.length; i++) {
            let log = await {
                "bike_id": temp[i].bike_id,
                "startTime": temp[i].startTime,
                "startLocation": temp[i].startLocation,
                "user_id": temp[i].bike_id
            }
            //   console.log(log);
            await new BikeRide().stopBikeRide(log);
        }
    }, 120000);
}

module.exports = { startSimulator };
