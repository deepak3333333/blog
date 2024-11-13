const express=require("express")
const app=express()

const userRouter=require("./routers/user")
const { default: mongoose } = require("mongoose")
app.use(express.urlencoded({extended:false}))
mongoose.connect("mongodb://localhost:27017/blog")
.then(()=>{
    console.log("connected to db")
})
.catch((err)=>{
    console.log(err)
})


app.set("view engine","ejs")

app.use("/user",userRouter)
app.get("/",(req,res)=>{
    res.render("index")
})

app.listen(230,()=>{
    console.log("server is running on port 23")
})