const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const productos = [
  {
    id: 1,
    nombre: 'Camisa casual azul',
    categoria: 'Camisas',
    precio: 29.99,
    descripcion: 'Tela cómoda y resistente ideal para el día a día.',
    color: 'Azul',
    stock: 16,
    imagen: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 2,
    nombre: 'Jeans slim negro',
    categoria: 'Pantalones',
    precio: 39.99,
    descripcion: 'Ajuste moderno, cómodo y versátil para cualquier ocasión.',
    color: 'Negro',
    stock: 22,
    imagen: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 3,
    nombre: 'Sudadera urbana',
    categoria: 'Sudaderas',
    precio: 24.99,
    descripcion: 'Perfecta para looks relajados y salidas informales.',
    color: 'Gris',
    stock: 18,
    imagen: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 4,
    nombre: 'Chaqueta ligera',
    categoria: 'Abrigos',
    precio: 44.99,
    descripcion: 'Abrigo ligero con diseño elegante para transiciones de clima.',
    color: 'Beige',
    stock: 10,
    imagen: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80'
  }
];

const consultas = [];

app.get('/api/productos', (req, res) => {
  res.json({
    total: productos.length,
    productos
  });
});

app.post('/api/contacto', (req, res) => {
  const { nombre, email, mensaje } = req.body;

  if (!nombre || !email || !mensaje) {
    return res.status(400).json({
      success: false,
      message: 'Nombre, email y mensaje son obligatorios.'
    });
  }

  const registro = {
    id: consultas.length + 1,
    nombre,
    email,
    mensaje,
    creadoEn: new Date().toISOString()
  };

  consultas.push(registro);

  res.json({
    success: true,
    message: 'Consulta recibida correctamente. Te contactaremos pronto.',
    registro
  });
});

app.get('/api/contacto', (req, res) => {
  res.json({ total: consultas.length, consultas });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
