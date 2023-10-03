const express=require('express');
const router=express.Router();
const Controller=require('../Controllers/Price');
router.get('/add_price',Controller.add_price);
router.get('/get_data',Controller.getdata);
router.get('/get_price',Controller.get_price);
router.get('/delete_price',Controller.delete_price);
router.get('/update_price',Controller.update_price);
module.exports=router;