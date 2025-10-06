import express from "express"
import { protect } from "../midelware/authMiddleware.js";
import { getUserData, storeRecentSearchedCities } from "../conttrolers/userControler.js";


const userRouter=express.Router();

userRouter.get('/',protect,getUserData);
userRouter.post('/store-recent-seacrch',protect,storeRecentSearchedCities);


export default userRouter