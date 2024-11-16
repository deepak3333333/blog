const { Router } = require("express");
const User = require("../models/user");


const router=Router()



router.get("/signup",(req,res)=>{
    return res.render("singup")
})
router.get("/signin",(req,res)=>{
    return res.render("signin")
})
router.post("/signin",async(req,res)=>{

    const {email,password}=req.body
    try{
        const token= await User.matchedPasswordGenrateToken(email,password)
        return res.cookie("usertoken",token).redirect("/")
    }
    catch(error){
        return res.render('signin',{error:"user id and password do not matchen"});


    }
  
   

   
    
})

router.post("/signup",async(req,res)=>{
    
    const {fullName,email,password}=req.body
   await User.create({fullName,email,password})
   return res.redirect("/")

})

module.exports=router