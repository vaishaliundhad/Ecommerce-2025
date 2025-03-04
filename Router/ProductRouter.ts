import {Request , Response , Router} from 'express'
import * as ProductController from '../Controllers/ProductController'


const ProductRouter:Router= Router();
/*
@usage:Create a insert product
@method:POST
@params:no-params
@url:http://127.0.0.1:9988/product
*/

ProductRouter.post("/" , async(request:Request, response:Response)=>{
    await ProductController.ProductPost(request , response)
})

/*
@usage:crate a product data
@method:get
@params:no-params
@url:http://127.0.0.1:9988/product
*/

ProductRouter.get("/", async(request:Request , response:Response)=>{
 await ProductController.GetAllProduct(request , response)
}) 


/*
@usage:crate a product data
@method:get
@params:productid
@url:http://127.0.0.1:9988/productid
*/

ProductRouter.get("/:productid" , async(request:Request , response:Response)=>{
 await ProductController.GetProduct(request, response)
})

/*
@usage:updated a product data
@method:PUT
@params:productid
@url:http://127.0.0.1:9988/productid
*/

ProductRouter.put("/:productid", async(request:Request , response:Response)=>{
 await ProductController.UpdatedProduct(request, response)
})

/*
@usage:Delete category by Id
@method:put
@params:productid
@url:http://127.0.0.1:9988/product/deleteproduct/:productid
*/

ProductRouter.put("/deleteproduct/:productid" , async(request:Request, response:Response)=>{
 await ProductController.DeleteProduct(request , response)
})
export default ProductRouter


