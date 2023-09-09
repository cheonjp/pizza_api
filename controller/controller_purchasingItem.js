import PurchasingItem from "../model/PurchasingItem.js";

// post single item to cart or checkout page
export const singleItem = async (req, res) => {
    try {
        const item = await new PurchasingItem({
            img: req.body.img,
            name: req.body.name,
            size: req.body.size,
            price: req.body.price,
            quantity: req.body.quantity,
            totalPrice: req.body.totalPrice,
            userId: req.body.userId,
        })
        await item.save()
        return res.status(200).json(item)
    } catch (error) {
        return res.status(500).json(error)
    }
}

// get items to checkout
export const getUserItems  = async (req,res)=>{
    const userId = req.params.id
    try {
        const items = await PurchasingItem.find({userId:userId})
        res.status(201).json(items)
        
    } catch (error) {
        return res.status(500).json(error)
    }
}

