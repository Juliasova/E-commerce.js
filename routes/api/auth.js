const express = require('express');
const router = express.Router();
const bcryptjs=require('bcryptjs');

const connection=require('../../db');

router.post('/login',(req,res)=>{
    if (req.body.email && req.body.password){
        connection.query('SELECT * FROM usuarios WHERE email=?',[req.body.email], async (error,results)=>{
            if (error){throw error}
        
            if (results.length==0 || !(await bcryptjs.compare(req.body.password, results[0].password))){
                res.json({error:'El correo y/o la contraseña son incorrectos'});
            } else {
                req.session.user_id=results[0].id;
                req.session.user_email=results[0].email;
                res.redirect('/admin/productos');
            }
        })
    } else {
        res.json({error:'El correo y/o la contraseña son incorrectos'});}
});

module.exports=router;