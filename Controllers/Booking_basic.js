const e = require("express");
const mysql = require('mysql');
const connection = require('../App');
async function get_bookings(req,res)
{
    const query = 'SELECT * FROM bookings_basic_info';
    connection.query(query, (error, results) => {
      if (error) {
        console.error('Error executing query: ' + error.message);
        res.status(500).send('Error retrieving data');
        return;
      }
        res.json(results);
    });
}
async function add_booking(req,res,next)
{
    const {booking_id,customerName,customerEmail,customerAddress,customerPhone,customerCnic,validate} = req.query;
  const query = 'INSERT INTO bookings_basic_info (booking_id,customerName,customerEmail,customerAddress,customerPhone,customerCnic,validate) VALUES (?,?,?,?,?,?,?)';
  connection.query(query, [booking_id,customerName,customerEmail,customerAddress,customerPhone,customerCnic,validate], (error, results) => {
    if (error) {
      console.error('Error executing query: ' + error.message);
      res.status(500).send('Error adding data');
      return;
    }
    res.send('Data added successfully !');
  });
}
async function delete_booking(req,res)
{
    const { id } = req.query;
    const query = 'DELETE FROM bookings_basic_info WHERE  booking_id = ?';
    connection.query(query, [id], (error, results) => 
    {
        if (error) 
        {
          console.error('Error executing query: ' + error.message);
          res.status(500).send('Error deleting data');
          return;
        }
        res.send('Data deleted successfully!');
    });

}
async function update_booking(req, res)
 {
    const { booking_id, customerName} = req.query;
    const updateQuery = 'UPDATE bookings_basic_info SET customerName=? WHERE booking_id = ?';
    connection.query(
    updateQuery,
    [customerName, booking_id], 
    (updateError, updateResults) => {
    if (updateError) 
    {
      console.error('Error updating data: ' + updateError.message);
      res.status(500).send('Error updating data');
      return;
    }
    res.send(updateResults);
  }
);
}

module.exports={get_bookings,add_booking,delete_booking,update_booking}