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


router.post('/', async function (req, res) {
  let email = req.body.email;

    connection.getConnection()
      .then(conn => {
        conn.query(`SELECT * FROM mydb.User WHERE Email LIKE '${email}'`)
        .then((result)=>{
              console.log(result.length)
            if (result.length === 0 ) {
              res.json({ unique: true});
            }
            else {
              res.send({ unique: false })
            }
          })
          .then(() => {
            conn.end();
          })
      })
  
});

module.exports = router