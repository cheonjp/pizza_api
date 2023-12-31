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
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    img:{
        type:String
    },
    city:{
        type:String
    },
    postCode:{
        type:String
    },
    
},{
    timestamps:true
})

export default mongoose.model("user",User)