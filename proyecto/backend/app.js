let express = require('express');
let mysql = require('mysql');
let cors = require('cors');

let app = express();
app.use(express.json());
app.use(cors());

//Conexion a MYSQL
let conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'pwdata'
});

//Nos conectamos a MYSQL
conexion.connect(function(error){
    if(error){
        throw error;
    } else {
        console.log('Conectado a la base de datos');
    }
});

//Seleccionamos todos los clientes
app.get('/api/clientes', (req, res) =>{
    conexion.query('Select * From clientes', (error, filas)=>{
        if(error){
            throw error;
        } else {
            res.send(filas);
        }
    });
}
);

// Rutas de Acceso
app.get("/", function(req, res){
    res.send("Emilio, si estas viendo holis");
})

//Seleccionamos un cliente en especifico
app.get('/api/clientes/:id', (req, res) =>{
    conexion.query('Select * From clientes Where id = ?', [req.params.id], (error, fila) =>{
        if(error){
            throw error;
        } else {
            res.send(fila);
        }
    })
});

//Eliminamos cliente
app.delete('/api/clientes/:id', (req, res) => {
    let id = req.params.id;
    conexion.query('Delete From clientes Where id = ?', [id], (error, filas) =>{
        if(error){
            throw error;
        } else {
            res.send(filas);
        }
    })
});

//Insertar cliente
app.post('/api/clientes', (req, res) => {
    let data = {
        id:req.body.id,
        nombre: req.body.nombre,
        direccion: req.body.direccion,
        telefono: req.body.telefono,
        rfc: req.body.rfc
    }
    let sql = "Insert Into clientes Set ?";
    conexion.query(sql, data, (error, resultado) =>{
        if(error){
            throw error;
        } else {
            res.send(resultado);
        }
    })
});

// Actualizar cliente
app.put('/api/clientes/:id', (req, res) => {
    let id = req.params.id;
    let nombre = req.body.nombre;
    let direccion = req.body.direccion;
    let telefono = req.body.telefono;
    let rfc = req.body.rfc;
    let sql = "Update clientes Set nombre = ?, direccion = ?, telefono = ?, rfc = ? Where id = ?";
    conexion.query(sql, [nombre, direccion, telefono, rfc, id], (error, resultado) =>{
        if(error){
            throw error;
        } else {
            res.send(resultado);
        }
    });
});

// Encender el server
let puerto = 3000;
app.listen(puerto, function(){
    console.log("Servidor escuchando puerto "+puerto);
});

//Eliminar las APIS;  rm -rf node_modules <- Solo MAC