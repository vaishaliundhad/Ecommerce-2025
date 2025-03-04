import mongoose from 'mongoose';
import { Request, Response } from 'express'
import { IUser } from '../models/IUser';
import UserTable from '../Database/userSchema';
import { validationResult } from 'express-validator';
import bcryptjs from 'bcryptjs'
import gravatar from 'gravatar'
import Jwt from 'jsonwebtoken';


// }


// {
//     "username": "denishundhad123",
//     "email": "denish@gmail.com",
//     "password": "Denish@123",
//     "imageUrl": "image",
//     "isAdmin": true
//   }

/*
  @usage:register a user
  @method:POST
  @params:no-params
  @url:http://127.0.0.1:9900/users/register
*/

export const registerUser = async (request: Request, response: Response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(400).json({
            errors: errors.array()
        })
    }
    try {
        //read the form data

        let { username, email, password } = request.body;

        //check if the user is exists

        const userObj = await UserTable.findOne({ email: email });
        if (userObj) {
            return response.status(400).json({
                error: "The user is already exists"
            })
        }

        //password encryption
        const salt = await bcryptjs.genSalt(10);
        const hashPassword = await bcryptjs.hash(password, salt)


        //gravatar url
        const imageUrl = gravatar.url(email, {
            size: "200",
            rating: "pg",
            default: "mm"
      })

        //insert to db
        const newUser: IUser = {
            username: username,
            email: email,
            password: hashPassword,
            imageUrl: imageUrl,
            isAdmin: false
        }

        const theUserObj = await new UserTable(newUser).save();
        if (theUserObj) {
            return response.status(200).json({
                data: theUserObj,
                msg: "Registation is success"
            })
        }

    }
    catch (error: any) {
        return response.status(500).json({
            error: error.message
        })

    }


}


/*
  @usage:login a user
  @method:POST
  @params:no-params,
  @url:http://127.0.0.1:9900/users/login
*/

export const loginUser = async (request: Request, response: Response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(400).json({
            errors: errors.array()
        })
    }
    try {
        //read the form data

        let { email, password } = request.body;

        //check if the user is exists

        const userObj = await UserTable.findOne({ email: email });
        if (!userObj) {
            return response.status(400).json({
                error: "The user is already exists"
            })
        }

        //password encryption
        // const salt = await bcryptjs.genSalt(10);
        // const hashPassword = await bcryptjs.hash(password, salt)

        let isMatch: boolean = await bcryptjs.compare(password, userObj.password);
        if (!isMatch) {
            return response.status(500).json({
                error: "invalid password"

            })
        }

        //create a token

        const secretKey: string | undefined = process.env.JWT_SECRET_KEY;
        const payload: any = {
            user: {
                id: userObj._id,
                email: userObj.email
            }
        };

        if (secretKey && payload) {
            Jwt.sign(payload, secretKey, {
                expiresIn: 100000000000
            }, (error, encoded) => {
                if (error) throw error;
                if (encoded) {
                    return response.status(200).json({
                        data: userObj,
                        token: encoded,
                        msg: "login sucessfully!!"
                    })
                }

            }

            )
        }
    }
    catch (error: any) {
        return response.status(500).json({
            error: error.message
        })

    }


}

// read method => get All  data

export const readUser = async (request: Request, response: Response) => {

    // console.log("post")
    // const userData = await UserTable.find();
    // if (userData) {
    //     return response.json({
    //         data: userData
    //     })

    // }
    try {
        const userData = await UserTable.find();
        if (!userData) {
            return response.json({
                msg: "data is not found"
            })
        }
        else {
            return response.json({
                data: userData
            })
        }
    }
    catch (error) {
        return response.status(400).json({
            msg: "smething went wrong"
        })
    }
}

/**
 * 
 * @usage: to get a group
 * @method: GET 
 * @params:userId 
 * @url:http://localhost:9988/user:userId
 */
// get single data 

export const getUser = async (request: Request, response: Response) => {

    try {
        let { userId } = request.params;
        const mongoGroupId = new mongoose.Types.ObjectId(userId);
        let theGroup: IUser | undefined | null = await UserTable.findById(mongoGroupId)
        if (!userId) {
            return response.status(400).json({
                data: null,
                error: "no user found"
            })
        }
        return response.status(200).json(theGroup);

    }
    catch (error) {
        return response.json({
            msg: "something went wrong"
        })
    }
}

/*
    @usage :update user by Id
    @method : PUT
    @params : userId
    @url : http://localhost:9900/user:userId
*/

//put method => update data

export const putUser = async (request: Request, response: Response) => {
    const { userId } = request.params;
    const userData = request.body;
    try {

        const mongoGroupId = new mongoose.Types.ObjectId(userId)
        let updatedUser = await UserTable.findByIdAndUpdate(mongoGroupId, userData);
        
            if (updatedUser) {
                return response.status(200).json({ data: userData });
        
            }
            else{
                return response.status(400).json({
                    data:null,
                    error:"user not found"
                })
            }
    }
    catch(eroor){
        return response.status(500).json({
         msg:"data not found"
        })
    }
}


//delete

/*
  @usage : to Delete user
  @method :DELETE
  @param : userId
  @url : http://localhost:9900/user/userId
 */


export const deleteUser = async (request: Request, response: Response) => {
    const { userId } = request.params;
    const deleteUser = await UserTable.findByIdAndDelete(userId);
    if (deleteUser) {

        return response.status(202).json({
            message: "user Deleted  Successfully",
            data: deleteUser
        });
    }
}


