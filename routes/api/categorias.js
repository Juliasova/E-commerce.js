const express = require('express');
//const { route } = require('express/lib/application');
const router=express.Router();

const controller=require('../../controllers/api/categorias');

router.get('/api/categorias',controller.index);

router.post('/api/categorias',controller.store);
router.get('/api/categorias/:id',controller.show);  

router.put('/api/categorias',controller.update);

router.delete('/api/categorias/:id',controller.delete);

module.exports  =router;