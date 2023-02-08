let db = require('./../config/db')

const getAllUsers = async function () {

    let sql = "SELECT * FROM users;"
    const results = await db.connection.promise().query(sql)
    return results[0]
}

const getUserById = async function (id_) {
    let sql = `SELECT * FROM users WHERE user_id = ${id_};`;
    const results = await db.connection.promise().query(sql)

    return results[0]
}

const createUser = async function (data) {
    let sql = `
        INSERT INTO users(userName, u_type, u_password, firstname, lastname, adress, postcode, city, saldo, u_email)
        VALUES('${data.username}', '${data.u_type}', '${data.u_password}', '${data.firstname}', '${data.lastname}', '${data.adress}', '${data.postcode}', '${data.city}', ${data.saldo}, '${data.u_email}');`;
    const results = await db.connection.promise().query(sql)

    return results[0]
}

const deleteAllUsers = async function () {
    let sql = `DELETE FROM users`;
    const results = await db.connection.promise().query(sql)
    //  console.log(results[0]);
    return results[0]
}

module.exports = { getUserById, createUser, getAllUsers, deleteAllUsers };