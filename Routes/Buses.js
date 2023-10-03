const express=require('express');
const router=express.Router();
const Controller=require('../Controllers/Buses');
router.get('/add_data',Controller.add_data);
router.get('/get_data',Controller.get_data);
router.get('/delete_data',Controller.delete_data);
router.get('/update_data',Controller.update_data);
module.exports=router;