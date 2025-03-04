import mongoose from "mongoose";
import { EcomSubCategory } from "../models/EcomSubCategory";

const SubCategorySchema = new mongoose.Schema<EcomSubCategory>({
     category_id:{type:String , required:true},
     Sub_Category_name:{type:String , required:true},
     Sub_Category_description:{type:String , required:true},
     Sub_Category_logo:{type:String , required:true},
     isActive:{type:Boolean , default:true},

},

{
    timestamps:true
});

export const SubCategoryTable= mongoose.model<EcomSubCategory>("SubCategory", SubCategorySchema)