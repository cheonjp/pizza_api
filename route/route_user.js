import express from "express"
import {confirmPassword, deleteUser,getUser,login,register,updateUser,updateUserWithPassword,verify} from "../controller/controller_user.js"

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

// update a user with password
router.put("/update/:id/password",verify, updateUserWithPassword)

// confirm password
router.post("/password/:id",confirmPassword)

export default router