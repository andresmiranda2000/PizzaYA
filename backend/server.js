const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();

app.use(cors());
app.use(express.json());

const pedidosFile = './pedidos.json';
const menuFile = './menu.json';

// GET menú
app.get('/api/menu', (req, res) => {
  const data = fs.readFileSync(menuFile);
  res.json(JSON.parse(data));
});

// GET pedidos
app.get('/api/pedidos', (req, res) => {
  try {
    const data = fs.readFileSync(pedidosFile, 'utf-8');
    const pedidos = JSON.parse(data);
    res.status(200).json(pedidos.reverse());
  } catch (err) {
    console.error('Error leyendo pedidos:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// POST pedido nuevo
app.post('/api/pedidos', (req, res) => {
  const { nombre, apellido, correo, direccion, articulos, total } = req.body;

  if (!nombre || !apellido || !correo || !direccion || !Array.isArray(articulos)) {
    return res.status(400).json({ error: 'Datos incompletos o inválidos' });
  }

  const data = JSON.parse(fs.readFileSync(pedidosFile));
  const nuevaOrden = {
    id: Date.now(),
    nombre,
    apellido,
    correo,
    direccion,
    articulos,
    total,
    fecha: new Date().toISOString()
  };

  data.push(nuevaOrden);
  fs.writeFileSync(pedidosFile, JSON.stringify(data, null, 2));

  res.status(201).json({ mensaje: 'Pedido guardado' });
});

// DELETE pedido por ID
app.delete('/api/pedidos/:id', (req, res) => {
  const data = JSON.parse(fs.readFileSync(pedidosFile));
  const filtrado = data.filter(p => p.id != req.params.id);
  fs.writeFileSync(pedidosFile, JSON.stringify(filtrado));
  res.sendStatus(200);
});

app.listen(4000, () => console.log('Backend en http://localhost:4000'));
