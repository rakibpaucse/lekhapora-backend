const express = require('express')
var cors = require('cors');
const PORT = 8081;
const app = express()
const morgan = require('morgan')
const session = require('express-session')
const setRoutes = require('./routers/controlRouter')

const {dataBaseConnection} = require('./database');



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



dataBaseConnection.connect((err) => {
    if(err){
      console.log(err);
    }else{
        app.listen( process.env.PORT || PORT , () => {
            console.log(`Server is running on port ${PORT} and dataBase Connected`)
        })
    }
  })




