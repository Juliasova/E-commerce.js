const express = require('express');
const { route } = require('express/lib/application');
const router=express.Router();
const multer=require('multer');
//const upload=multer({dest:'uploads/'});
const upload=multer({storage: multer.memoryStorage()});

const controller=require('../../controllers/admin/productos');

router.get('/admin/productos',controller.index);
router.get('/admin/productos/create',controller.create);
router.post('/admin/productos/store',upload.single('imagen'),controller.store);
router.get('/admin/productos/:id',controller.show);  
router.get('/admin/productos/:id/edit',controller.edit);
router.put('/admin/productos/update',upload.single('imagen'),controller.update);

router.delete('/admin/productos/:id/delete',controller.delete);

module.exports  =router;