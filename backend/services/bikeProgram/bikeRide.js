const randomLocation = require('random-location');
const bikeModels = require("../../models/bikeride.js");
const Bike = require("./bike");
const User = require("./../userService");
// En tom array för att spara alla tidsintervaller i.
let intervals = [];

module.exports = class BikeRide {
    constructor() {
        this.bike = new Bike();
        this.user = User;
        this.bikeModels = bikeModels;
        this.interval = null;
    }

    /**
   * Get a list of all bike rides from the database.
   * 
   * @returns {object[]} - A list of all bike ride objects.
   * @throws {Error} - In case the database operation fails, an error is thrown.
   */
    async getAllBikerides(){
        try {
            return await this.bikeModels.getAllBikeRides()
        } catch (error) {
            return error
        }
    }

    /**
* Get a list of all bike rides from the database.
* 
* @returns {object[]} - A list of all bike ride objects.
* @throws {Error} - In case the database operation fails, an error is thrown.
*/
    async getAllBikeRidesByBikeId(id) {
        try {
            return await this.bikeModels.getAllBikeRidesByBikeId(id);
        } catch (error) {
            return error
        }
    }
    /**
* Get a list of all bike rides from the database.
* 
* @returns {object[]} - A list of all bike ride objects.
* @throws {Error} - In case the database operation fails, an error is thrown.
*/
    async getAllBikeRidesByUserId(id) {
        try {
            return await this.bikeModels.getAllBikeRidesByUserId(id);
        } catch (error) {
            return error
        }
    }
    
    
    /**
    * Start a new bike ride and return a log of the ride.
    * 
    * @param {string} bikeId - The unique id of the bike.
    * @param {string} userId - The unique id of the user.
    * @returns {object} - A log of the bike ride, containing the bike id, start location, start time, end location, end time, and user id.
    * @throws {Error} - In case the database operation fails, an error is thrown.
    */
    async startBikeRide(bikeId, userId) {
        //denna log returneras till frontend, som fyller på med dom 
        this.bikeId = bikeId;
        this.userId = userId;
   //     console.log("1");
        try {
            let startLocation = await this.bike.getLocation(bikeId);
            this.log = {
                bike_id: bikeId,
                startLocation: startLocation.m_location,
                startTime: new Date(),
                endLocation: "",
                endTime: null,
                user_id: userId,
            }    
        } catch (error) {
            console.log(error);
        }
        //skickar till databasen i tabellen bike_table att status är tagen
        try {
            await this.bike.setStatus(bikeId, "tagen");

            // Starta en tidsintervall som uppdaterar bike.location varje minut
            this.interval = setInterval(async () => {
                // Använd randomLocation.getRandomLocation() för att generera slumpmässiga koordinater inom en radius på 10 km från Stockholm
                const { latitude, longitude } = randomLocation.randomCircumferencePoint(
                    { latitude: 59.3293, longitude: 18.0686 },
                    10000
                );

                // Uppdatera bike.location med de nya koordinaterna till bike_table databasen.
                let koordinater = `${latitude}, ${longitude}`;
                await this.bike.setLocation(bikeId, koordinater);
                console.log(koordinater)
            }, 30000)

            const intervalData = {
                bike: bikeId,
                interval: this.interval
            };

            // Spara objektet i arrayen intervals
            intervals.push(intervalData);

        //    console.log(this.log)
            return this.log
        } catch (error) {
            console.log(error)
        }
    }

    /**
   * End a bike ride by bike id and return a log of the ride.
   * 
   * @param {object} rideLog - A log of the bike ride, containing the bike id, start location, start time, end location, end time, and user id.
   * @returns {object} - A log of the bike ride, containing the bike id, start location, start time, end location, end time, user id, and cost.
   * @throws {Error} - In case the database operation fails, an error is thrown.
   */
    async stopBikeRideByBikeId(rideLog) {
        this.endTime = new Date();
        let endLocation = await this.bike.getLocation(rideLog.bike_id);
       // console.log(endLocation);
        // Beräkna varaktigheten på cykelturen genom att subtrahera starttiden från sluttiden
        const duration = this.endTime - new Date(rideLog.startTime);
        
        /*dividera resultatet med 1000 för att omvandla det från millisekunder till sekunder, 
        och sedan dividera det igen med 60 för att omvandla det till minuter. 
        Denna varaktighet multipliceras sedan med 10 för att räkna ut kostnaden.*/
        this.cost = duration / 1000 / 60 * 10;
        // Ändrar till rätt form    
        let sDate = new Date(rideLog.startTime)
        const end = this.endTime.toISOString().slice(0, 19).replace('T', ' ');
        const start = sDate.toISOString().slice(0, 19).replace('T', ' ');

        // Färdig logg till databasen 
        this.log = {
            bike_id: rideLog.bike_id,
            startLocation: rideLog.startLocation,
            startTime: start,
            endLocation: endLocation.m_location,
            endTime: end,
            user_id: rideLog.user_id,
            cost: this.cost
        }
        // Sparar cykelturen till databasen
        await this.bikeModels.saveBikeRide(this.log);
        await this.bike.setStatus(this.log.bike_id, "ledig");
        await this.bike.setLocation(this.log.bike_id, this.log.endLocation);
        // Söker efter ett objekt i listan 'intervals' där egenskapen 'bike'-
        // har samma värde som egenskapen 'bike_id' i objektet 'rideLog'
        const interval = await intervals.find(i => i.bike === rideLog.bike_id);
        //console.log(interval);
        // Avslutar tidsintervallet
        clearInterval(interval.interval);
        // Skapa en ny array som exkluderar objektet som matchar rideLog.bike_id
        const updatedIntervals = intervals.filter(i => i.bike !== rideLog.bike_id);
        // Ersätt den ursprungliga arrayen intervaller med den uppdaterade arrayen
        intervals = updatedIntervals;
        //console.log(this.log);
        return this.log;

    }
}