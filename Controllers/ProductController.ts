import { EcomProduct } from "../models/EcomProduct";
import { ProductTable } from "../Database/ProductSchema";
import mongoose from "mongoose";
import { Request, Response } from "express";
import { validationResult } from "express-validator";
import bcryptjs from 'bcryptjs'
import gravatar from 'gravatar'
import Jwt from 'jsonwebtoken'
import { request } from "node:http";


/*
@usage:Create a insert product
@method:POST
@params:no-params
@url:http://127.0.0.1:9988/product
*/

// "sub_category_id":67b6a19033acf3fa435acaba",
// "Product_name":"Toys",
// "Product_description":"Toys a very amazing",
// "Product_image":"Barbie",
// "Product_Images":["cat" , "dog"],
// "Product_price":"450",
// "Product_brand":"LEGO",
// "Product_quantity":123,
// isActive:isActive

export const ProductPost =async(request:Request , response:Response)=>{
let {sub_category_id , Product_name , Product_description, Product_image , Product_Images , Product_price , Product_brand , Product_quantity , isActive}=request.body;
let theProduct:EcomProduct| null|undefined = await new ProductTable({
  sub_category_id:sub_category_id,
  Product_name:Product_name,
  Product_description:Product_description,
  Product_image:Product_image,
  Product_Images:Product_Images,
  Product_price:Product_price,
  Product_brand:Product_brand,
  Product_quantity:Product_quantity,
  isActive:isActive
}).save();
if(theProduct)
{
    return response.status(200).json({
        data:theProduct,
        msg:"Product is inserted"

    })
}

}


// export const registerproduct = async (request: Request, response: Response) => {


//   const error = validationResult(request);
//   if (!error.isEmpty()) {
//     return response.status(200).json({
//       errors: error.array()
//     })
//   }
//   try {
//     //read form form data
//     let {username, email, password } = request.body;

//     //check if the user exitsts

//     const userObj = await  ProductTable.findOne({ email: email })
//     if (userObj) {
//       return response.status(400).json({
//         error: "The produt already exit"
//       })
//     }

//     //password encyption
//     const salt = await bcryptjs.genSalt(10)
//     const hashpassword = await bcryptjs.hash(password, salt)

//     //gravatar url

//     const imageUrl = gravatar.url(email, {
//       size: "200",
//       rating: "pg",
//       default: "mm"
//     })

//     //insert to db
//     const newproduct: ProductTable = {
//       username: username,
//       email:email,
//       password: hashpassword,
//       imageUrl: imageUrl,
//       isActive: false
//     }
//     const theproductobj = await new  ProductTable(newproduct).save();
//     if (theproductobj)
//     {
//       return response.status(200).json({
//         data:theproductobj,
//         msg:"Registraton is success"
//       })
//     }

//   }
//   catch(error:any)
//   {
//     return response.status(500).json({
//        error:error.message
//     }) 
//   }


// }


/*
    @usage : get all product
    @method : GET
    @params : no-params
    @url : http://localhost:9988/product
*/

export const GetAllProduct = async (request:Request , response:Response)=>{
  try{
     let theproduct= await ProductTable.find();
     if(theproduct){
        return response.status(200).json({data:theproduct})

     }
     else{
      return response.status(404).json({mag:"not fount product"})
     }
  }
  catch(error)
  {
    return response.status(500).json({
      msg:"something went wrong"
    })
  }
}

/*
@usage:crate a product data
@method:get
@params:productid
@url:http://127.0.0.1:9988/productid
*/


export const GetProduct = async (request: Request, response: Response) => {
  let { productid } = request.params;
  const mongoProductid = new mongoose.Types.ObjectId(productid)
  try {

    let theproduct: EcomProduct | null | undefined = await ProductTable.findById(mongoProductid);
    if (theproduct) {
      return response.status(200).json({
        data: theproduct,
        msg: "Get  Product"
      })
    }
    else {
      return response.status(400).json({
        msg: "no data found"
      })
    }
  }
  catch {
    return response.status(500).json({
      msg: "something went wrong"
    })
  }
}

/*
@usage:updated a product data
@method:PUT
@params:productid
@url:http://127.0.0.1:9988/productid
*/

export const UpdatedProduct = async (request: Request, response: Response) => {
  let { productid } = request.params;
  let { sub_category_id, Product_name, Product_description, Product_image, Product_Images, Product_price, Product_brand, Product_quantity, isActive } = request.body;
  try {

    const mongoProductid = new mongoose.Types.ObjectId(productid);
    const theproduct: EcomProduct | null | undefined = await ProductTable.findByIdAndUpdate(mongoProductid, {
      sub_category_id: sub_category_id,
      Product_name: Product_name,
      Product_description: Product_description,
      Product_image: Product_image,
      Product_Images: Product_Images,
      Product_price: Product_price,
      Product_brand: Product_brand,
      Product_quantity: Product_quantity,
      isActive: isActive
    });
    if (theproduct) {
      return response.status(200).json({
        msg: "updated productdata",
        data: theproduct


      })
    }
    else {
      return response.status(400).json({
        msg: "product not found"
      })
    }
  }
  catch (err) {
    return response.status(500).json({
      msg: "something went wrong"
    })
  }

}

/*
@usage:Delete category by Id
@method:put
@params:productid
@url:http://127.0.0.1:9988/product/deleteproduct/:productid
*/

export const DeleteProduct = async (request: Request, response: Response) => {
  let { productid } = request.params;
  try {

    const mongoProductid = new mongoose.Types.ObjectId(productid)
    const theproductid: EcomProduct | null = await ProductTable.findByIdAndUpdate(mongoProductid, { isActive: false }, { new: true });
    if (theproductid) {
      return response.status(200).json({
        msg: "delete successfully"

      })
    }
    else {
      return response.status(400).json({
        msg: "product not fouund"
      })
    }
  }
  catch (err) {
    return response.status(500).json({
      msg: "something went wrong"
    })
  }
}