import { Router } from "express";
import { sample_users } from "../data";
const router =Router();
import jwt from 'jsonwebtoken'
import { JsonWebTokenError } from "jsonwebtoken";
import { User, UserModel } from "../models/user.model";
import asyncHandler from "express-async-handler";
import bcrypt from 'bcryptjs';

router.get('/seed',async (req,res)=>{
       try {
            const usersCount=await UserModel.countDocuments();
            console.log(usersCount);
            
            if(usersCount>0)
            {
            res.send("Seed is already done!");
            return ;
            }
            else{
            console.log("doingggggggggggggggppppp");
            
             await UserModel.create(sample_users);
            res.send("Seed is Done");
        }
       } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Internal server error'});
       }
    }
)


router.post('/login',async(req,res)=>{

    try {
       
        const {email,password}=req.body;
        const user=await UserModel.findOne({email});
        console.log(password);
        console.log(user?.email);
        
       
        if(user){
            bcrypt.compare(password,user.password, (err, result) => {
                if (err) {
                    // Handle error
                    console.error('Error comparing passwords:', err);
                    return;
                }
            
            if (result) {
                // Passwords match, authentication successful
                console.log('Passwords match! User authenticated.');
                res.send(generateTokenResponse(user));
            } else {
                // Passwords don't match, authentication failed
                console.log('Passwords do not match! Authentication failed.');
                return 
            }
            });
            
        }
        else{
            res.status(100).send("User name or password is not valid");
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Internal server error'});
    }
   
})


router.post('/register',async(req,res)=>{

    try {
        const {name,email,password,address}=req.body;
        const user=await UserModel.findOne({email});
        console.log(user);
       
        
        if(user){
            res.status(400).send('User already exist , please login');
            return ;
        }
        const encryptedPassword = await bcrypt.hash(password,10);
        
        const newUser:User={
            id:'',
            name,
            email: email.toLowerCase(),
            password: encryptedPassword,
            address,
            isAdmin:false
        };
        const dbUser=await UserModel.create(newUser);
        res.send(generateTokenResponse(dbUser));
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Internal server error'});
    }
   
})


const  generateTokenResponse =(user:any)=>{
   const token=jwt.sign({
    email:user.email, idAdmin:user.isAdmin
   },"SomeRandomText",{
    expiresIn:"30d"
   })

   user.token=token;
   return user;
}


export default router;
