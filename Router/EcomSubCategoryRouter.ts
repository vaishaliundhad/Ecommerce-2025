import {Request ,  Response , Router} from 'express'
import * as EcomSubCategoryController from '../Controllers/EcomSubCategoryController'



const EcomSubCategoryRouter:Router= Router();

/*
@usage:crate a insert EcomSubCategory
@method:POST
@params:no-params
@url:http://127.0.0.1:9988/category
*/
EcomSubCategoryRouter.post("/" , async(request:Request , response:Response)=>{
    console.log("post");
    await EcomSubCategoryController.SubCreateEcom(request , response);
    
})

/*
@usage:crate a create All EcomSubCategory
@method:GET
@params:no-params
@url:http://127.0.0.1:9988/category
*/

EcomSubCategoryRouter.get("/" , async(request:Request , response:Response)=>{
  await EcomSubCategoryController.ReadAllEcomSubCategory(request, response)
})

/*
@usage:crate a create All EcomSubCategory
@method:GET
@params:SubCategoryId
@url:http://127.0.0.1:9988/subcategory/SubCategoryId
@url:http://127.0.0.1:9988/subcategory/http://127.0.0.1:9988/subcategory/67b6a1b533acf3fa435acabc
*/

EcomSubCategoryRouter.get("/:SubCategoryId" , async(request:Request , response:Response)=>{
  await EcomSubCategoryController.ReadEcomSubCategory(request, response)
})


/*
@usage:updated a EcomSubCategory
@method:PUT
@params:SubCategoryId
@url:http://127.0.0.1:9988/subcategory/SubCategoryId
@url:http://127.0.0.1:9988/subcategory/http://127.0.0.1:9988/subcategory/67b6a1b533acf3fa435acabc
*/

EcomSubCategoryRouter.put("/:SubCategoryId",async(request:Request , response:Response)=>{
 await EcomSubCategoryController.putEcomSubCategory(request , response)
} )


/*
@usage:delete a EcomSubCategory
@method:delete
@params:SubCategoryId
@url:http://127.0.0.1:9988/subcategory/SubCategoryId
@url:http://127.0.0.1:9988/subcategory/http://127.0.0.1:9988/subcategory/67b6a1b533acf3fa435acabc
*/

EcomSubCategoryRouter.delete("/:SubCategoryId",async(request:Request , response:Response)=>{
  await EcomSubCategoryController.DeleteEcomSubCategory(request , response)
 } )
 

export default EcomSubCategoryRouter