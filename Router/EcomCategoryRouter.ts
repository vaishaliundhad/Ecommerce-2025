import {Request , Response , Router} from 'express'
import  * as CategoryController from '../Controllers/CategoryController'



const CategoryRouter:Router=Router();


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

CategoryRouter.post("/",async(request:Request , response:Response)=>{
     console.log("post");
     await CategoryController.CreateEcom(request , response)
})

/*
   @usage:create all category
   @method: GET
   @params:name
   @url: http://localhost:9988/category
*/
CategoryRouter.get("/" , async(request:Request , response:Response)=>{
    console.log("getAll");
    await CategoryController.getallcategory(request, response)
    
})

/*
   @usage:read  category
   @method: GET
   @params:name
   @url: http://localhost:9988/category/67b60929aff0c5b8b36bb038
*/

CategoryRouter.get("/:CategoryId" , (request:Request, response:Response)=>{
  console.log("get");
  CategoryController.getcategory(request, response)
})

/*
   @usage:updated a Category
   @method: PUT
   @params:name
   @url: http://localhost:9988/category/67b60929aff0c5b8b36bb038
*/

CategoryRouter.put("/:CategoryId" , async(request:Request, response:Response)=>{
console.log("put");
await CategoryController.PutEcomCategory(request, response)

})
/*
   @usage:delete a Category
   @method: DELETE
   @params:name
   @url: http://localhost:9988/category/deletecategoty/67b60929aff0c5b8b36bb038
*/

CategoryRouter.put("/deletecategoty/:CategoryId" ,async(request:Request, response:Response) =>{
    console.log("Delete");
   await CategoryController.deleteCategory(request, response)
    
})

export default CategoryRouter