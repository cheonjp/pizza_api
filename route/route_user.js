import express from "express"
import {deleteUser,getUser,login,register,updateUser,verify} from "../controller/controller_user.js"

const router = express.Router()

// register
router.post("/register",register)


// login
router.post("/login",login)

// delete user
router.delete("/delete/:id",verify,deleteUser)

// get a user
router.get("/get/:id",getUser)

// update a user
router.put("/update/:id",verify, updateUser)

export default router