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
            res.status(409).json({message: 'Seed is already done'});
            return ;
            }
            else{
            console.log("doingggggggggggggggppppp");
            
             await UserModel.create(sample_users);
            res.status(204).json({message: 'Seed is done'});
        }
       } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Internal server error'});
       }
    }
)


router.post('/login',async(req,res)=>{

    try {
        console.log('pppppppppppppppppppppppllllllllllllllllll');
        
        console.log("body ",req.body);
        
        const {email,password}=req.body;
        const user=await UserModel.findOne({email});
        console.log(password);
        console.log(user?.email);
        
       
        if(user){
            bcrypt.compare(password,user.password, (err, result) => {
                if (err) {
                    // Handle error
                    console.error('Error comparing passwords:', err);
                    res.status(400).json({message: 'Internal server error'});
                    return;
                }
            
            if (result) {
                // Passwords match, authentication successful
                console.log('Passwords match! User authenticated.');
                const userr=generateTokenResponse(user)
                console.log(userr);
                
                res.status(200).send(userr);
            } else {
                // Passwords don't match, authentication failed
                console.log('Passwords do not match! Authentication failed.');
                res.status(200).json({message: 'Internal server error'});
                
            }
            });
            
        }
        else{
            res.status(100).json({message: 'Internal server error'})
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
            res.status(400).json({message: 'Internal server error'});
            return ;
        }
        const encryptedPassword = await bcrypt.hash(password,10);
        
        const newUser:User={
            id:'',
            name,
            email: email.toLowerCase(),
            password: encryptedPassword,
            address,
            isAdmin:false,
            token:''
        };
        const dbUser=await UserModel.create(newUser);
        res.status(204).send(generateTokenResponse(dbUser));
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Internal server error'});
    }
   
})


const  generateTokenResponse =(user:User)=>{
    console.log("tokennnnnnnnnnnnnnnnnnnnn");
    
   const token=jwt.sign({
    email:user.email, idAdmin:user.isAdmin
   },"SomeRandomText",{
    expiresIn:"30d"
   })
    console.log(`token==${token}`);
    
   user.token=token;
   return user;
}


export default router;
