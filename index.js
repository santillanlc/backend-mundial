const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// GET /jugadores — obtener todos los jugadores
app.get('/jugadores', (_req, res) => {
  const sql = 'SELECT * FROM jugadores';

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// GET /jugadores/:id — obtener un jugador por id
app.get('/jugadores/:id', (req, res) => {
  const sql = 'SELECT * FROM jugadores WHERE id = ?';

  db.query(sql, [req.params.id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.length === 0) {
      return res.status(404).json({ mensaje: 'Jugador no encontrado' });
    }
    res.json(results[0]);
  });
});

// POST /jugadores — crear un nuevo jugador
app.post('/jugadores', (req, res) => {
  const { nombre, apellido, pais, posicion } = req.body;

  if (!nombre || !apellido || !pais || !posicion) {
    return res.status(400).json({ error: 'nombre, apellido, pais y posicion son obligatorios' });
  }

  const { fecha_nac, edad, dorsal,
          club_actual, liga_club, pais_club, valor_mercado_M,
          goles_seleccion, partidos_seleccion, capitan, convocado_mundial2026 } = req.body;

  const sql = `INSERT INTO jugadores
    (nombre, apellido, fecha_nac, edad, pais, posicion, dorsal,
     club_actual, liga_club, pais_club, valor_mercado_M,
     goles_seleccion, partidos_seleccion, capitan, convocado_mundial2026)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const valores = [nombre, apellido, fecha_nac, edad, pais, posicion, dorsal,
                   club_actual, liga_club, pais_club, valor_mercado_M,
                   goles_seleccion, partidos_seleccion, capitan, convocado_mundial2026];

  db.query(sql, valores, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ mensaje: 'Jugador creado', id: result.insertId });
  });
});

// PUT /jugadores/:id — actualizar un jugador
app.put('/jugadores/:id', (req, res) => {
  const { nombre, apellido, fecha_nac, edad, pais, posicion, dorsal,
          club_actual, liga_club, pais_club, valor_mercado_M,
          goles_seleccion, partidos_seleccion, capitan, convocado_mundial2026 } = req.body;

  if (!nombre || !apellido || !pais || !posicion) {
    return res.status(400).json({ error: 'nombre, apellido, pais y posicion son obligatorios' });
  }

  const sql = `UPDATE jugadores SET
    nombre = ?, apellido = ?, fecha_nac = ?, edad = ?, pais = ?, posicion = ?, dorsal = ?,
    club_actual = ?, liga_club = ?, pais_club = ?, valor_mercado_M = ?,
    goles_seleccion = ?, partidos_seleccion = ?, capitan = ?, convocado_mundial2026 = ?
    WHERE id = ?`;

  const valores = [nombre, apellido, fecha_nac, edad, pais, posicion, dorsal,
                   club_actual, liga_club, pais_club, valor_mercado_M,
                   goles_seleccion, partidos_seleccion, capitan, convocado_mundial2026,
                   req.params.id];

  db.query(sql, valores, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ mensaje: 'Jugador no encontrado' });
    }
    res.json({ mensaje: 'Jugador actualizado' });
  });
});

// DELETE /jugadores/:id — eliminar un jugador
app.delete('/jugadores/:id', (req, res) => {
  const sql = 'DELETE FROM jugadores WHERE id = ?';

  db.query(sql, [req.params.id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ mensaje: 'Jugador no encontrado' });
    }
    res.json({ mensaje: 'Jugador eliminado' });
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
