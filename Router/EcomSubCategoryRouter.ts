import {Request ,  Response , Router} from 'express'
import * as SubCategoryController from '../Controllers/SubCategoryController'



const EcomSubCategoryRouter:Router= Router();

/*
@usage:crate a insert EcomSubCategory
@method:POST
@params:no-params
@url:http://127.0.0.1:9988/category
*/
EcomSubCategoryRouter.post("/" , async(request:Request , response:Response)=>{
    console.log("post");
    await SubCategoryController.SubCreateEcom(request , response);
    
})

/*
@usage:crate a create All EcomSubCategory
@method:GET
@params:no-params
@url:http://127.0.0.1:9988/category
*/

EcomSubCategoryRouter.get("/" , async(request:Request , response:Response)=>{
  await SubCategoryController.getallSubCategory(request, response)
})

/*
@usage:crate a create All EcomSubCategory
@method:GET
@params:SubCategoryId
@url:http://127.0.0.1:9988/subcategory/SubCategoryId
@url:http://127.0.0.1:9988/subcategory/http://127.0.0.1:9988/subcategory/67b6a1b533acf3fa435acabc
*/

EcomSubCategoryRouter.get("/:SubCategoryId" , async(request:Request , response:Response)=>{
  await SubCategoryController.getSubCategory(request, response)
})


/*
@usage:updated a EcomSubCategory
@method:PUT
@params:SubCategoryId
@url:http://127.0.0.1:9988/subcategory/SubCategoryId
@url:http://127.0.0.1:9988/subcategory/67b6a1b533acf3fa435acabc
*/

EcomSubCategoryRouter.put("/:SubCategoryId",async(request:Request , response:Response)=>{
 await SubCategoryController.putEcomSubCategory(request , response)
} )


/*
@usage:delete a EcomSubCategory
@method:delete
@params:SubCategoryId
@url:http://127.0.0.1:9988/subcategory/deletesubcategory/:SubCategoryId
@url:http://127.0.0.1:9988/subcategory/deletesubcategory/67b6a1b533acf3fa435acabc
*/

EcomSubCategoryRouter.put("/deletesubcategory/:SubCategoryId",async(request:Request , response:Response)=>{
  await SubCategoryController.DeleteEcomSubCategory(request , response)
 } )
 

export default EcomSubCategoryRouter