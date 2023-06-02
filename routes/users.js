var express = require('express'),
  config = require('../dbFiles/dbConfig'),
  dbOperations = require('../dbFiles/dbOperations'),
  sql = require('mariadb'),
  bcrypt = require('bcryptjs');
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
  let password = req.body.password;
  if (email && password) {

    connection.getConnection()
      .then(conn => {
        conn.query(`SELECT * FROM mydb.User WHERE Email LIKE '${email}'`)
          .then((result) => {
            if (result[0]) {
              bcrypt.compare(password, result[0].Passwort, (err, resulto) => {
                if (resulto) {
                  console.log("12313");
                  const id = result[0].UserID;
                  const admin = result[0].Admin;
                  const emailLiu = result[0].Email;
                  const vorname = result[0].Vorname;
                  const nachname = result[0].Nachname;
                  const strasse = result[0].Straße;
                  const hausnr = result[0].HausNr;
                  const ort = result[0].Ort;
                  const plz = result[0].PLZ
                  res.json({ auth: true, id: id, admin: admin, email: emailLiu, vorname: vorname, nachname: nachname, strasse: strasse, hausnr: hausnr, ort: ort, plz: plz });
                }
                else {
                  res.send({ auth: false, message: 'no user found' })
                }

              })
            }
          })
          .then(() => {
            conn.end();
          })
      })
  }
});

module.exports = router