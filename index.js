import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import dotenv from "dotenv"
import userRoute from "./route/route_user.js"
import menuRoute from "./route/route_menu.js"
import checkoutRoute from "./route/route_purchasingItem.js"

import cookieParser from "cookie-parser"
import jwt from "jsonwebtoken"
import uploads from "./middleware/multer.js"
import { register } from "./controller/controller_user.js"

const app = express()
app.use(cors())
app.use(express.json())
app.use(cookieParser())
dotenv.config()
app.use(express.static('public'))

try {
    await mongoose.connect(process.env.DB_URL)
    console.log('DB is working well')
    
} catch (error) {
    console.log(error)
}


app.use("/api/user", userRoute)
app.use("/api/menu", menuRoute)
app.use("/api/checkout", checkoutRoute)

export let imageName
app.post("/api/image/upload",uploads.single("profile"),(req,res,next)=>{
    try {
        if(req.file){
             imageName = req.file.filename
          res.status(200).json(imageName)
        }else if(!req.file){
          res.status(400).json("profile image is not found")
        }  
        
    } catch (error) {
        res.status(500).json(error)
    }
})

app.listen(process.env.PORT, ()=>{
    console.log('App is listening on port: '+ process.env.PORT)
})


