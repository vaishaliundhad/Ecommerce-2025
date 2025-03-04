import { EcomCategory } from "../models/EcomCategory";
import CategoryTable  from "../Database/CategorySchema";
import mongoose from "mongoose";
import {Request , response, Response} from 'express'
;

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
   @usage:get All category
   @method: GET
   @params:name
   @url: http://localhost:9988/category
*/

export const getallcategory = async(request:Request , response:Response)=>{
  try{
    
  const theCategory= await CategoryTable.find();
  if(theCategory)
  {
    return response.json({
        data:theCategory
    })
  }

  }
  catch(error){
    return response.status(500).json({
      msg:"not found any category"
    })
  }

}


/*
   @usage:read a  category
   @method: GET
   @params:CategoryId
   @url: http://localhost:9988/category/67b60929aff0c5b8b36bb038
*/


export const getcategory = async(request:Request , response:Response)=>{
  let {CategoryId}=request.params;
  const mongoCategoryId = new mongoose.Types.ObjectId(CategoryId);
  let  theCategory:EcomCategory | undefined |null = await CategoryTable.findById(mongoCategoryId)
  if(theCategory){

    return response.status(200).json(theCategory);
  }
  else{
   return response.status(400).json({
    msg:"no categpry found"
   })
  }
}

/*
   @usage:updated a Category
   @method: PUT
   @params:CategoryId
   @url: http://localhost:9988/category/67b60929aff0c5b8b36bb038
*/


// export const PutEcomCategory = async(request:Request , response:Response)=>{
//     let {CategoryId}=request.params;
//     const CategoryData = request.body;
//     const mongoCategoryId= new mongoose.Types.ObjectId(CategoryId)
//     let UpadetedCategory = await CategoryTable.findByIdAndUpdate( mongoCategoryId ,CategoryData )
//     if(UpadetedCategory){
//         return response.status(200).json({
//            data:CategoryData
//         })
//     }
// }

export const PutEcomCategory = async(request:Request , response:Response)=>{
  let {CategoryId}=request.params;
  let {category_name , category_description , category_logo , isActive}=request.body;
  try{

    const mongoCategoryId= new mongoose.Types.ObjectId(CategoryId)
    let UpadetedCategory = await CategoryTable.findByIdAndUpdate( mongoCategoryId ,{
      category_name :category_name ,
      category_description :category_description ,
      category_logo : category_logo ,
      isActive: isActive
    } )
    if(UpadetedCategory){
        return response.status(200).json({
           data:UpadetedCategory
        })
    }
}
catch(err){
 return response.status(500).json({
  msg:"something went wrong"
 })
}
  }


/*
   @usage:delete a Category
   @method: DELETE
   @params:CategoryId
   @url: http://localhost:9988/category/deletecategoty/67b60929aff0c5b8b36bb038
*/

export const deleteCategory = async(request:Request , response:Response)=>{
  const {CategoryId} = request.params;
  try{

    const mongoCategoryId= new mongoose.Types.ObjectId(CategoryId)
    const DeleteCategory= await CategoryTable.findByIdAndUpdate(mongoCategoryId , {isActive:false}, {new:true});
    if(DeleteCategory)
    {
      return response.status(200).json({
          message:"category Deleted  Successfully",
          data:DeleteCategory
  
      })
    }
  }
  catch(err){
    return response.status(500).json({
      msg:"something went wrong"
    })
  }
}


