const {Schema , model} = require('mongoose')
const jwt = require('jsonwebtoken')

const userSchema = new Schema({
    studentid : {
        type : String ,
        trim : true ,
        unique: true,
        required: true,
    },
    password:{
        type:String,
        required: true,
    }
 })

 userSchema.methods.generateAuthToken = function(){
    return jwt.sign({id: this.id}, 'Lekhapora')
 }
const User = model('User' , userSchema)

 module.exports = User;