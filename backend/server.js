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
  const data = fs.readFileSync(pedidosFile);
  res.json(JSON.parse(data));
});

// POST pedido nuevo
app.post('/api/pedidos', (req, res) => {
  const data = JSON.parse(fs.readFileSync(pedidosFile));
  const nuevo = { id: Date.now(), ...req.body };
  data.push(nuevo);
  fs.writeFileSync(pedidosFile, JSON.stringify(data));
  res.json(nuevo);
});

// DELETE pedido por ID
app.delete('/api/pedidos/:id', (req, res) => {
  const data = JSON.parse(fs.readFileSync(pedidosFile));
  const filtrado = data.filter(p => p.id != req.params.id);
  fs.writeFileSync(pedidosFile, JSON.stringify(filtrado));
  res.sendStatus(200);
});

// Escucha en puerto 4000
app.listen(4000, () => console.log('✅ Backend corriendo en http://localhost:4000'));
