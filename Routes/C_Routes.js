const express=require('express');
const router=express.Router();
const Controller=require('../Controllers/C_Routes');
router.get('/add_route',Controller.add_route);
router.get('/get_route',Controller.get_route);
router.get('/delete_route',Controller.delete_route);
router.get('/update_route',Controller.update_route);
module.exports=router;