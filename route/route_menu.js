import express from "express"
import { getMenus, getSingleMenu, postMenu } from "../controller/controller_menu.js"

const router = express.Router()

router.post("/post", postMenu)

router.get("/get_all", getMenus)

router.get("/get/:id",getSingleMenu)

export default router