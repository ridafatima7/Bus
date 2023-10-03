const express=require('express');
const router=express.Router();
const Controller=require('../Controllers/Bookings');
router.get('/add_bookingdata',Controller.add_bookingdata);
router.get('/get_bookingdata',Controller.get_bookingdata);
router.get('/delete_bookingdata',Controller.delete_bookingdata);
router.get('/update_bookingdata',Controller.update_bookingdata);
router.get('/bookingseats',Controller.bookingseats);
module.exports=router;