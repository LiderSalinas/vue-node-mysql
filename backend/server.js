// backend/server.js

const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();

// Configuración de MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'pacientes'
});

db.connect((err) => {
  if (err) {
    console.error('Error de conexión a MySQL:', err);
  } else {
    console.log('Conexión a MySQL establecida');
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.get('/pacientes', (req, res) => {
  db.query('SELECT * FROM pacientes', (err, result) => {
    if (err) {
        
      res.status(500).send(err.message);
    } else {
      res.json(result);
    }
  });
});

app.post('/pacientes', (req, res) => {
  const { nombre, edad } = req.body;
  db.query('INSERT INTO pacientes (nombre, edad) VALUES (?, ?)', [nombre, edad], (err, result) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.json({ message: 'Paciente agregado correctamente', id: result.insertId });
    }
  });
});

app.put('/pacientes/:id', (req, res) => {
  const { nombre, edad } = req.body;
  const pacienteId = req.params.id;
  db.query('UPDATE pacientes SET nombre = ?, edad = ? WHERE id = ?', [nombre, edad, pacienteId], (err, result) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.json({ message: 'Paciente actualizado correctamente' });
    }
  });
});

app.delete('/pacientes/:id', (req, res) => {
  const pacienteId = req.params.id;
  db.query('DELETE FROM pacientes WHERE id = ?', [pacienteId], (err, result) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.json({ message: 'Paciente eliminado correctamente' });
    }
  });
});

// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
