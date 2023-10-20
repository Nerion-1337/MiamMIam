const mysql = require("mysql2");


module.exports.SQL = mysql.createConnection({
    host:"localhost",
    user:"root",
    password: process.env.PASSWORD,
    database:"miam_miam"
})