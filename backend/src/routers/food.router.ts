import { Router } from "express";
import { sample_foods, sample_Tags } from "../data";
import asyncHandler from "express-async-handler";
import { FoodModel } from "../models/food.model";


const router=Router();



router.get("/seed",async (req,res)=>{
       try {
        const foodsCount=await FoodModel.countDocuments();
        if(foodsCount>0)
        {
         res.send("Seed is already done!");
         return ;
        }
        else{
         console.log("doinggggggggggggggg");
         
         await FoodModel.create(sample_foods);
         res.send("Seed is Done");
        }
       } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Internal server error'});
       }
    }
)



router.get("/",async(req,res)=>{
    
       try {
        const foods=await FoodModel.find();
        res.send(foods);
       } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Internal server error'});
       }
    }
)

router.get("/search/:searchTerm",async(req,res)=>{

        try {
            const searchReqex=new RegExp(req.params.searchTerm,'i');
        const foods =await FoodModel.find({name:{$regex:searchReqex}})
        res.send(foods);
        } catch (error) {
            console.log(error);
            res.status(500).json({message: 'Internal server error'});
        }
    }
)

router.get("/tags",async(req,res)=>{
        try {
            const tags=await FoodModel.aggregate([
                {
                    $unwind:'$tags'
                },
                {
                    $group:{
                        _id:'$tags',
                        count:{$sum:1}
                    }
                },
                {
                    $project:{
                        id:0,
                        name:"$_id",
                        count:'$count'
                    }
                }
            ]).sort({count:-1});
    
            const all={
                name:'All',
                count:await FoodModel.countDocuments()
            }
            tags.unshift(all);
            res.send(tags);
        }
         catch (error) {
            console.log(error);
            res.status(500).json({message: 'Internal server error'});
        }
    }
)

// router.get("/:tagName",(req,res)=>{
//    try {
//     const tagName=req.params.tagName;
//     const foods=sample_foods.filter(food=>food.tags?.includes(tagName));
//     res.send( foods);
//    } catch (error) {
//     console.log(error);
//     res.status(500).json({message: 'Internal server error'});
//    }
// })

router.get("/:foodId",async(req,res)=>{

    try {
        const foodId=req.params.foodId;
        console.log(foodId+'aaaaaaaaaaaaa');
        
        const foods= await FoodModel.findById(req.params.foodId);
        res.send(foods);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Internal server error'});
    }
   
})


export default router