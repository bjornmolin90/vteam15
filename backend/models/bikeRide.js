let db = require('./../config/db')

const saveBikeRide = async function (log) {
   
//console.log(log);
    let sql = `
        INSERT INTO bike_rides(bike_id, user_id, start_position, end_position, cost, start_time, end_time)
        VALUES(${log.bike_id}, ${log.user_id}, '${log.startLocation}', '${log.endLocation}', ${log.cost}, '${log.startTime}', '${log.endTime}');`;
    await db.connection.promise().query(sql);
    }

const getAllBikeRides = async function () {

    let sql = "SELECT * FROM bike_rides;"
    const results = await db.connection.promise().query(sql)
    return results[0]

}

const getAllBikeRidesByUserId = async function (userId) {

    let sql = `SELECT * FROM bike_rides WHERE user_id = ${userId};`;
    const results = await db.connection.promise().query(sql)
    return results[0]

}

const getAllBikeRidesByBikeId = async function (bikeId) {

    let sql = `SELECT ride_id, bike_id, user_id, start_position, end_position, start_time, end_time  FROM bike_rides WHERE bike_id = ${bikeId};`;
    const results = await db.connection.promise().query(sql)
    return results[0]

}

const deleteAllBikeRides = async function () {

    let sql = `DELETE FROM bike_rides`;
    const results = await db.connection.promise().query(sql)
    return results[0]
}

module.exports = { saveBikeRide, getAllBikeRides, getAllBikeRidesByUserId, getAllBikeRidesByBikeId, deleteAllBikeRides };