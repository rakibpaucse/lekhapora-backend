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


// const store = new MongoDBStore({
//     uri: MONGO_URI,
//     collection: 'users'
//   });

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




// mongoose.connect(MONGO_URI,{useNewUrlParser: true , useUnifiedTopology: true})
//             .then( () => {
//                 app.listen( process.env.PORT || PORT , () => {
//                     console.log(`Server is running on port ${PORT} and dataBase Connected`)
//                 })
//             })
//             .catch( (e) => {
//                 console.log(e)
//             })

// const connection = mysql.createConnection({
//     host: '103.163.246.66',
//     user: 'shaheena_lekhapora_user',
//     password: 'shaheena_lekhapora_user',
//     database: 'shaheena_lekhapora',
//     // port:"3000",
//     // multipleStatements: true
//   })
  

 
//   connection.query('SELECT * FROM courses', (err, rows, fields) => {
//     if (err) throw err
  
//     console.log('The solution is: ', rows)
//   })
  
//   connection.end()


// const dbConfig = {
//   host: '103.163.246.66',
//   user: 'shaheena_lekhapora_user',
//   password: 'shaheena_lekhapora_user',
//   database: 'shaheena_lekhapora',
//   port : 3306
// }
 
// dbConfig.connect()

// async function query(sql, params) {
//   const connection = await mysql.createConnection(dbConfig);
//   const [results, ] = await connection.execute(sql, params);
 
//   return results;
// }

// console.log(query('SELECT * FROM assignments'),[])