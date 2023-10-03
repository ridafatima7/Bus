const e = require("express");
const mysql = require('mysql');
const connection = require('../App');
async function get_price(req,res)
{
    const query = 'SELECT * FROM routes_price';
    connection.query(query, (error, results) => {
      if (error) {
        console.error('Error executing query: ' + error.message);
        res.status(500).send('Error retrieving data');
        return;
      }
        res.json(results);
    });
}
async function add_price(req, res) {

    const { route_id,desc,price} = req.query;
    const parsedId = parseInt(route_id); 
    const parsedPrice = parseInt(price);
    const checkQuery = 'SELECT * FROM routes WHERE id = ?';
    connection.query(checkQuery, [route_id], (checkError, checkResults) => {
    if (checkError) {
        console.error('Error checking data: ' + checkError.message);
        res.status(500).send('Error checking data');
        return;
    }
      if (checkResults.length === 0) {
       res.status(400).send('No data found  in the "routes" table');

      } else {
        const insertQuery = 'INSERT INTO routes_price (route_id, `desc`,price) VALUES (?, ?, ?)';
        connection.query(insertQuery, [ parsedId,desc,parsedPrice], (insertError, insertResults) => {
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
async function delete_price(req,res)
{
    const { id } = req.query;
    const query = 'DELETE FROM routes_price WHERE  id = ?';
    connection.query(query, [id], (error, results) => 
    {
        if (error) 
        {
          console.error('Error executing query: ' + error.message);
          res.status(500).send('Error deleting data');
          return;
        }
        res.send('price record deleted successfully!');
    });

} 
async function update_price(req, res)
 {
    const {id, route_id,desc,price } = req.query;
    const parsedId = parseInt(id); 
    const parsedPrice = parseInt(price);
    const parsedroute = parseInt(route_id); 

    const updateQuery = 'UPDATE routes_price SET route_id=?, price=?,`desc`=? WHERE id = ?';
      connection.query(
        updateQuery,
        [parsedId, parsedroute,desc,parsedPrice],
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
  async function getdata(req, res) {
  try {
     //  SELECT timings.*, routes.*, routes_price.*
      //  FROM timings
      //  JOIN routes_price ON timings.routeId = routes_price.route_id
      //  JOIN routes ON  timings.routeId = routes.id; 
    //   routes.id AS id,
    // routes.cityId AS cityId,
    // routes.image AS image,
    // routes.name AS name,
    // routes.days AS days,
    // routes.address AS address,
    // routes.phone AS phone,
    // routes.terminal AS terminal,
    // 0 AS is_schedule,
    // routes.date_from AS date_from,
    // routes.date_to AS date_to,  
    const query = `
     SELECT 
    routes.*,
    JSON_ARRAYAGG(
        JSON_OBJECT(
            'id', timings.id,
            'places', timings.places,
            'routeId', timings.routeId,
            'time_from', timings.time_from,
            'time_to', timings.time_to
        )
    ) AS timings,
    JSON_ARRAYAGG(
        JSON_OBJECT(
            'id', routes_price.id,
            'desc', routes_price.desc,
            'price', routes_price.price,
            'route_id', routes_price.route_id
        )
    ) AS routes_price
 FROM routes
 LEFT JOIN timings ON routes.id = timings.routeId
 LEFT JOIN routes_price ON routes.id = routes_price.route_id
 GROUP BY routes.id;

    `;
    connection.query(query, (error, results) => {
      if (error) {
        console.error('Error executing query: ' + error.message);
        res.status(500).send('Error retrieving data');
        return;
      }
      res.json(results);
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving data');
  }
  
}


module.exports={get_price,add_price,delete_price,update_price,getdata}