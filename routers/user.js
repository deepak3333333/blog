const { Router } = require("express");
const User = require("../models/user");


const router=Router()



router.get("/signup",(req,res)=>{
    return res.render("singup")
})

router.post("/signup",async(req,res)=>{
    
    const {fullName,email,password}=req.body
   await User.create({fullName,email,password})
   return res.redirect("/")

})

module.exports=router