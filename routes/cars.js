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
            conn.query(`SELECT * FROM mydb.Cars`)
                .then((result) => {
                    res.json(result);

                })
                .then(() => {
                    conn.end();
                })
        })

});


module.exports = router