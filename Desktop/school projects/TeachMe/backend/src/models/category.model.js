import mongoose from "mongoose";
const categorySchema=mongoose.Schema({
 title:{
    type:String,
    required:true

 }   
 ,tags:[
    {
        type:String

    }
 ]
})
const Category=mongoose.model("Category",categorySchema);
export default Category;