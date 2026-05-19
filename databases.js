require('dotenv').config(); 
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Datos reales, usamos process.env
const db = mysql.createConnection({
    host: process.env.DB_HOST,      
    user: process.env.DB_USER,      
    password: process.env.DB_PASSWORD,  
    database: process.env.DB_NAME   
});

db.connect(err => {
    if (err) {
        console.error('Error conectando a MySQL:', err);
        return;
    }
    console.log('✅ Conectado exitosamente a la base de datos MySQL de forma segura');
});

// --- RUTA [READ]: Obtener productos ---
app.get('/productos', (req, res) => {
    db.query('SELECT * FROM productos ORDER BY id DESC', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// --- RUTA [CREATE]: Agregar producto con VALIDACIONES (Modificada con imagen) ---
app.post('/productos', (req, res) => {
    const { nombre, precio, stock, imagen } = req.body;
    const foto = imagen || null; // Si no mandan imagen, se guarda como NULL en MySQL

    // Bloqueo de seguridad: Validaciones de datos vacíos o negativos
    if (!nombre || nombre.trim() === "") {
        return res.status(400).json({ error: "El nombre del producto no puede estar vacío." });
    }
    if (parseFloat(precio) < 0) {
        return res.status(400).json({ error: "El precio no puede ser un número negativo." });
    }
    if (parseInt(stock) < 0) {
        return res.status(400).json({ error: "La cantidad en stock no puede ser negativa." });
    }

    // Insertamos incluyendo la columna imagen
    db.query('INSERT INTO productos (nombre, precio, stock, imagen) VALUES (?, ?, ?, ?)', 
    [nombre, precio, stock, foto], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: result.insertId, nombre, precio, stock, imagen: foto });
    });
});

// --- RUTA [UPDATE / PUT]: Puente esencial para actualizar stock tras una compra ---
app.put('/productos/:id', (req, res) => {
    const idProducto = parseInt(req.params.id, 10);
    const { nombre, precio, stock, imagen } = req.body;

    if (isNaN(idProducto)) {
        return res.status(400).json({ error: "El ID proporcionado no es válido." });
    }
    if (parseInt(stock, 10) < 0) {
        return res.status(400).json({ error: "El stock no puede ser negativo tras la venta." });
    }

    db.query('UPDATE productos SET nombre = ?, precio = ?, stock = ?, imagen = ? WHERE id = ?',
    [nombre, precio, stock, imagen || null, idProducto], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Producto no encontrado para actualizar." });
        }
        res.json({ message: "Producto y stock actualizados con éxito", id: idProducto, stock });
    });
});

// --- RUTA [DELETE]: CORREGIDA Y BLINDADA ---
app.delete('/productos/:id', (req, res) => {
    const idProducto = parseInt(req.params.id, 10);
    
    if (isNaN(idProducto)) {
        return res.status(400).json({ error: "El ID proporcionado no es válido." });
    }
    
    db.query('DELETE FROM productos WHERE id = ?', [idProducto], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Producto no encontrado en la base de datos." });
        }
        res.json({ message: "Producto eliminado correctamente", id: idProducto });
    });
});

// =================================================================
// RUTAS PARA EL CONTROL DE CAJA E INGRESOS (Persistencia Historial)
// =================================================================

// --- RUTA [CREATE VENTA]: Registrar una nueva venta en la caja de MySQL ---
app.post('/ventas', (req, res) => {
    const { idVenta, nombre, precio, hora } = req.body;

    if (!nombre || !precio || !hora) {
        return res.status(400).json({ error: "Faltan datos obligatorios para registrar la venta." });
    }

    db.query('INSERT INTO ventas (idVenta, nombre, precio, hora) VALUES (?, ?, ?, ?)',
    [idVenta, nombre, precio, hora], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: result.insertId, idVenta, nombre, precio, hora });
    });
});

// --- RUTA [READ VENTAS]: Obtener el historial completo de caja ---
app.get('/ventas', (req, res) => {
    db.query('SELECT * FROM ventas ORDER BY id DESC', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Arranca el servidor usando el puerto del .env (5000)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en el puerto ${PORT}`));