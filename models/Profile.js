const {Schema , model} = require('mongoose')
const User = require('./User')

const ProfileSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref:User,
        required: true
    },
    name : {
        type: String,
        trim: true,
        required: true
    },
    profilePic: String,
    courses : [
        {
            // type 
        }
    ],
    noticeBoard : [
        
    ]

})