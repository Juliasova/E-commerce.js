const express = require('express');
const { route } = require('express/lib/application');
const router=express.Router();

const controller=require('../../controllers/api/categorias');

router.get('/admin/categorias',controller.index);

router.post('/admin/categorias/store',controller.store);
router.get('/admin/categorias/:id',controller.show);  

router.put('/admin/categorias/update',controller.update);

router.delete('/admin/categorias/:id/delete',controller.delete);

module.exports  =router;