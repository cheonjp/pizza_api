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

// login
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
            const token = jwt.sign({email:email, userId:userId},process.env.JWT_SECRET_KEY,{expiresIn:"1 days"})
            user._doc.accessToken = token
            const {password,...others}=user._doc
            req.headers.authorization = token
            res.status(200).json(others)
        }
    } catch (error) {
        res.status(500).json(error)
    }

    
}

// get a user
export const getUser = async(req,res)=>{
    try {
        const userId = req.params.id
        const user = await User.findById(userId)
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json(error)
    }
    
}

// delete user
export const deleteUser = async(req,res)=>{
    try {
        const targetUser = await User.findByIdAndDelete(userId)
        if(!targetUser){
            return res.status(404).json("User can not be found")
        }
        res.status(200).json("user is deleted")
    } catch (error) {
        res.status(500).json(error)
    }
}

// update user
export const updateUser = async (req,res)=>{
    try {
        const {id} = req.params
        const hashedPassword = bcrypt.hashSync(req.body.password,10)
        console.log(req.body.password)
        const user = await User.findByIdAndUpdate(id, ({
            username:req.body.username,
            email:req.body.email,
            phone:req.body.phone,
            city:req.body.city,
            postCode:req.body.postCode,
            password:req.body.password,
            img:req.body.img,
        }),
        {new:true})

        const {password,...other}=user._doc
        return res.status(200).json(other)
        
    } catch (error) {
        res.status(500).json(error)
    }
}
// update user with password
export const updateUserWithPassword = async (req,res)=>{
    try {
        const {id} = req.params
        const hashedPassword = bcrypt.hashSync(req.body.password,10)
        console.log(req.body.password)
        const user = await User.findByIdAndUpdate(id, ({
            username:req.body.username,
            email:req.body.email,
            phone:req.body.phone,
            city:req.body.city,
            postCode:req.body.postCode,
            password:hashedPassword,
            img:req.body.img,
        }),
        {new:true})

        const {password,...other}=user._doc
        return res.status(200).json(other)
        
    } catch (error) {
        res.status(500).json(error)
    }
}

// confirmPassword
export const confirmPassword = async(req,res)=>{
    try {
        const {id}=req.params
        const user = await User.findById(id)
        const  userPassword =await bcrypt.compareSync(req.body.password, user.password)
        if(!userPassword){
            return res.status(401).json("password is not matched")
        }else if(userPassword){
            res.status(200).json("Right")
        }
    } catch (error) {
        return console.log(error)
    }
}













