var sql = require('mysql')
const config = sql.createConnection({
    user: 'HSuser',
    password: 'HSpassword',
    host: '127.0.0.1',
    database: 'mydb',
    port: 3306
})

module.exports = config;