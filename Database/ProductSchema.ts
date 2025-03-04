import mongoose, { Mongoose } from "mongoose";
import { EcomProduct } from "../models/EcomProduct";

const ProductSchema = new mongoose.Schema<EcomProduct>({
    //  username:{type:String , required:true},
    //  email:{type:String , required:true , unique:true},
    //  password:{type:String , required:true},
    //  imageUrl: {type: String, required: true},
     sub_category_id:{type:String , required:true},
     Product_name:{type:String , required:true},
     Product_description:{type:String , required:true},
     Product_image:{type:String , required:true},
     Product_Images:{type:[String] , requires:true},
     Product_price:{type:String , required:true},
     Product_brand:{type:String , required:true},
    Product_quantity:{type:Number , required:true},
    isActive:{type:Boolean , required:true}
},
{timestamps:true})

export const ProductTable= mongoose.model<EcomProduct>("Product" , ProductSchema)