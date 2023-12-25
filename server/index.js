const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user:"root",
    password:"",
    database:"contactosdb"
});

app.post("/create", (req, res) => {
    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const correo = req.body.correo;
    const telefono = req.body.telefono;
    const celular = req.body.celular;
    const direccion = req.body.direccion;

    db.query("INSERT INTO contactos (nombre, apellido, correo, telefono, celular, direccion) VALUES (?,?,?,?,?,?)", [nombre, apellido, correo, telefono, celular, direccion], 
    (err, result) => {
        if(err){
            console.log(err);
        }else{
            res.send("Values Inserted");
        }
    });
});

app.listen(3001, () => console.log('Server running on port 3001'));


app.get("/contactos", (req, res) => {
    db.query("SELECT * FROM contactos", 
    (err, result) => {
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });
});

app.put("/update", (req, res) => {
    const id = req.body.id;
    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const correo = req.body.correo;
    const telefono = req.body.telefono;
    const celular = req.body.celular;
    const direccion = req.body.direccion;
    db.query("UPDATE contactos SET nombre = ?, apellido = ?, correo = ?, telefono = ?, celular = ?, direccion = ? WHERE id = ?", [nombre, apellido, correo, telefono, celular, direccion, id],
    (err, result) => {
        if(err){
            console.log(err);
        }else{
            res.send("Values Updated");
        }
    });
});

app.delete("/delete/:id", (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM contactos WHERE id = ?", id,
    (err, result) => {
        if(err){
            console.log(err);
        }else{
            res.send("Values Deleted");
        }
    });
});