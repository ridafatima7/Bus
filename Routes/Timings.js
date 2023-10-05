const express=require('express');
const router=express.Router();
const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage
({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads/');
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const extension = path.extname(file.originalname);
      cb(null, file.fieldname + '-' + uniqueSuffix + extension);
    },
  });
  const upload = multer({ storage });
const Controller=require('../Controllers/Timings');
router.get('/add_timing',Controller.add_timings);
router.get('/get_timingroute',Controller.get_timingsroute);
router.get('/get_timing',Controller.get_timings);
router.get('/delete_timing',Controller.delete_timings);
router.get('/update_timing',Controller.update_timings);
router.post('/EditProfilePicture', upload.single('file'), Controller.EditProfilePicture);
module.exports=router;