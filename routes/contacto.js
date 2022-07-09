const express = require ('express');
const router=express.Router();
const nodemailer=require('nodemailer');
const ejs=require('ejs');

const {body, validationResult}= require('express-validator');

router.get('/contacto', (req,res) => {
    res.render('contacto/index', {values: {}});
})

router.post('/contacto', [
    body('nombre','El nombre es obligatorio y debe tener más de 2 caracteres').exists().isLength(2).escape(),
    body('email','El email es obligatorio. Ingrese una dirección válida').exists().isEmail().normalizeEmail(),
    body('mensaje','El mensaje es obligatorio').exists().trim().notEmpty().escape(),
] , (req,res) => {
    const errors=validationResult(req);
    console.log(req.body, errors);

    if (errors.isEmpty()){

        const transporter=nodemailer.createTransport({
            host:'smtp.mailtrap.io',
            port:2525,
            secure:false,
            auth:{
                user:'d4a1c9c74ce54f',
                pass:'3883f933c6293c',
            }
        });

        ejs.renderFile(__dirname+'/../views/contacto/correo.ejs',{ body:req.body }, (error,html) =>{
            if (error) {throw error}

            const options={
                from:req.body.email,
                to:'julia@gmail.com',
                subject:'Nodemailer',
                html:html
            }

            transporter.sendMail(options, (error,info) =>{
                if (error) {throw error}
                console.log(info);
            });
        });    

        res.send('Enviado...');
        
    } else {
        res.render('contacto/index',{values: req.body , errors: errors.array()})
    }
   
})

module.exports=router;
