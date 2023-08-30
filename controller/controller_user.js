import { imageName } from "../index.js"
import createError from "../middleware/createError.js"
import uploadImage from "../middleware/multer.js"
import uploads from "../middleware/multer.js"
import User from "../model/User.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


// register
export const register = async (req, res,next) => {
    try {
        const user = await new User(req.body)
        const existedEmail = await User.findOne({email:req.body.email})
        if(existedEmail){
                return res.status(401).json("This email is already registered. Please use other email.")
            }
            console.log(imageName)
            const password = user.password
            const salt = 10
            const hashedPassword = await bcrypt.hashSync(password,salt)
            user.password = hashedPassword
            
            if(imageName && req.body.img){
                user.img = imageName
            }
             
            await user.save()
            res.status(201).json("Welcome to Monster")
        } catch (error) {
            res.status(500).json(error)
        }
}


export const verify = (req,res,next)=>{
    const authHeader = req.headers.authorization
    if(authHeader){
        const token = authHeader
        jwt.verify(token,process.env.JWT_SECRET_KEY, (err,user)=>{
            if(err){
                return res.status(403).json("Token is not valid")
            }
            req.user = user
            next()
        })
    }else{
        res.status(401).json("You are not authenticated")
    }
}

export const login = async(req,res,next)=>{
    try {
        const user = await User.findOne({email:req.body.email})
        if(!user){
            return res.status(404).json("User not found")
        }
        const match = await bcrypt.compareSync(req.body.password, user.password)
        if(!match){
            return res.status(400).json("Password is not matched")
        }
        if(user){
            const email = user._doc.email
            const userId = user._doc._id.toString()
            const token = jwt.sign({email:email, userId:userId},process.env.JWT_SECRET_KEY,{expiresIn:"30s"})
            user._doc.accessToken = token
            const {password,...others}=user._doc
            res.status(200).json(others)
        }
    } catch (error) {
        res.status(500).json(error)
    }

    
}

export const deleteUser = async(req,res)=>{
    const userId = req.user.userId
    try {
        const targetUser = await User.findByIdAndDelete(userId)
        if(!targetUser){
            console.log(req.headers.authorization)
            return res.status(404).json("User can not be found")
        }
        res.status(200).json("user is deleted")
    } catch (error) {
        res.status(500).json(error)
    }
}









