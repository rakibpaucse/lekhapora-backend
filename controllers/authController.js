const {dataBaseConnection} = require('../database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const dotenv = require("dotenv").config()

exports.signupGetController = (req , res , next ) => {}

exports.signupPostController = async(req , res , next ) => {}

exports.loginGetController = (req , res , next ) => {}


exports.loginPostController = async (req , res , next ) => {
        let { id_number , password } = req.body


        if (id_number && password) {
            dataBaseConnection.query('SELECT * FROM users WHERE id_number = ?', [id_number], 
              (error, results, fields)=> {

                if(!results.length) return res.status(403).send({msg : 'Invalid User Name'})

                bcrypt.compare(password, results[0].password)
                    .then(result =>{
                        if(result){
                            let user = {
                                id : results[0].id,
                                profile_id : results[0].profile_id,
                                profile_type : results[0].profile_type,
                                id_number : results[0].id_number
                            }
                            let token = jwt.sign(user , process.env.ACCESS_TOKEN_SECRET)
                            let data = { token , user }
                            
                            return res.status(200).send({...data})
                        }else{
                           return res.status(403).send({msg : 'Username/Password Not Matched!'})
                        }
                    })
            }); 
          } else {
            res.send('Please enter Username and Password!');
            res.end();
          }

          

        // try{
        //     let user = await User.findOne({studentid})
        //     console.log(studentid , password)
        //     if(!user){
        //       res.status(400).send({msg : 'Invalid Username or Password'})
        //     }

        //     let pass = ( password === user.password) ? true : false
        //     if(!pass){
        //       return res.status(400).send({msg: 'Invalid Username or Password'})
        //     }



        //     // req.session.islogin = true
        //     // req.session.user = user
        //     // req.session.save((err) => {
        //     //     if(err){
        //     //         console.log(err);
        //     //         return next(err)
        //     //     }
        
        //     //    return res.redirect('')
        //     // })


        //     const token = user.generateAuthToken()
        //     res.send(token)
        // }
        // catch(e){
        //     console.log(e);
        //     next(e)
        // }
}

exports.logoutController = (req , res , next ) => {
    
    req.session.destroy((err) => {
        if(err){
            console.log(err);
            return next(err)
        }

       return res.redirect('')
    })
}