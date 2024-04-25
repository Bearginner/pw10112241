let express = require('express');
let mysql = require('mysql');
let cors = require('cors');

let app = express();
app.use(express.json());
app.use(cors());

//Conexion a MYSQL
let conexion = mysql.createConnection({
    host: '127.0.0.1',
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

// Encender el server
let puerto = 3000;
app.listen(puerto, function(){
    console.log("Servidor escuchando puerto "+puerto);
});
