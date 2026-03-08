const express = require("express");
const db = require("./db");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: process.env.MYSQLHOST,
    port: process.env.MYSQLPORT,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABASE
});
db.connect(err => {
    if(err){
        console.log("Error conectando a MySQL:", err);
    }else{
        console.log("Conectado a MySQL");
    }
});


app.post("/register", (req,res)=>{

const {nombre,email,password} = req.body;

if(!email.endsWith("@gmail.com")){
return res.json({mensaje:"El correo debe ser @gmail.com"});
}

const sql = "INSERT INTO usuarios (nombre,email,password) VALUES (?,?,?)";

db.query(sql,[nombre,email,password],(err,result)=>{
if(err){
return res.status(500).json(err);
}

res.json({mensaje:"Usuario registrado"});
});

});

app.post("/login",(req,res)=>{

const {email,password} = req.body;

db.query(
"SELECT * FROM usuarios WHERE email=? AND password=?",
[email,password],
(err,result)=>{

if(err){
return res.status(500).json(err);
}

if(result.length > 0){

let usuario = result[0];

res.json({
login:true,
rol:usuario.rol,
nombre:usuario.nombre
});

}else{

res.json({login:false});

}

});

});

app.post("/recuperar",(req,res)=>{

const {email} = req.body;

const sql = "SELECT * FROM usuarios WHERE email=?";

db.query(sql,[email],(err,result)=>{

if(err){
return res.status(500).json(err);
}

if(result.length > 0){

return res.json({
existe:true,
password: result[0].password
});

}else{

return res.json({
existe:false
});

}

});

});


app.get("/tareas",(req,res)=>{

const sql = "SELECT * FROM tareas";

db.query(sql,(err,result)=>{
if(err){
return res.status(500).json(err);
}

res.json(result);
});

});


app.post("/tareas",(req,res)=>{

const {titulo,usuario,estado} = req.body;

const sql = "INSERT INTO tareas (titulo,usuario,estado) VALUES (?,?,?)";

db.query(sql,[titulo,usuario,estado],(err,result)=>{
if(err){
return res.status(500).json(err);
}

res.json({message:"Tarea creada"});
});

});



app.delete("/tareas/:id",(req,res)=>{

const id = req.params.id;

const sql = "DELETE FROM tareas WHERE id=?";

db.query(sql,[id],(err,result)=>{
if(err){
return res.status(500).json(err);
}

res.json({message:"Tarea eliminada"});
});

});


app.put("/tareas/:id",(req,res)=>{

const id = req.params.id;
const {estado} = req.body;

const sql = "UPDATE tareas SET estado=? WHERE id=?";

db.query(sql,[estado,id],(err,result)=>{
if(err){
return res.status(500).json(err);
}

res.json({message:"Estado actualizado"});
});

});

app.get("/estadisticas",(req,res)=>{

const sqlTotal = "SELECT COUNT(*) AS total FROM tareas";
const sqlPendientes = "SELECT COUNT(*) AS pendientes FROM tareas WHERE estado='Pendiente'";
const sqlCompletadas = "SELECT COUNT(*) AS completadas FROM tareas WHERE estado='Completada'";

db.query(sqlTotal,(err,total)=>{

db.query(sqlPendientes,(err,pendientes)=>{

db.query(sqlCompletadas,(err,completadas)=>{

res.json({
total: total[0].total,
pendientes: pendientes[0].pendientes,
completadas: completadas[0].completadas
});

});

});

});

});


const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
console.log("Servidor corriendo en puerto", PORT);
});