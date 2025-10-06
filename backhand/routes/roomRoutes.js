import express from 'express';
import uplode from '../midelware/uplodeMiddelware.js';
import { createRoom, getOwnerRooms, getRooms, toggleroomAvailablity } from '../conttrolers/roomController.js';
import { protect } from '../midelware/authMiddleware.js';

const roomRouter=express.Router();

roomRouter.post('/',uplode.array("images",4),protect,createRoom)
roomRouter.get('/',getRooms)
roomRouter.get('/owner',protect,getOwnerRooms)
roomRouter.post('/toggel_availibility',protect,toggleroomAvailablity)

export default roomRouter;