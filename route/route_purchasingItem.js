import express from "express"
import { deleteAllItems, deleteItem, getUserItems, singleItem } from "../controller/controller_purchasingItem.js"

const router = express.Router()
// post single item for cart
router.post("/cart/:id",singleItem)

// find all items in the cart
router.get("/cart/all-items/:id",getUserItems)

// delete single item
router.delete("/cart/delete",deleteItem)

// delete all items
router.delete("/cart/delete/all-items",deleteAllItems)

export default router