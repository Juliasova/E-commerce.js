const { Model, DataTypes } = require('sequelize');
const sequelize=require('../db2');

class Categoria extends Model {}

Categoria.init({
    //nombre:DataTypes.STRING,
    //allowNule:false,

},{ sequelize, modelName:'categorias'});

module.exports=Categoria;