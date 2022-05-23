const mysql = require('mysql')
const dotenv = require("dotenv").config()


const dataBaseConnection = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
} , { multipleStatements: true })


module.exports = {
  dataBaseConnection
}





