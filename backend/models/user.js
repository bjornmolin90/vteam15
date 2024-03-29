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

const getUserByEmail = async function (email) {
    let sql = `SELECT user_id FROM users WHERE u_email = '${email}';`;
    const results = await db.connection.promise().query(sql)

    return results[0]
}

const createUser = async function (data) {
    let sql = `
    INSERT INTO users(userName, u_type, u_password, firstname, lastname, adress, postcode, city, u_email)
    VALUES('${data.username}', '${data.u_type}', '${data.u_password}', '${data.firstname}', '${data.lastname}', '${data.adress}', '${data.postcode}', '${data.city}', '${data.u_email}');`;
    const results = await db.connection.promise().query(sql)

    return results[0]
}

const deleteAllUsers = async function () {
    let sql = `DELETE FROM users`;
    const results = await db.connection.promise().query(sql)
    //  console.log(results[0]);
    return results[0]
}

const deleteUser = async function (id_) {
    let sql = `DELETE FROM users WHERE user_id = ${id_};`;
    await db.connection.promise().query(sql);
}

module.exports = { getUserByEmail, deleteUser ,getUserById, createUser, getAllUsers, deleteAllUsers };
