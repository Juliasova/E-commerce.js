const { Sequelize } = require('sequelize');

const sequelize= new Sequelize('cac_22005','root','root',{
    host:'127.0.0.1',
    dialect:'mysql',
    port:8889,
    socketPath:'/Applications/MAMP/tmp/mysql/mysql.sock'
});

module.exports=sequelize;


