const connection=require('../../db');
const sharp=require('sharp');
const fs = require('fs');

module.exports.index= (req,res) => {
    connection.query('SELECT * FROM productos', (error,results) => {
        if (error) {throw error}

        res.render('admin/productos/index', {productos: results, layout:'layout-admin'});
    });
};

module.exports.create= (req,res) => {
        res.render('admin/productos/create');
};

module.exports.store=  (req,res)=> {
    connection.query('INSERT INTO productos SET ?',
        {nombre: req.body.nombre, categoria_id:req.body.categoria}, 
        (error,results)=>{
            if (error) {throw error}

            sharp(req.file.buffer).resize(300).toFile(`./public/uploads/producto_${results.insertId}.jpg`);

            res.redirect('/admin/productos');
    });
};

module.exports.show= (req,res) => {
    connection.query('SELECT * FROM productos WHERE id=?',[req.params.id] ,(error,results) => {
        if (error) {throw error}

        res.render('admin/productos/show', {producto: results[0]});
    });
};

module.exports.edit= (req,res) => {
    connection.query('SELECT * FROM productos WHERE id=?',[req.params.id] ,(error,results) => {
        if (error) {throw error}
        
        res.render('admin/productos/edit', {producto: results[0]});
    });
};

module.exports.update= (req,res) => {
    connection.query('UPDATE productos SET ? WHERE id = ?',[ {nombre: req.body.nombre , categoria_id:req.body.categoria},req.body.id],(error,results) => {
        if (error) {throw error}

        if (req.file){
            fs.unlink(`./public/uploads/producto_${req.body.id}.jpg`, async error=>{
                if (error) { console.log(error) }
                await sharp(req.file.buffer).resize(300).toFile(`./public/uploads/producto_${req.body.id}.jpg`);
                res.redirect('/admin/productos');
            });
        } else {
            res.redirect('/admin/productos');
        }
    });
};

module.exports.delete=(req,res) => {
    connection.query('DELETE FROM productos WHERE id = ?',[req.params.id],(error,results) => {
        if (error) {throw error}

        res.redirect('/admin/productos');
    });
};

