const { default: mongoose, Schema } = require("mongoose");
const { createHmac,randomBytes } = require('node:crypto');

const userSchema=new Schema({
    fullName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    salt:{
        type:String,
    },
    profileImageUrl:{
        type:String,
        default:"./images/image.png"
    },
    role:{
        type:String,
        enum:["user","admin"],
        default:"user"
    }




},{timestamp:true})
userSchema.pre("save",function(next){
    //current user
    const user=this
    const salt=randomBytes(16).toString("hex")
    const hashPassword=createHmac("sha256",salt).update(user.password).digest("hex")
    user.salt=salt
    user.password=hashPassword
next()
})

const User=mongoose.model("User",userSchema)

module.exports=User





