const express = require('express')
var cors = require('cors');
const PORT = 8081;
const app = express()
const morgan = require('morgan')
const session = require('express-session')

const setRoutes = require('./routers/controlRouter')
// const {dataBaseConnection} = require('./database');

const mysql = require('mysql')
const dotenv = require("dotenv").config()


var dataBaseConnection;


const middleware = [
    morgan('dev'),
    express.static('public'),
    express.urlencoded({extended:true}),
    express.json(),
    session({
        secret : process.env.SECRET_KEY || 'SECRET_KEY',
        resave: false,
        saveUninitialized : false,
    }),
]

app.use(middleware);
app.use(cors())
setRoutes(app)

app.use((req , res , next) => {
    let err = new Error('404, file not found')
    err.status = 404
    next(err)
})

app.listen( process.env.PORT || PORT , () => {
    console.log(`Server is running on port ${PORT}`)
})

function handleDisconnect() {

    dataBaseConnection = mysql.createConnection({
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
    } , { multipleStatements: true })

    dataBaseConnection.connect((err) => {
        if(err){
            console.log("error when connecting to db:", err);
            setTimeout(handleDisconnect, 2000);
        }else{
            console.log(`and dataBase Connected`)
        }
      })

        // setInterval(function () {
        //     dataBaseConnection.query('SELECT 1', (error, results, fields)=> {
        //         console.log(results);
        //     });
        // }, 5000);

      dataBaseConnection.on("error", function(err) {

        console.log("db error...........", err); handleDisconnect();
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
          handleDisconnect();
        }else {
            console.log('++++++++++++++++++++++++++++++++++++++++++++++++');
          throw err;
        }
      });

}

handleDisconnect();

