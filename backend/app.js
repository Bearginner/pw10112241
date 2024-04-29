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

// Encender el server
let puerto = 3000;
app.listen(puerto, function(){
    console.log("Servidor escuchando puerto "+puerto);
});

//Eliminar las APIS;  rm -rf node_modules