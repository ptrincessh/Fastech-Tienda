import React, { useState, useEffect } from 'react';
import logo from './Logi.png'; 

import Navbar from './componentes/Navbar';
import Inventario from './componentes/Inventario';
import Catalogo from './componentes/Catalogo';
import DetalleCompra from './componentes/DetalleCompra';
import Alertas from './componentes/Alertas';
import Caja from './componentes/Caja';

export default function App() {
  const [productos, setProductos] = useState([]);
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [stock, setStock] = useState('');
  const [imagen, setImagen] = useState(''); 
  const [cargando, setCargando] = useState(false);
  const [vista, setVista] = useState('inventario');
  const [busqueda, setBusqueda] = useState('');
  
  // 🌟 VARIABLE DE SIMULACIÓN: Aquí se guardan las compras temporalmente
  const [ventas, setVentas] = useState([]); 
  
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [anchoPantalla, setAnchoPantalla] = useState(window.innerWidth);

  useEffect(() => {
    const manejarResize = () => setAnchoPantalla(window.innerWidth);
    window.addEventListener('resize', manejarResize);
    return () => window.removeEventListener('resize', manejarResize);
  }, []);

  const esCelular = anchoPantalla <= 768;

  // Cargar productos desde tu backend (IP nueva)
  useEffect(() => {
    setCargando(true);
    fetch('http://192.168.1.44:5000/productos')
      .then(res => res.json())
      .then(data => { setProductos(data); setCargando(false); })
      .catch(err => { console.error("Error al leer:", err); setCargando(false); });
  }, []);

  const agregarProducto = async (e) => {
    e.preventDefault();
    if (!nombre || !precio || !stock) return;
    const nuevo = { nombre, precio: parseFloat(precio), stock: parseInt(stock), imagen: imagen || null };
    try {
      const res = await fetch('http://192.168.1.44:5000/productos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevo)
      });
      const productoGuardado = await res.json();
      setProductos([...productos, productoGuardado]);
      setNombre(''); setPrecio(''); setStock(''); setImagen('');
    } catch (err) { console.error("Error al agregar:", err); }
  };

  const eliminarProducto = async (producto) => {
    const idReal = producto.id || producto.ID;
    if (!idReal || !window.confirm(`¿Eliminar "${producto.nombre}"?`)) return;
    try {
      const res = await fetch(`http://192.168.1.44:5000/productos/${idReal}`, { method: 'DELETE' });
      if (res.ok) setProductos(productos.filter(p => (p.id || p.ID) !== idReal));
    } catch (err) { console.error("Error al eliminar:", err); }
  };

  // 🌟 FUNCIÓN DE SIMULACIÓN PURA (No toca la base de datos)
  const simularCompra = (producto) => {
    if (producto.stock <= 0) return alert("¡Agotado!");

    // 1. Descuenta 1 unidad en la pantalla
    setProductos(productos.map(p => {
      const idP = p.id || p.ID;
      const idProd = producto.id || producto.ID;
      if (idP === idProd) return { ...p, stock: p.stock - 1 };
      return p;
    }));

    // 2. Registra los datos de la compra: artículo, costo y hora exacta
    const nuevaVenta = {
      idVenta: Date.now(),
      nombre: producto.nombre,
      precio: producto.precio,
      hora: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    };

    // 3. Lo mete a la lista de la caja simulada
    setVentas([nuevaVenta, ...ventas]);

    alert(`⚡ ¡"${producto.nombre}" adquirido! Enviado a Caja.`);
  };

  const productosAlerta = productos.filter(p => p.stock <= 3);

  return (
    <div style={{ backgroundColor: '#f4ebe1', minHeight: '100vh', boxSizing: 'border-box' }}>
      <Navbar 
        vista={vista} setVista={setVista} esCelular={esCelular} 
        totalAlertas={productosAlerta.length} totalVentas={ventas.length} logo={logo} 
      />

      <div style={{ width: '100%', maxWidth: '1140px', margin: '20px auto', padding: '0 15px', display: 'flex', flexDirection: 'column', gap: '20px', boxSizing: 'border-box' }}>
        
        {vista === 'inventario' && (
          <Inventario 
            productos={productos} cargando={cargando} busqueda={busqueda} setBusqueda={setBusqueda} esCelular={esCelular}
            nombre={nombre} setNombre={setNombre} precio={precio} setPrecio={setPrecio} stock={stock} setStock={setStock}
            imagen={imagen} setImagen={setImagen}
            agregarProducto={agregarProducto} eliminarProducto={eliminarProducto}
          />
        )}

        {vista === 'catalogo' && (
          <Catalogo 
            productos={productos} busqueda={busqueda} setBusqueda={setBusqueda} esCelular={esCelular}
            alSeleccionarProducto={(p) => { setProductoSeleccionado(p); setVista('detalle'); }}
          />
        )}

        {/* Pasamos la función de simulación tal cual la tenías */}
        {vista === 'detalle' && (
          <DetalleCompra 
            producto={productoSeleccionado} 
            simularCompra={simularCompra} 
            volver={() => setVista('catalogo')}
          />
        )}

        {/* Pasamos las ventas simuladas a la Caja */}
        {vista === 'alertas' && <Alertas productos={productos} esCelular={esCelular} />}
        {vista === 'caja' && <Caja ventas={ventas} esCelular={esCelular} />}

      </div>
    </div>
  );
}