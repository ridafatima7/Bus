const e = require("express");
const mysql = require('mysql');
const connection = require('../App');
async function get_data(req,res)
{
    const query = 'SELECT * FROM buses';
    connection.query(query, (error, results) => {
      if (error) {
        console.error('Error executing query: ' + error.message);
        res.status(500).json({ error: 'Error retrieving data' }); 
        return;
      }
            const data = {
        buses: results,
      };
        res.status(200).json(data);
    });
  }
async function add_data(req,res,next)
{
    const {id, bus_no,cityId} = req.query;
  const query = 'INSERT INTO buses (id, bus_no,cityId) VALUES (?, ?,?)';
  connection.query(query, [id, bus_no,cityId], (error, results) => {
    if (error) {
      console.error('Error executing query: ' + error.message);
      res.status(500).send('Error adding data');
      return;
    }
    res.send('Data added successfully !');
  });
}
async function delete_data(req,res)
{
    const { id } = req.query;
    const query = 'DELETE FROM buses WHERE  id = ?';
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
async function update_data(req,res)
{
    const {id, cityId,bus_no} = req.query;
    const parsedId = parseInt(id); 
    const parsedCityId = parseInt(cityId);
    const updateQuery = 'UPDATE buses SET bus_no=?, cityId=? WHERE id = ?';
      connection.query(
        updateQuery,
        [parsedId,parsedCityId,bus_no],
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
module.exports={get_data,add_data,delete_data,update_data}