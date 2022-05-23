const jwt = require('jsonwebtoken')
const dotenv = require("dotenv").config()

exports.isUnauth = (req , res , next) => {

    let bearerToken = req?.headers['authorization']?.split(' ')[1]
    if(bearerToken === null) return res.status(401).send({msg : 'Not Valid User!'})

    jwt.verify(bearerToken , process.env.ACCESS_TOKEN_SECRET , (err , user) => {
        if(!err){
            req.admin = true
            next()
        }else{
            return res.status(403).send({msg : 'User Unauthorised'})
        } 
            

    })

}