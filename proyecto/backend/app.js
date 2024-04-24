let express = require('express');
let mysql = require('mysql');
let cors = require('cors');

let app = express();
app.use(express.json());
app.use(cors());

// Rutas de Acceso
app.get("/", function(req, res){
    res.send("Emilio, si estas viendo holis");
})

// Encender el server
let puerto = 3000;
app.listen(puerto, function(){
    console.log("Servidor escuchando puerto "+puerto);
});
