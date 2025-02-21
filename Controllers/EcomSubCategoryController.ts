import { EcomSubCategory } from "../models/EcomSubCategory";
import { SubCategoryTable } from "../Database/SubCategorySchema";
import mongoose from "mongoose";
import {Request , Response} from 'express'


// "category_id" : "1",
// "name" : "het",
// "description" : "hirpara", 
// "logo" : "image", 
// "isActive" : true

/*
@usage:crate a insert EcomSubCategory
@method:POST
@params:no-params
@url:http://127.0.0.1:9988/subcategory
*/
export const SubCreateEcom = async(request:Request , response:Response)=>{
   let {category_id , name , description , logo , isActive}=request.body;
   let theSubCategory:EcomSubCategory | null | undefined = await new SubCategoryTable({
    category_id:category_id,
    name:name,
    description:description,
    logo:logo,
    isActive:isActive
   }).save();
   if(theSubCategory){
    return response.status(200).json({
        data:theSubCategory,
        msg:"SubCategory Inserted"
    })
   }
}


/*
@usage:crate a create All EcomSubCategory
@method:GET
@params:no-params
@url:http://127.0.0.1:9988/subcategory
*/

export const ReadAllEcomSubCategory = async(request:Request , response:Response)=>{
    console.log("RadAllSubCategory");
    const SubCategoryData = await SubCategoryTable.find();
    if(SubCategoryData)
    {
        return response.json({
            data:SubCategoryData
        })
    }

}

/*
@usage:crate a create All EcomSubCategory
@method:GET
@params:SubCategoryId
@url:http://127.0.0.1:9988/subcategory/SubCategoryId
@url:http://127.0.0.1:9988/subcategory/http://127.0.0.1:9988/subcategory/67b6a1b533acf3fa435acabc
*/

export const ReadEcomSubCategory = async(request:Request , response:Response)=>{
    let {SubCategoryId}=request.params;
    const mongoSubCategoryId = new mongoose.Types.ObjectId(SubCategoryId);
    let theSubCategory:EcomSubCategory| undefined | null = await SubCategoryTable.findById(mongoSubCategoryId)
    return response.status(200).json(theSubCategory)
}

/*
@usage:updated a EcomSubCategory
@method:PUT
@params:SubCategoryId
@url:http://127.0.0.1:9988/subcategory/SubCategoryId
@url:http://127.0.0.1:9988/subcategory/http://127.0.0.1:9988/subcategory/67b6a1b533acf3fa435acabc
*/

export const putEcomSubCategory = async(request:Request , response:Response)=>{
  let {SubCategoryId}=request.params;
  const SubCategoryData = request.body;
  const mongoEcomSubCategoryId = new mongoose.Types.ObjectId(SubCategoryId)
  let UpdatedSubCategory = await SubCategoryTable.findByIdAndUpdate(mongoEcomSubCategoryId, SubCategoryData)
  if(UpdatedSubCategory)
  {
    return response.status(200).json({
        data:SubCategoryData
    })
  }
}

/*
@usage:delete a EcomSubCategory
@method:delete
@params:SubCategoryId
@url:http://127.0.0.1:9988/subcategory/SubCategoryId
@url:http://127.0.0.1:9988/subcategory/http://127.0.0.1:9988/subcategory/67b6a1b533acf3fa435acabc
*/


export const DeleteEcomSubCategory = async(request:Request , response:Response)=>{
  const {SubCategoryId}=request.params;
  const DeleteEcomSubCategory = await SubCategoryTable.findByIdAndDelete(SubCategoryId)
  if(DeleteEcomSubCategory)
  {
    return response.status(200).json({
        message:"EcomSubCategory Deleted Successfully",
        data:DeleteEcomSubCategory
    })
  }
}