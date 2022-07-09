const express = require('express');
const { route } = require('express/lib/application');
const router=express.Router();

const controller=require('../controllers/productos')

router.get('/productos',controller.index);

router.get('/productos/:id',controller.show);  

module.exports  =router;