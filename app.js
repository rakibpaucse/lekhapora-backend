const express = require('express')
var cors = require('cors');
const PORT = 8081;
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session);
const MONGO_URI = `mongodb+srv://lekhapora:lekhapora@cluster0.nblcl.mongodb.net/lekhapora?retryWrites=true&w=majority`
const mysql = require('mysql')
// const mysql = require('mysql2/promise');

const setRoutes = require('./routers/controlRouter')

const {dataBaseConnection} = require('./database');

// 




const middleware = [
    morgan('dev'),
    express.static('public'),
    express.urlencoded({extended:true}),
    express.json(),
    session({
        secret : process.env.SECRET_KEY || 'SECRET_KEY',
        resave: false,
        saveUninitialized : false,
        // store
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






dataBaseConnection.connect((err) => {
    if(err){
      console.log(err);
    }else{
        app.listen( process.env.PORT || PORT , () => {
            console.log(`Server is running on port ${PORT} and dataBase Connected`)
        })
    }
  })




