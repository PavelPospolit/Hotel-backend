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

  let id = req.body.id;
  let email= req.body.email;
  let vorname= req.body.vorname;
  let nachname = req.body.nachname;
  let strasse = req.body.strasse;
  let hausnummer = req.body.hausnummer;
  let plz = req.body.plz;
  let ort = req.body.ort;
  let passwort = req.body.passwort;

  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(passwort, salt)


    connection.getConnection()
      .then(conn => {
        conn.query(`INSERT INTO mydb.User (UserID, Email, Vorname, Nachname, Passwort, Straße, HausNr, PLZ, ORT) 
        VALUES('${id}', '${email}', '${vorname}', '${nachname}', '${hashedPassword}', '${strasse}', '${hausnummer}', '${plz}', '${ort}')`)
          .then((result)=>{
              res.json({ success: true });
          })
          .then(() => {
            conn.end();
          })
      })
  
});

module.exports = router