const express=require('express');
const router=express.Router();
const Controller=require('../Controllers/Timings');
router.get('/add_timing',Controller.add_timings);
router.get('/get_timing',Controller.get_timings);
router.get('/delete_timing',Controller.delete_timings);
router.get('/update_timing',Controller.update_timings);
module.exports=router;