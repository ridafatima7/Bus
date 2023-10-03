const express=require('express');
const router=express.Router();
const Controller=require('../Controllers/Booking_basic');
router.get('/add_booking',Controller.add_booking);
router.get('/get_booking',Controller.get_bookings);
router.get('/delete_booking',Controller.delete_booking);
router.get('/update_booking',Controller.update_booking);
module.exports=router;