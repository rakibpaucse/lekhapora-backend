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











// const mysql = require('mysql2/promise');

// const dbConfig = {
//   host: 'freedb.tech',
//   user: 'freedbtech_Wahid',
//   password: 'HpS4H@T7Lym@k87',
//   database: 'freedbtech_lekhapora',
// }

// async function query(sql, params) {
//   const connection = await mysql.createConnection(dbConfig);
//   const [results, ] = await connection.execute(sql, params);

//   return results;
// }

// module.exports = {
//   query
// }


// connection.connect((err) => {
//   if(err){
//     console.log(err);
//   }else{
//     console.log('Database connected');
//   }
// })


// connection.query('SELECT 1 + 1 AS solution', (err, rows, fields) => {
//   if (err) throw err

//   console.log('The solution is: ', rows[0].solution)
// })

// connection.end()
