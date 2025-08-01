const express = require("express");
const cors = require("cors");
const fs = require("fs");
const app = express();

app.use(cors());
app.use(express.json());

const pedidosFile = "./pedidos.json";
const menuFile = "./menu.json";

const leerPedidos = () => {
  const data = fs.readFileSync(pedidosFile, "utf-8");
  return JSON.parse(data);
};

const guardarPedidos = (data) => {
  fs.writeFileSync(pedidosFile, JSON.stringify(data, null, 2));
};

// GET menú
app.get("/api/menu", (req, res) => {
  const data = fs.readFileSync(menuFile);
  res.json(JSON.parse(data));
});

// GET pedidos
app.get("/api/pedidos", (req, res) => {
  try {
    const pedidos = leerPedidos();
    res.status(200).json(pedidos.reverse()); // Mostrarlos más recientes primero
  } catch (err) {
    console.error("Error leyendo pedidos:", err);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// POST nuevo pedido
app.post("/api/pedidos", (req, res) => {
  const { nombre, apellido, correo, direccion, articulos, total } = req.body;

  if (
    !nombre ||
    !apellido ||
    !correo ||
    !direccion ||
    !Array.isArray(articulos)
  ) {
    return res.status(400).json({ error: "Datos incompletos o inválidos" });
  }

  const pedidos = leerPedidos();
  const nuevoPedido = {
    id: Date.now(),
    nombre,
    apellido,
    correo,
    direccion,
    articulos,
    total,
    fecha: new Date().toISOString(),
    estado: "pendiente",
  };

  pedidos.push(nuevoPedido);
  guardarPedidos(pedidos);

  res.status(201).json({ mensaje: "Pedido guardado" });
});

// PUT actualizar estado del pedido
app.put("/api/pedidos/:id/estado", (req, res) => {
  const pedidos = leerPedidos();
  const { id } = req.params;
  const { estado } = req.body;

  const index = pedidos.findIndex((p) => p.id == id);
  if (index === -1)
    return res.status(404).json({ error: "Pedido no encontrado" });

  pedidos[index].estado = estado;
  guardarPedidos(pedidos);
  res.json({ mensaje: "Estado actualizado" });
});

// PUT descartar pedido
app.put("/api/pedidos/:id/descartar", (req, res) => {
  const pedidos = leerPedidos();
  const { id } = req.params;

  const index = pedidos.findIndex((p) => p.id == id);
  if (index === -1)
    return res.status(404).json({ error: "Pedido no encontrado" });

  pedidos[index].estado = "descartado";
  guardarPedidos(pedidos);
  res.json({ mensaje: "Pedido descartado" });
});

app.listen(4000, () => console.log("Backend http://localhost:4000"));
