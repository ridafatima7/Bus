const e = require("express");
const mysql = require('mysql');
const connection = require('../App');
async function get_timings(req,res)
{
    const query = 'SELECT * FROM timings';
    connection.query(query, (error, results) => {
      if (error) {
        console.error('Error executing query: ' + error.message);
        res.status(500).send('Error retrieving data');
        return;
      }
        res.json(results);
    });
}
async function add_timings(req, res) {

    const { id, routeId,places,time_from,time_to } = req.query;
    const checkQuery = 'SELECT * FROM routes WHERE id = ?';
    connection.query(checkQuery, [routeId], (checkError, checkResults) => {
    if (checkError) {
        console.error('Error checking data: ' + checkError.message);
        res.status(500).send('Error checking data');
        return;
    }
      if (checkResults.length === 0) {
       res.status(400).send('No data found  in the "routes" table');

      } else {
        const insertQuery = 'INSERT INTO timings ( id, routeId,places,time_from,time_to) VALUES (?, ?, ?, ?, ?)';
        connection.query(insertQuery, [ id, routeId,places,time_from,time_to], (insertError, insertResults) => {
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
async function delete_timings(req,res)
{
    const { id } = req.query;
    const query = 'DELETE FROM timings WHERE  id = ?';
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
async function update_timings(req, res)
 {
    const {id, routeId,places,time_from,time_to  } = req.query;
      
      const updateQuery = 'UPDATE timings SET routeId=?,  places=? ,time_from=?, time_to=? WHERE id = ?';
      connection.query(
        updateQuery,
        [id, routeId,places,time_from,time_to],
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

module.exports={get_timings,add_timings,delete_timings,update_timings}