import Menu from "../model/Menu.js";

export const postMenu = async (req,res)=>{
    try {
        const menu = new Menu(req.body)
        await menu.save()
        res.status(200).json('menu is stored on database')
    } catch (error) {
        res.status(500).json(error)
    }
}
// get all menus
export const getMenus = async (req,res)=>{
    try {
        const menus = await Menu.find({})
        res.status(200).json(menus)
    } catch (error) {
        res.status(500).json(error)
    }
}
// get single menu

export const getSingleMenu = async(req,res)=>{
    try {
        const {id}=req.params
        const item = await Menu.findById(id)
        res.status(200).json(item)
    } catch (error) {
        res.status(500).json(error)
    }
}