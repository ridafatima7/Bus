const e = require("express");
const mysql = require('mysql');
const connection = require('../App');
async function get_data(req,res)
{
    const query = 'SELECT name, id FROM cities';
    connection.query(query, (error, results) => {
      if (error) {
        console.error('Error executing query: ' + error.message);
        res.status(500).json({ error: 'Error retrieving data' }); 
        return;
      }
            const data = {
        cities: results,
      };
        res.status(200).json(data);
    });
  }
async function totalRoutes(req,res)
{
    const selectQuery = `
      SELECT cities.id AS city_id, cities.name AS city_name, COUNT(routes.id) AS route_count
      FROM cities
      LEFT JOIN routes ON cities.id = routes.cityId
      GROUP BY cities.id, cities.name;
    `;
  
    connection.query(selectQuery, (selectError, selectResults) => {
      if (selectError) {
        console.error('Error retrieving data: ' + selectError.message);
        res.status(500).send('Error retrieving data');
        return;
      }
  
      const responseData = {};
  
      selectResults.forEach((result) => {
        const cityId = result.city_id;
        const cityName = result.city_name;
        const routeCount = result.route_count;
  
        responseData[cityId] = {
          id: cityId,
          name: cityName,
          routes: routeCount,
        };
      });
  
      const responseObject = { data: Object.values(responseData) };
      res.status(200).json(responseObject);
    });
  }
  

  
async function add_data(req,res,next)
{
    const {name, id} = req.query;
  const query = 'INSERT INTO cities (name, id) VALUES (?, ?)';
  connection.query(query, [name, id], (error, results) => {
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
    const query = 'DELETE FROM cities WHERE  id = ?';
    connection.query(query, [id], (error, results) => 
    {
        if (error) 
        {
          console.error('Error executing query: ' + error.message);
          res.status(500).send('Error delet ing data');
          return;
        }
        res.send('Data deleted successfully!');
    });

}


module.exports={get_data,add_data,delete_data,totalRoutes}