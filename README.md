**ENLACE PRESENTACIÓN:** https://drive.google.com/file/d/1jsqHZWrf8w3YXzXt4Snb09FGKAh_vVc2/view?usp=sharing 

# 🍕 PizzaYA

PizzaYA es una aplicación para la gestión de pedidos de comida. Incluye un **backend en Node.js con Express** y un **frontend en Ionic React**, todo contenedorizado con Docker.

---

## 📂 Estructura del Proyecto

```
PizzaYA/
├── backend/
│   ├── server.js
│   ├── menu.json
│   ├── pedidos.json
│   └── Dockerfile
├── frontend/
│   ├── src/
│   └── ...
├── docker-compose.yml
└── README.md
```

---

## ⚙️ Requisitos

- Node.js (v18)
- Docker y Docker Compose

---

## 🧪 Instalación Local

### 🔧 Backend

1. Abre una terminal en la carpeta `backend/`
2. Ejecuta los siguientes comandos:

```bash
npm install
node server.js
```

3. El backend estará disponible en: [http://localhost:4000](http://localhost:4000)

### 💻 Frontend

1. Abre otra terminal en la carpeta `frontend/`
2. Ejecuta:

```bash
npm install
npm run dev -- --host
```

3. El frontend estará disponible en: [http://localhost:5173](http://localhost:5173)

---

## 🐳 Instalación con Docker

### 🛠️ Paso 1: Verifica que Docker esté instalado

- Docker Desktop debe estar instalado y corriendo
- Docker Compose también debe estar disponible

### 🛠️ Paso 2: Ejecuta el proyecto

Desde la raíz del proyecto (donde está `docker-compose.yml`):

```bash
docker compose up --build
```

### 🛑 Para detener:

```bash
docker compose down
```

---

## 🧾 Endpoints

- `GET /api/menu` – Lista de platos disponibles
- `GET /api/pedidos` – Todos los pedidos registrados
- `POST /api/pedidos` – Crear nuevo pedido
- `PUT /api/pedidos/:id/estado` – Cambiar estado del pedido
- `PUT /api/pedidos/:id/descartar` – Eliminar pedido
