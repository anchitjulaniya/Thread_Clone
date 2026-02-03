const mongoose = require('mongoose')

const postschema = new mongoose.Schema({
    postedBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user',
        required : true
    },
    text : {
        type : String,
        maxLength : 500
    },
    image : {
        type :String
    },
    likes : {
        type : [mongoose.Schema.Types.ObjectId],
        ref : 'user',
        default : []
    },
    replies : [{
        userId : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'user',
            required : true
        },
        text : {
            type :String,
            required : true
        },
        userProfilePic : {
            type : String
        },
        username :{ 
            type : String
        }
    }],
    isDeleted: {
        type: Boolean,
        required:true,
        default:false
    }
})

const PostModel = mongoose.model("post", postschema)

module.exports = PostModel