let express = require('express');
let mysql = require('mysql');
let cors = require('cors');

let app = express();
app.use(express.json());
app.use(cors());

let conexion = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'pwdata',
        port: '8080'
    }
);
conexion.connect(function(error){
    if(error)
        throw error;
    else
        console.log('conectado a la base de datos');
});
//metodos tabla cliente
app.get('/api/clientes/',(req,res)=>{
    conexion.query('select * from clientes',(error,fila)=>{
        if(error)
        throw error;
    else
        res.send(fila)
    });
});
app.get('/api/clientes/:id',(req,res)=>{
    conexion.query('select * from clientes where id=?',[req.params.id],
    (error,fila)=>{
        if(error)
        throw error;
    else
        res.send(fila)
    });
});
app.delete('/api/clientes/:id',(req,res)=>{
    conexion.query('delete from clientes where id=?',[req.params.id],
    (error,fila)=>{
        if(error)
        throw error;
    else
        res.send(fila)
    });
});
app.post('/api/clientes',(req,res)=>{
    let data = {
        id: req.body.id,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        direccion: req.body.direccion,
        telefono: req.body.telefono,
        rfc: req.body.rfc,
        curp: req.body.curp,
        cp: req.body.cp
    }
    let sql = "insert into clientes set ?";
    conexion.query(sql,data,
    (error,resultado)=>{
        if(error)
        throw error;
    else
        res.send(resultado)
    });
});
app.put('/api/clientes/:id',(req,res)=>{
    let id = req.params.id;
    let nombre = req.body.nombre;
    let apellido = req.body.apellido;
    let direccion = req.body.direccion;
    let telefono = req.body.telefono;
    let rfc = req.body.rfc;
    let curp = req.body.curp;
    let cp = req.body.cp;
    let sql = "update clientes set nombre=?, apellido=?, direccion=?, telefono=?, rfc=?, curp=?, cp=? where id=?";
    conexion.query(sql,[nombre, apellido, direccion, telefono, rfc, curp, cp, id],
    (error,fila)=>{
        if(error)
        throw error;
    else
        res.send(fila)
    });
});
//metodos tabla vendedores
app.get('/api/vendedores/',(req,res)=>{
    conexion.query('select * from vendedores',(error,fila)=>{
        if(error)
        throw error;
    else
        res.send(fila)
    });
});
app.get('/api/vendedores/:id',(req,res)=>{
    conexion.query('select * from vendedores where idvendedor=?',[req.params.id],
    (error,fila)=>{
        if(error)
        throw error;
    else
        res.send(fila)
    });
});
app.delete('/api/vendedores/:id',(req,res)=>{
    conexion.query('delete from vendedores where idvendedor=?',[req.params.id],
    (error,fila)=>{
        if(error)
        throw error;
    else
        res.send(fila)
    });
});
app.post('/api/vendedores',(req,res)=>{
    let data = {
        idvendedor: req.body.idvendedor,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        departamentotienda: req.body.departamentotienda
    }
    let sql = "insert into vendedores set ?";
    conexion.query(sql,data,
    (error,resultado)=>{
        if(error)
        throw error;
    else
        res.send(resultado)
    });
});
app.put('/api/vendedores/:idvendedor',(req,res)=>{
    let idvendedor = req.params.idvendedor;
    let nombre = req.body.nombre;
    let apellido = req.body.apellido;
    let departamentotienda = req.body.departamentotienda;
    let sql = "update vendedores set nombre=?, apellido=?, departamentotienda=? where idvendedor=?";
    conexion.query(sql, [nombre, apellido, departamentotienda, idvendedor],
    (error,fila)=>{
        if(error)
        throw error;
    else
        res.send(fila)
    });
});
//metodos tabla articulos
app.get('/api/articulos/',(req,res)=>{
    conexion.query('select * from articulos',(error,fila)=>{
        if(error)
        throw error;
    else
        res.send(fila)
    });
});
app.get('/api/articulos/:id',(req,res)=>{
    conexion.query('select * from articulos where clavearticulo=?',[req.params.id],
    (error,fila)=>{
        if(error)
        throw error;
    else
        res.send(fila)
    });
});
app.delete('/api/articulos/:id',(req,res)=>{
    conexion.query('delete from articulos where clavearticulo=?',[req.params.id],
    (error,fila)=>{
        if(error)
        throw error;
    else
        res.send(fila)
    });
});
app.post('/api/articulos',(req,res)=>{
    let data = {
        clavearticulo: req.body.clavearticulo,
        descripcion: req.body.descripcion,
        existencia: req.body.existencia,
        precio: req.body.precio
    }
    let sql = "insert into articulos set ?";
    conexion.query(sql,data,
    (error,resultado)=>{
        if(error)
        throw error;
    else
        res.send(resultado)
    });
});
app.put('/api/articulos/:clavearticulo',(req,res)=>{
    let clavearticulo = req.params.clavearticulo;
    let descripcion = req.body.descripcion;
    let existencia = req.body.existencia;
    let precio = req.body.precio;
    let sql = "update articulos set descripcion=?, existencia=?, precio=? where clavearticulo=?";
    conexion.query(sql, [descripcion, existencia, precio, clavearticulo],
    (error,fila)=>{
        if(error)
        throw error;
    else
        res.send(fila)
    });
});
app.get("/",function(req,res){
    res.send('rutas de inicio');
});
app.listen(3000, function(){
    console.log('Servidor listo');
});

app.get('/api/ventas/',(req,res)=>{
    conexion.query('select * from ventas',(error,fila)=>{
        if(error)
        throw error;
    else
        res.send(fila)
    });
});
app.post('/api/ventas',(req,res)=>{
    let data = {
        clavearticulo: req.body.clavearticulo,
        cantidad: req.body.cantidad,
        precio: req.body.precio,
        fecha: req.body.fecha,
        idvendedor: req.body.idvendedor
    }
    let sql = "insert into ventas set ?";
    conexion.query(sql,data,
    (error,resultado)=>{
        if(error)
        throw error;
    else
        res.send(resultado)
    });
});