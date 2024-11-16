const { default: mongoose, Schema } = require("mongoose");
const { createHmac,randomBytes } = require('node:crypto');
const {createTokenForUser}=require("../serviecs/authenitication")


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
userSchema.static("matchedPasswordGenrateToken",async function(email,password){
    const user= await this.findOne({email})
   
    
    if(!user) throw new Error("User not found")

    var salt=user.salt
    const hashpassword=user.password
    const userProvidedHashed=createHmac("sha256",salt).update(password).digest("hex")
    if(hashpassword!==userProvidedHashed) throw new Error("Password not matched")
    const token=createTokenForUser(user)
return token
    
   
})

const User=mongoose.model("User",userSchema)

module.exports=User





