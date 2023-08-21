import createError from "../middleware/createError.js"
import User from "../model/User.js"
import bcrypt from "bcrypt"


// register
export const register = async (req, res, next) => {
    try {
        const user = await new User(req.body)
        const existedEmail = await User.findOne({email:req.body.email})
        if(existedEmail){
           return res.status(401).json("This email is already registered. Please use other email.")
        }
        const password = user.password
        const salt = 10
        const hashedPassword = bcrypt.hashSync(password,salt)
        user.password = hashedPassword

        await user.save()
        res.status(201).json("You are registered")
    } catch (error) {
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
        const {password,...others}=user._doc
        res.status(200).json(others)
    } catch (error) {
        res.status(500).json(error)
    }
}

