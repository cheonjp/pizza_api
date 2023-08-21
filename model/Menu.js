import mongoose, { Schema } from "mongoose"

const Menu = new Schema({
    day:{
        type:String
    },
    cat:{
        type:String,
        required:true,
        default:""
    },
    price:{
        type:mongoose.Schema.Types.Mixed,
        required:true,
        default:""
    },
    salePrice:{
        type:String,
    },
    desc:{
        type:String,
    },
    name:{
        type:String,
        required:true
    },
    size:{
        type:mongoose.Schema.Types.Mixed,
    },
    img:{
        type:String,
        required:true
    }
})
export default mongoose.model("menu", Menu)