import express from "express"
import cors from "cors";
import foodRouter from './routers/food.router'
import userRouter from  "./routers/user.router"
import dotenv from 'dotenv'
dotenv.config();
process.env.MONGO_URI
import { dbConnect } from "./configs/database.config";
import userAuth from "./middelware/middelware";
dbConnect();


const app=express();
app.use(express.json());

// request from one local host 5000 to local host 4200(frontend)
app.use(cors({
    credentials:true,
    origin:["http://localhost:4200"]
}))

app.use("/api/foods",userAuth,foodRouter);
app.use("/api/users", userRouter);



const port=5000;
app.listen(port,()=>{
    console.log("website served on http://localhost:"+port);
    
})