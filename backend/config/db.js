const mysql = require('mysql2')

/* const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DB
}); */

const connection = mysql.createPool({
    host: 'database',
    user: 'root',
    password: 'pass',
    database: 'vteam',
    multipleStatements: true
});

module.exports = { connection }