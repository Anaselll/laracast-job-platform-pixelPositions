import Category from "../models/category.model.js"

export const showCategories=async(req,res)=>{
    const categories=await Category.find({})
    console.log(categories)
    res.send(categories)
}
export const showTags=async(req,res)=>{
    const {category}=req.params
    const tags=await Category.findOne({title:category})
    res.send(tags)
}