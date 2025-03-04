import { EcomSubCategory } from "../models/EcomSubCategory";
import { SubCategoryTable } from "../Database/SubCategorySchema";
import mongoose from "mongoose";
import { Request, Response } from 'express'



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
export const SubCreateEcom = async (request: Request, response: Response) => {
  let { category_id, Sub_Category_name, Sub_Category_description, Sub_Category_logo, isActive } = request.body;
  let theSubCategory: EcomSubCategory | null | undefined = await new SubCategoryTable({
    category_id: category_id,
    Sub_Category_name: Sub_Category_name,
    Sub_Category_description: Sub_Category_description,
    Sub_Category_logo: Sub_Category_logo,
    isActive: isActive
  }).save();
  if (theSubCategory) {
    return response.status(200).json({
      data: theSubCategory,
      msg: "SubCategory Inserted"
    })
  }
  else {
    return response.status(404).json("not created yet!")
  }

}


/*
@usage:crate a create All EcomSubCategory
@method:GET
@params:no-params
@url:http://127.0.0.1:9988/subcategory
*/

export const getallSubCategory = async (request: Request, response: Response) => {
  try {
    const SubCategoryData = await SubCategoryTable.find();
    console.log("RadAllSubCategory");
    if (SubCategoryData) {
      return response.json({
        data: SubCategoryData
      })

    }
    else{
      return response.status(404).json({mag:"not fount product"})
     }

  }
  catch (error) {
    return response.status(500).json({
      msg: "data not found"
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

export const getSubCategory = async (request: Request, response: Response) => {
  let { SubCategoryId } = request.params;
  const mongoSubCategoryId = new mongoose.Types.ObjectId(SubCategoryId);
  let theSubCategory: EcomSubCategory | undefined | null = await SubCategoryTable.findById(mongoSubCategoryId)
  if (theSubCategory) {

    return response.status(200).json(theSubCategory)
  }
  else{
    return response.status(500).json({
      data:null,
      msg:"no subcategory found"
    })
  }
}

/*
@usage:updated a EcomSubCategory
@method:PUT
@params:SubCategoryId
@url:http://127.0.0.1:9988/subcategory/SubCategoryId
@url:http://127.0.0.1:9988/subcategory/http://127.0.0.1:9988/subcategory/67b6a1b533acf3fa435acabc
*/

export const putEcomSubCategory = async (request: Request, response: Response) => {
  let { SubCategoryId } = request.params;
  const SubCategoryData = request.body;
  // const {category_id, Sub_Category_name, Sub_Category_description, Sub_Category_logo, isActive}=request.body;
  const mongoEcomSubCategoryId = new mongoose.Types.ObjectId(SubCategoryId)
  let UpdatedSubCategory = await SubCategoryTable.findByIdAndUpdate(mongoEcomSubCategoryId, SubCategoryData)
  if (UpdatedSubCategory) {
    console.log("put");

    return response.status(200).json({
      msg: "updated Subcategorydata",
      data: SubCategoryData
    })
  }
}


// export const putEcomSubCategory = async (request: Request, response: Response) => {
//   let { SubCategoryId} = request.params;
//   let { category_id, Sub_Category_name, Sub_Category_description, Sub_Category_logo, isActive } = request.body;
//   // const {category_id, Sub_Category_name, Sub_Category_description, Sub_Category_logo, isActive}=request.body;
//   const mongoEcomSubCategoryId = new mongoose.Types.ObjectId(SubCategoryId)
//   let UpdatedSubCategory = await SubCategoryTable.findByIdAndUpdate(mongoEcomSubCategoryId,{

//     category_id:category_id,
//     Sub_Category_name: Sub_Category_name,
//     Sub_Category_description: Sub_Category_description,
//     Sub_Category_logo:Sub_Category_logo,
//     isActive:isActive
//   })
//   console.log("put");
//   if (UpdatedSubCategory) {
//     return response.status(200).json({
//       msg:"updated Subcategorydata",
//       data:UpdatedSubCategory
//     })
//   }
// }

/*
@usage:delete a EcomSubCategory
@method:delete
@params:SubCategoryId
@url:http://127.0.0.1:9988/subcategory/deletesubcategory/:SubCategoryId

*/


export const DeleteEcomSubCategory = async (request: Request, response: Response) => {
  const { SubCategoryId } = request.params;
  try{
    const mongoProductid = new mongoose.Types.ObjectId(SubCategoryId)
    const DeleteEcomSubCategory = await SubCategoryTable.findByIdAndUpdate(mongoProductid, { isActive: false }, { new: true })
    if (DeleteEcomSubCategory) {
      return response.status(200).json({
        message: "EcomSubCategory Deleted Successfully",
        data: DeleteEcomSubCategory
      })
      
    }
    else{
      return response.status(400).json({
        msg:"subcategory not found"
      })
    }
  }
  catch(error){
    return response.status(500).json({
      msg:'something went wrong'
    })
  }
}