const e = require("express");
const mysql = require('mysql');
const connection = require('../App');
async function get_route(req,res)
{
    const query = 'SELECT name, id FROM cities';
    connection.query(query, (error, results) => {
      if (error) {
        console.error('Error executing query: ' + error.message);
        res.status(500).send('Error retrieving data');
        return;
      }
        res.json(results);
    });
}
async function add_route(req, res) {

    const { id, cityId, name, days, image,address, phone, terminal,is_schedule,date_from,date_to } = req.query;
    const checkQuery = 'SELECT * FROM cities WHERE name = ?  AND id = ?';
    connection.query(checkQuery, [name, cityId], (checkError, checkResults) => {
    if (checkError) {
        console.error('Error checking data: ' + checkError.message);
        res.status(500).send('Error checking data');
        return;
    }
      if (checkResults.length === 0) {
        // No matching data found in 'cities' table, proceed with the insert
       res.status(400).send('No data found  in the "cities" table');

      } else {
        // Matching data found in 'cities' table, handle accordingly
        const insertQuery = 'INSERT INTO routes (id, cityId, name, days,image, address, phone, terminal,is_schedule,date_from,date_to) VALUES (?, ?, ?, ?, ?, ?, ?,?,0,0,0)';
        connection.query(insertQuery, [id, cityId, name, days, image,address, phone, terminal,is_schedule,date_from,date_to], (insertError, insertResults) => {
          if (insertError) {
            console.error('Error executing insert query: ' + insertError.message);
            res.status(500).send('Error adding data');
            return;
          }
          res.send('Data added successfully!');
        });
      }
    });
}
async function delete_route(req,res)
{
    const { id } = req.query;
    const query = 'DELETE FROM routes WHERE  id = ?';
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
async function update_route(req, res)
 {
    const {cityId, name, days, image, address, phone, terminal, is_schedule, date_from, date_to,id } = req.query;
      
      const updateQuery = 'UPDATE routes SET cityId=?, name=?, days=?, image=?, address=?, phone=?, terminal=?, is_schedule=?,date_from=?, date_to=? WHERE id = ?';
      connection.query(
        updateQuery,
        [cityId, name, days, image, address, phone, terminal, is_schedule, date_from, date_to,id],
        (updateError, updateResults) => {
          if (updateError) 
          {
            console.error('Error updating data: ' + updateError.message);
            res.status(500).send('Error updating data');
            return;
          }
          res.send('Data updated successfully!');
        }
      );
   
  }

module.exports={get_route,add_route,delete_route,update_route}