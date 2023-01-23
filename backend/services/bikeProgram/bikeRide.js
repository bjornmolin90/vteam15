const randomLocation = require('random-location');
const bikeRideModels = require("../../models/bikeride.js");
const bikeModels = require('../../models/bike.js'); 
const Bike = require("./bike");
const User = require("./../userService");
const checkParking = require("../coordinatesChecker")
// En tom array för att spara alla tidsintervaller i.
let intervals = [];

module.exports = class BikeRide {
    constructor() {
        this.bike = new Bike();
        this.user = User;
        this.bikeRideModels = bikeRideModels;
        this.interval = null;
        this.checkParking = checkParking;
        this.bikeModels = bikeModels;
    }

    /**
   * Get a list of all bike rides from the database.
   * 
   * @returns {object[]} - A list of all bike ride objects.
   * @throws {Error} - In case the database operation fails, an error is thrown.
   */
    async getAllBikerides(){
        try {
            return await this.bikeRideModels.getAllBikeRides()
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
            return await this.bikeRideModels.getAllBikeRidesByBikeId(id);
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
                return await this.bikeRideModels.getAllBikeRidesByUserId(id);
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
        let startLocation = await this.bike.getLocation(this.bikeId);
        
        this.log = {
            bike_id: bikeId,
            startLocation: startLocation.m_location,
            startTime: new Date(),
            endLocation: "",
            endTime: null,
            user_id: userId,
        }    

        //skickar till databasen i tabellen bike_table att status är tagen
        await this.bike.setStatus(bikeId, "tagen");

        // Starta en tidsintervall som uppdaterar bike.location varje minut
        this.interval = setInterval(async () => {

            let getLocation = await this.bikeModels.getBikeById(this.bikeId);

            let randomBikeSpeed = Math.floor(Math.random() * 26);
            await this.bike.updateSpeed(bikeId, randomBikeSpeed);

            let tempKo = getLocation[0].m_location.split(", ");
            // Definiera startkoordinaterna
            let startLat = parseFloat(tempKo[0]);
            let startLng = parseFloat(tempKo[1]);

            // Räkna ut förflyttningen i km
            let speed = Number(randomBikeSpeed); // km/h
            let time = 1; // minuter
            let distance = speed * (time / 60); // km

            // Slumpa riktning (0 = norr, 1 = öster, 2 = söder, 3 = väster)
            let direction = Math.floor(Math.random() * 4);

            // Räkna ut vinkeln för förflyttningen i radianer
            let bearing;
            switch (direction) {
                case 0:
                    bearing = 0; // norr
                    break;
                case 1:
                    bearing = 90; // öster
                    break;
                case 2:
                    bearing = 180; // söder
                    break;
                case 3:
                    bearing = 270; // väster
                    break;
                default:
                    bearing = 0;
            }

            let bearingRad = bearing * (Math.PI / 180);

            // Räkna ut den nya latituden och longituden
            let endLat = startLat + (distance * Math.cos(bearingRad)) / 111.32;
            let endLng = startLng + (distance * Math.sin(bearingRad)) / (111.32 * Math.cos(startLat));

            // Hämtar cykel batteri nivå
            let newBattery = await this.bikeModels.getBatteriLevel(bikeId);
            // Ändra batteri -1
            newBattery = newBattery[0].charging_status - 1;
            //console.log(newBattery);
            await this.bikeModels.updateBatteriLevel(bikeId, newBattery);

            // Uppdatera bike.location med de nya koordinaterna till bike_table databasen.
            let koordinater = `${endLat}, ${endLng}`;
            await this.bike.setLocation(bikeId, koordinater);
            //console.log(koordinater)
        }, 15000)

        const intervalData = {
            bike: bikeId,
            interval: this.interval
        };

        // Spara objektet i arrayen intervals
        intervals.push(intervalData);

    //    console.log(this.log)
        return this.log
}

    /**
   * End a bike ride by bike id and return a log of the ride.
   * 
   * @param {object} rideLog - A log of the bike ride, containing the bike id, start location, start time, end location, end time, and user id.
   * @returns {object} - A log of the bike ride, containing the bike id, start location, start time, end location, end time, user id, and cost.
   * @throws {Error} - In case the database operation fails, an error is thrown.
   */
    async stopBikeRide(rideLog) {
        this.endTime = new Date();
        let endLocation = await this.bike.getLocation(rideLog.bike_id);
       // console.log(endLocation);
        // Beräkna varaktigheten på cykelturen genom att subtrahera starttiden från sluttiden
        const duration = this.endTime - new Date(rideLog.startTime);
        
        /*dividera resultatet med 1000 för att omvandla det från millisekunder till sekunder, 
        och sedan dividera det igen med 60 för att omvandla det till minuter. 
        Denna varaktighet multipliceras sedan med 10 för att räkna ut kostnaden.*/
        this.cost = duration / 1000 / 60 * 10;
        let fastTaxa = 20;
        let temp = endLocation.m_location.split(",")
        let doneCoordinates = {
            latitude: temp[0], longitude:temp[1]}
        //console.log(doneCoordinates);
        let parkeringsTaxa = await this.checkParking.isPointWithinArea(doneCoordinates, rideLog.bike_id)

        this.cost += fastTaxa + parkeringsTaxa;
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
            cost: this.cost,
            parkeringsTaxa: parkeringsTaxa,
            fastTaxa: fastTaxa
        }
       
        // Söker efter ett objekt i listan 'intervals' där egenskapen 'bike'-
        // har samma värde som egenskapen 'bike_id' i objektet 'rideLog'
        const interval = await intervals.find(i => i.bike === rideLog.bike_id);
        //console.log(interval);
        // Avslutar tidsintervallet
        clearInterval(interval.interval);

        // Sparar cykelturen till databasen
        await this.bikeRideModels.saveBikeRide(this.log);
        await this.bike.setStatus(this.log.bike_id, "ledig");
        await this.bike.updateSpeed(this.log.bike_id, 0);
        await this.bike.setLocation(this.log.bike_id, this.log.endLocation);
        // Skapa en ny array som exkluderar objektet som matchar rideLog.bike_id
        const updatedIntervals = intervals.filter(i => i.bike !== rideLog.bike_id);
        // Ersätt den ursprungliga arrayen intervaller med den uppdaterade arrayen
        intervals = updatedIntervals;
        //console.log(this.log);
        return this.log;
    }
}