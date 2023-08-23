import express from "express"
import {deleteUser, login, register,verify} from "../controller/controller_user.js"

const router = express.Router()
// register
router.post("/register", register)

// login
router.post("/login",login)
router.delete("/delete/:id",verify,deleteUser)


export default router