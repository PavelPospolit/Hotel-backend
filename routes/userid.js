var express = require('express'),
  config = require('../dbFiles/dbConfig'),
  dbOperations = require('../dbFiles/dbOperations'),
  sql = require('mariadb')
var router = express.Router();


const connection = sql.createPool({
  user: 'HSuser',
  password: 'HSpassword',
  host: '127.0.0.1',
  database: 'mydb',
  port: 3306
});


router.get('/', async function (req, res) {
    connection.getConnection()
      .then(conn => {
        conn.query(`SELECT UserID FROM mydb.User ORDER BY UserID DESC LIMIT 1`)
          .then((result)=>{
            if (result) {
                const id= result[0].UserID;
              res.json({id:id});
            }
            else {
              res.send({ id: 0 })
            }
          })
          .then(() => {
            conn.end();
          })
      })
  
});


module.exports = router