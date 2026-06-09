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

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
