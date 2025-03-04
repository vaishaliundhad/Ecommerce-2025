import express, {Application , Request , Response} from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
dotenv.config({path:"./.env"})

const hostName:string="127.0.0.1"
const port:number|string|undefined=process.env.PORT || 9900;
const dbUrl:any = process.env.MONODB_URL;
const dbName:string|undefined=process.env.MONGODB_DATABASE;

const app:Application=express()
app.use(express.json())

// mongoose.connect(dbUrl , {dbName:dbName})
// .then(()=>{console.log("Database connection is ready...")})
// .catch((err)=>{console.log(err);
// })

 if(port){
    app.listen(Number(port) , ()=>{
          if(dbUrl && dbName) {
            mongoose.connect(dbUrl , {dbName:dbName})
            .then((dbresponse)=>{
                console.log("server succesfull");
                
            })
            .catch((err)=>{
              console.log(err);
              
            })
          }
          // console.log(`express server is started https://${hostName}:${port}`);
          
    })

    
}

// Category Router Configuration

import EcomCategoryRouter from './Router/EcomCategoryRouter'
app.use("/category", EcomCategoryRouter)

// SubCategory Router Configuration
import EcomSubCategoryRouter from './Router/EcomSubCategoryRouter'
app.use("/subcategory", EcomSubCategoryRouter);

//Product Router Configuration

import ProductRouter from './Router/ProductRouter'
app.use("/product", ProductRouter)


// router Configuration
//user
import userRouter from './Router/userRouter';
app.use("/users" ,userRouter )

app.listen(Number(port) , hostName , ()=>{
  console.log(`Express server is started http://${hostName}:${port}`);
  
})
