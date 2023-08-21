import express from "express"
import { postMenu } from "../controller/controller_menu.js"

const router = express.Router()

router.post("/post", postMenu)

export default router