import { EcomCategory } from "../models/EcomCategory";
import CategoryTable  from "../Database/CategorySchema";
import mongoose from "mongoose";
import {Request , response, Response} from 'express'
import { request } from "node:http";

// "category_name":bansi,
// "category_description":undhad,
// "category_logo":Image,
// "isActive":true

/*
   @usage:create a insert category
   @method: POST
   @params:name
   @url: http://localhost:9988/category
*/

export const CreateEcom =async(request:Request , response:Response)=>{
    let {category_name , category_description , category_logo , isActive}=request.body;
   let theCategory:EcomCategory | null | undefined= await new CategoryTable({
     category_name:category_name,
     category_description:category_description,
     category_logo:category_logo,
     isActive:isActive
   }).save();
   if(theCategory){
    return response.status(200).json({
        data:theCategory,
        msg:"category inserted"
    })
   }
}


/*
   @usage:read a All category
   @method: GET
   @params:name
   @url: http://localhost:9988/category
*/

export const ReadAllEcom = async(request:Request , response:Response)=>{
    console.log("readcategory");
    
  const categorydata= await CategoryTable.find();
  if(categorydata)
  {
    return response.json({
        data:categorydata
    })
  }

}


/*
   @usage:read a  category
   @method: GET
   @params:CategoryId
   @url: http://localhost:9988/category/67b60929aff0c5b8b36bb038
*/


export const ReadEcom = async(request:Request , response:Response)=>{
  let {CategoryId}=request.params;
  const mongoCategoryId = new mongoose.Types.ObjectId(CategoryId);
  let  theCategory:EcomCategory | undefined |null = await CategoryTable.findById(mongoCategoryId)
  return response.status(200).json(theCategory);
}

/*
   @usage:updated a Category
   @method: PUT
   @params:CategoryId
   @url: http://localhost:9988/category/67b60929aff0c5b8b36bb038
*/


export const PutEcomCategory = async(request:Request , response:Response)=>{
    let {CategoryId}=request.params;
    const CategoryData = request.body;
    const mongoCategoryId= new mongoose.Types.ObjectId(CategoryId)
    let UpadetedCategory = await CategoryTable.findByIdAndUpdate( mongoCategoryId ,CategoryData )
    if(UpadetedCategory){
        return response.status(200).json({
           data:CategoryData
        })
    }
}


/*
   @usage:delete a Category
   @method: DELETE
   @params:CategoryId
   @url: http://localhost:9988/category/67b60929aff0c5b8b36bb038
*/

export const deleteCategory = async(request:Request , response:Response)=>{
  const {CategoryId} = request.params;
  const DeleteCategory= await CategoryTable.findByIdAndDelete(CategoryId);
  if(DeleteCategory)
  {
    return response.status(200).json({
        message:"user Deleted  Successfully",
        data:DeleteCategory

    })
  }
}


