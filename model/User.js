import mongoose, { Schema } from "mongoose"

const User = new Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    phone:{
        type:Number,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    img:{
        type:String
    }
    
},{
    timestamps:true
})

export default mongoose.model("user",User)