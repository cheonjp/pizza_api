import mongoose, { Schema } from "mongoose"

const Profile = new Schema({
    img:{
        type:String
    }
})

export default mongoose.model("profile",Profile)