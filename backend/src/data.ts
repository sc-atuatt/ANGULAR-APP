import {Food} from "../../frontend/src/app/shared/models/food";
import { Tag } from "../../frontend/src/app/shared/models/Tag";

export const sample_foods: Food[]=[
    { 
    id:'1',
    name:'parathe',
    price:1,
    favourite:true,
    stars:5,
    imageUrl:'',
    origins:[],
    cookTime:'one hour'
    },
    { id:'1',
        name:'roti',
        price:1,
        favourite:true,
        stars:5,
        imageUrl:'',
        origins:[],
        cookTime:'one hour'
    }
]

export const sample_Tags:Tag[]=[
    {
        name:'ALL',
        count:8,
    },
    {
        name:'ALL',
        count:8,
    },
    {
        name:'ALL',
        count:8,
    },
    {
        name:'ALL',
        count:8,
    }
]

export const sample_users:any[]=[
    {
        name:"atul",
        email:"atul@gmail.com",
        password:"12345",
        isAdmin:true,
        address:"delhi"
    },
    {
        name:"atul",
        email:"atul@gmail.com",
        password:"12345",
        isAdmin:true,
        address:"delhi"
    }
]