import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import dotenv from "dotenv"
import userRoute from "./route/route_user.js"
import menuRoute from "./route/route_menu.js"

import cookieParser from "cookie-parser"
import jwt from "jsonwebtoken"

const app = express()
app.use(cors())
app.use(express.json())
app.use(cookieParser())
dotenv.config()

try {
    await mongoose.connect(process.env.DB_URL)
    console.log('DB is working well')
    
} catch (error) {
    console.log(error)
}


app.use("/api/user", userRoute)
app.use("/api/menu", menuRoute)

app.listen(process.env.PORT, ()=>{
    console.log('App is listening on port: '+ process.env.PORT)
})


