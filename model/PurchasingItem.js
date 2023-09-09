import mongoose, { Schema } from "mongoose"

const PurchasingItem = new Schema({
    img:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true
    },
    size:{
        type:Number,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    totalPrice:{
        type:Number,
        required:true
    },
    userId:{
        type:String
    }
},{
    timestamps:true
})

export default mongoose.model("purchasingItem",PurchasingItem)