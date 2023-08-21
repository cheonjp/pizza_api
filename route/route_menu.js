import express from "express"
import { getMenus, postMenu } from "../controller/controller_menu.js"

const router = express.Router()

router.post("/post", postMenu)
router.get("/get_all", getMenus)

export default router