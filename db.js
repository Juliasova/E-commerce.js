require('dotenv').config()

const mysql = require ('mysql');

const connection = mysql.createConnection({
    host: process.env.DB_HOST, //'localhost',
    user: process.env.DB_USER, //'root',
    password: process.env.DB_PASS, //'root',
    database: process.env.DB_NAME, //'cac_22005',
    socketPath:'/Applications/MAMP/tmp/mysql/mysql.sock'
});

connection.connect(error => {
    if (error) { throw error }
});

module.exports=connection;

/* connection.query('SELECT id, nombre FROM productos', (error, results)=>{
    if (error) { throw error }

    //console.log(results);
}); */

// connection.destroy();