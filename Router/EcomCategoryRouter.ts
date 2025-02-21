import {Request , Response , Router} from 'express'
import  * as EcomCategoryController from '../Controllers/EcomCategoryController'



const EcomCategoryRouter:Router=Router();


/*
   @usage:create a group
   @method: POST
   @params:name
   @url: http://localhost:9988/category
*/

// "category_name":bansi,
// "category_description":undhad,
// "category_logo":Image,
// "isActive":true

EcomCategoryRouter.post("/",async(request:Request , response:Response)=>{
     console.log("post");
     await EcomCategoryController.CreateEcom(request , response)
})

/*
   @usage:create all category
   @method: GET
   @params:name
   @url: http://localhost:9988/category
*/
EcomCategoryRouter.get("/" , async(request:Request , response:Response)=>{
    console.log("getAll");
    await EcomCategoryController.ReadAllEcom(request, response)
    
})

/*
   @usage:read  category
   @method: GET
   @params:name
   @url: http://localhost:9988/category/67b60929aff0c5b8b36bb038
*/

EcomCategoryRouter.get("/:CategoryId" , (request:Request, response:Response)=>{
  console.log("get");
  EcomCategoryController.ReadEcom(request, response)
})

/*
   @usage:updated a Category
   @method: PUT
   @params:name
   @url: http://localhost:9988/category/67b60929aff0c5b8b36bb038
*/

EcomCategoryRouter.put("/:CategoryId" , async(request:Request, response:Response)=>{
console.log("put");
await EcomCategoryController.PutEcomCategory(request, response)

})
/*
   @usage:delete a Category
   @method: DELETE
   @params:name
   @url: http://localhost:9988/category/67b60929aff0c5b8b36bb038
*/

EcomCategoryRouter.delete("/:CategoryId" ,async(request:Request, response:Response) =>{
    console.log("Delete");
   await EcomCategoryController.deleteCategory(request, response)
    
})

export default EcomCategoryRouter