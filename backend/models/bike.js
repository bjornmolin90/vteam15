let db = require('./../config/db')

const getAllBikes = async function () {

    let sql = "SELECT * FROM bikes;"
    const results = await db.connection.promise().query(sql)
    return results[0]

}

const getBikeById = async function (id_) {
    let sql = `SELECT * FROM bikes WHERE bike_id = ${id_};`;
    const results = await db.connection.promise().query(sql)
 
    return results[0]
}

const createBike = async function (data) {
    let sql = `
        INSERT INTO bikes(city, parking, charging_status, available_status, m_location, speed)
        VALUES('${data.city}', '${data.parking}', '${data.charging_status}', '${data.available_status}', '${data.m_location}', '${data.speed}');`;
    const results = await db.connection.promise().query(sql)

    return results[0]
}

const updateSpeed = function (data1) {
    try {
        dummyData.push(data1)
        return
    } catch (error) {
        return error
    }
}

const getStatus = async function (bikeId) {
    let sql = `SELECT status FROM bikes WHERE bike_id = ${bikeId};`;
    const results = await db.connection.promise().query(sql)
  //  console.log(results[0]);
    return results[0]
}

const setStatus = async function (bikeId, status) {
    let sql = `UPDATE bikes SET available_status = '${status}' WHERE bike_id = ${bikeId};`;
    const results = await db.connection.promise().query(sql)
    //console.log(results[0]);
    return results[0]
}

const updateBatteriLevel = async function (bikeId, battery) {
    let sql = `UPDATE bike SET battery = ${battery} WHERE bike_id = ${bikeId};`;
    const results = await db.connection.promise().query(sql)
    //console.log(results[0]);
    return results[0]
}

const deleteAllBikes = async function () {
    let sql = `DELETE FROM bikes`;
    const results = await db.connection.promise().query(sql)
    //  console.log(results[0]);
    return results[0]
}

const deleteBikeById = async function (id) {
    let sql = `DELETE FROM bikes where bike_id = ${id}`;
    const results = await db.connection.promise().query(sql)
    //  console.log(results[0]);
    return results[0]
}

const getLocation = async function (bikeId) {
    let sql = `SELECT m_location FROM bikes WHERE bike_id = ${bikeId};`;
    const results = await db.connection.promise().query(sql);
   // console.log(results[0][0].m_location);
    return results[0][0]
};

const setLocation = async function (bikeId, location) {
    let sql = `UPDATE bikes SET m_location = '${location}' WHERE bike_id = ${bikeId};`;
    const results = await db.connection.promise().query(sql)
    //console.log(results[0]);
    return results[0]
}

const getAllBikesInACity = async function (city) {
    let sql = `SELECT * FROM bikes where city = '${city}';`;
    const results = await db.connection.promise().query(sql)
    //console.log(results[0]);
    return results[0]
}
module.exports = { getAllBikesInACity, deleteBikeById, updateBatteriLevel, getBikeById, createBike, getAllBikes, updateSpeed, getStatus, setStatus, deleteAllBikes, getLocation, setLocation };