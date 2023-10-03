const e = require("express");
const mysql = require('mysql');
const connection = require('../App');
async function get_bookingdata(req,res)
{
    const query = 'SELECT * FROM bookings';
    connection.query(query, (error, results) => {
      if (error) {
        console.error('Error executing query: ' + error.message);
        res.status(500).send('Error retrieving data');
        return;
      }
      const data = {
        bookings: results, 
      };
        res.status(200).json(data);
    });
}
async function add_bookingdata(req,res,next)
{
        const { id, routeId, date, timeId, type, booking_id,seatId} = req.query;
      
        const priceQuery = 'SELECT price FROM routes_price WHERE route_id = ?';
      
        connection.query(priceQuery, [routeId], (priceError, priceResults) => {
          if (priceError) {
            console.error('Error retrieving price: ' + priceError.message);
            res.status(500).send('Error adding data');
            return;
          }
      
          if (priceResults.length === 0) {
            res.status(400).send('No price found for the specified route');
            return;
          }
          if (seatId === null || seatId === undefined) {
            console.error('Seat ID is null or undefined');
            res.status(400).send('Seat ID is missing or invalid');
            return;
          }
          const price = priceResults[0].price;
          const insertQuery = 'INSERT INTO bookings (id, routeId, date, timeId, type, booking_id, price,seatId) VALUES (?, ?, ?, ?, ?, ?, ?,?)';
      
          connection.query(
            insertQuery,
            [id, routeId, date, timeId, type, booking_id,price,seatId],
            (insertError, insertResults) => {
              if (insertError) {
                console.error('Error executing insert query: ' + insertError.message);
                res.status(500).send('Error adding data');
                return;
              }
              res.send('Data added successfully!');
            }
          );
        });
}
async function delete_bookingdata(req,res)
{
    const { id } = req.query;
    const query = 'DELETE FROM bookings WHERE  id = ?';
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
async function update_bookingdata(req, res)
 {
    const { id, timeId} = req.query;
    const updateQuery = 'UPDATE bookings SET timeId=? WHERE id = ?';
    connection.query(
    updateQuery,
    [id, timeId], 
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
async function bookingseats(req, res)
{
    const selectQuery = `
      SELECT bookings_basic_info.*, bookings.*, seats.*
      FROM bookings_basic_info
      LEFT JOIN bookings ON bookings_basic_info.booking_id = bookings.booking_id
      LEFT JOIN seats ON bookings.booking_id = seats.id
    `;
  
    connection.query(selectQuery, (selectError, selectResults) => {
      if (selectError) {
        console.error('Error retrieving data: ' + selectError.message);
        res.status(500).send('Error retrieving data');
        return;
      }
        const recordsWithSeats = {};
        selectResults.forEach((result) => {
        const bookingId = result.booking_id;
       
       
        if (!recordsWithSeats[bookingId]) {
          recordsWithSeats[bookingId] = {
            // Add fields from bookings_basic_info
            booking_id: result.booking_id,
            customerName:result.customerName,
            customerEmail :result.customerEmail ,
            customerAddress:result.customerAddress,
            customerPhone:result.customerPhone,
            customerCnic:result.customerCnic,
            // Add other fields as needed
  
            // Initialize an array for seats
            seats: [],
          };
        }
  
        // Add seat information to the 'seats' array for the current booking_id
        recordsWithSeats[bookingId].seats.push({
          // Add fields from seats
           seat_id: result.id,
           seat_No:result.seat_no,
           routeId:result.routeId,
           price:result.price,
           type:result.type,
           timeId:result.timeId,
           date:result.date
        });
      });
  
      const recordsArray = Object.values(recordsWithSeats);
      res.status(200).json(recordsArray);
    });
  }
  



module.exports={bookingseats,get_bookingdata,add_bookingdata,delete_bookingdata,update_bookingdata}