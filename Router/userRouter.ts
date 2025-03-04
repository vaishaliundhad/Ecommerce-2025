import { Request, Response, Router } from 'express';
import * as userController from '../Controllers/userController'
import { body } from 'express-validator';
import jwt from 'jsonwebtoken'

const userRouter: Router = Router();


/*
   @usage:Get User
   @method: POST
   @params:no-params
   @url: http://localhost:9988/user
*/

// {
    // "username":"username",
    // "email":"b@gmail.com",
    // "password":"123",
    // "imageUrl":"image",
    // "isAdmin":true

//   }

// userRouter.post("/", async(request:Request , response:Response)=>{
//     await userController.createUser(request , response)
// })
/*
  @usage:register a user
  @method:POST
  @params:usename , email, password,
  @url:http://127.0.0.1:9900/users/register
*/
// userRouter.post("/register",
//     [
//         body('username').not().isEmpty().withMessage("username is required"),
//         body('email').isEmail().withMessage("proper Email is Required"),
//         body('password').isStrongPassword().withMessage("string password is Required")
//     ],
//     async (request: Request, response: Response) => {
//         console.log("post");
//         await userController.createUser(request, response);

//     }
// )
userRouter.post("/register",
    [
        body('username').not().isEmpty().withMessage("username is required"),
        body('email').isEmail().withMessage("proper Email is Required"),
        body('password').isStrongPassword().withMessage("string password is Required")
    ],
    async (request: Request, response: Response) => {
        console.log("post");
        await userController.registerUser(request, response);

    }
)

userRouter.post("/login",
    [
       
        body('email').isEmail().withMessage("proper Email is Required"),
        body('password').isStrongPassword().withMessage("string password is Required")
    ],
    async (request: Request, response: Response) => {
        console.log("post");
        await userController.loginUser(request, response);

    }
)

// userRouter.post("/login",
//     // [body('name').not().isEmpty().withMessage("name isrequires")],
//     async (request: Request, response: Response) => {
//         console.log("post");
//         await userController.createUser(request, response);

//     }
// )


/*
   @usage: to Get a User
   @method: GET
   @params:userId
   @url: http://localhost:9988/user/:groupId
*/
userRouter.get("/:userId", async (request: Request, response: Response) => {
    await userController.getUser(request, response)
})

/*
   @usage:Get All User
   @method: GET
   @params:no-params
   @url: http://localhost:9988/user
*/

userRouter.get("/", async (request: Request, response: Response) => {
    await userController.readUser(request, response)
})



//put method


/*
   @usage: put User by ID
   @method: put
   @params: userId
   @url: http://localhost:9988/user/:userId
   */


userRouter.put("/:userId", async (request: Request, response: Response) => {
    await userController.putUser(request, response)
})


/*
   @usage: Delete User by ID
   @method: DELETE
   @params: userId
   @url: http://localhost:9988/user/:userId
   */

userRouter.delete("/:userId", async (request: Request, response: Response) => {
    await userController.deleteUser(request, response);
})


export default userRouter