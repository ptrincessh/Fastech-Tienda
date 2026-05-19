import React from 'react';

export default function Inventario({ 
  productos, cargando, busqueda, setBusqueda, esCelular,
  nombre, setNombre, precio, setPrecio, stock, setStock, 
  imagen, setImagen, // <-- ASEGÚRATE DE QUE ESTAS DOS ESTÉN AQUÍ
  agregarProducto, eliminarProducto 
}) {
  
  const totalProductos = productos.length;
  const valorInventario = productos.reduce((acc, p) => acc + ((Number(p.precio) || 0) * (Number(p.stock) || 0)), 0);
  const productosFiltrados = productos.filter(p => p.nombre.toLowerCase().includes(busqueda.toLowerCase()));

  return (
    <>
      <div style={{ ...styles.statsGrid, gridTemplateColumns: esCelular ? '1fr' : '1fr 1.2fr' }}>
        <div style={styles.statCard}>
          <span style={styles.statLabel}>Productos Registrados</span>
          <span style={styles.statNumber}>{totalProductos}</span>
        </div>
        <div style={{ ...styles.statCard, borderLeft: '5px solid #C9ADA7' }}>
          <span style={styles.statLabel}>Valor Total del Inventario</span>
          <span style={{ ...styles.statNumber, color: '#9A8C98' }}>
            ${valorInventario.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>
      </div>
        
      <div style={{ ...styles.twoColumnGrid, gridTemplateColumns: esCelular ? '1fr' : '1fr 1.8fr' }}>
        <form onSubmit={agregarProducto} style={styles.formCard}>
          <h3 style={styles.formTitle}>Registrar Nuevo Artículo</h3>
          
          <div style={styles.inputContainer}>
            <label style={styles.fieldLabel}>Nombre del Producto</label>
            <input placeholder="Ej. Laptop Pro" value={nombre} onChange={e => setNombre(e.target.value)} style={styles.input} />
          </div>
          
          <div style={styles.inputContainer}>
            <label style={styles.fieldLabel}>Precio Unitario ($)</label>
            <input placeholder="0.00" type="number" step="0.01" value={precio} onChange={e => setPrecio(e.target.value)} style={styles.input} />
          </div>
          
          <div style={styles.inputContainer}>
            <label style={styles.fieldLabel}>Unidades Disponibles</label>
            <input placeholder="0" type="number" value={stock} onChange={e => setStock(e.target.value)} style={styles.input} />
          </div>

          <div style={styles.inputContainer}>
            <label style={styles.fieldLabel}>URL o Ruta de la Imagen</label>
            <input placeholder="Ej. /productos/laptop.png" value={imagen} onChange={e => setImagen(e.target.value)} style={styles.input} />
          </div>

          <button type="submit" style={styles.buttonPro}>Guardar en Base de Datos</button>
        </form>

        <div style={styles.tableCard}>
          <div style={{ ...styles.tableHeaderZone, flexDirection: esCelular ? 'column' : 'row', gap: '10px', alignItems: esCelular ? 'stretch' : 'center' }}>
            <h3 style={{ margin: 0, color: '#22233B' }}>Registros Almacenados</h3>
            <input type="text" placeholder="🔍 Buscar..." value={busqueda} onChange={e => setBusqueda(e.target.value)} style={{ ...styles.searchInput, width: esCelular ? '100%' : '180px' }} />
          </div>
          
          <div style={{ overflowX: 'auto', width: '100%' }}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Descripción</th>
                  <th style={styles.th}>Precio</th>
                  <th style={styles.th}>Existencias</th>
                  <th style={{ ...styles.th, textAlign: 'center' }}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {cargando ? (
                  <tr><td colSpan={4} style={styles.loadingState}>🔄 Cargando inventario real...</td></tr>
                ) : productosFiltrados.length === 0 ? (
                  <tr><td colSpan={4} style={styles.emptyText}>No se encontraron productos.</td></tr>
                ) : (
                  productosFiltrados.map((p, index) => (
                    <tr key={p.id || p.ID || index} style={styles.tr}>
                      <td style={styles.tdName}>{p.nombre}</td>
                      <td style={styles.tdPrice}>${parseFloat(p.precio).toFixed(2)}</td>
                      <td style={styles.td}>
                        {/* ERROR SOLUCIONADO: Ahora muestra el número con 'uds disponibles' sin el signo $ */}
                        <span style={p.stock > 0 ? styles.badgeIn : styles.badgeOut}>
                          {p.stock > 0 ? `${p.stock} uds disponibles` : 'Agotado'}
                        </span>
                      </td>
                      <td style={{ ...styles.td, textAlign: 'center' }}>
                        <button type="button" onClick={() => eliminarProducto(p)} style={styles.deleteButton}>Eliminar 🗑️</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

const styles = {
  statsGrid: { display: 'grid', gap: '15px' },
  statCard: { backgroundColor: '#ffffff', borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center', boxShadow: '0 10px 30px rgba(154, 140, 152, 0.1)', border: '1px solid #9A8C98', borderLeft: '5px solid #22233B' },
  statLabel: { color: '#9A8C98', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', marginBottom: '4px' },
  statNumber: { color: '#22233B', fontSize: '24px', fontWeight: '800', fontFamily: 'monospace' },
  twoColumnGrid: { display: 'grid', gap: '20px', alignItems: 'start' },
  formCard: { backgroundColor: '#ffffff', borderRadius: '20px', padding: '22px', boxShadow: '0 12px 35px rgba(154, 140, 152, 0.12)', border: '1px solid #9A8C98', display: 'flex', flexDirection: 'column', gap: '14px' },
  formTitle: { color: '#22233B', fontSize: '18px', fontWeight: '750', margin: 0 },
  fieldLabel: { display: 'block', color: '#444E69', fontSize: '12px', fontWeight: '600', marginBottom: '4px' },
  inputContainer: { width: '100%' },
  
  // CASILLAS DE ENTRADA: Ahora de color #9A8C98 con letras oscuras para excelente lectura
  input: { 
    width: '100%', 
    padding: '12px 16px', 
    borderRadius: '12px', 
    border: '1px solid #444E69', 
    backgroundColor: '#C9ADA7', 
    color: '#22233B', 
    fontSize: '14px', 
    fontWeight: '600',
    outline: 'none', 
    boxSizing: 'border-box' 
  },
  
  buttonPro: { backgroundColor: '#22233B', color: '#ffffff', border: 'none', padding: '14px', borderRadius: '12px', cursor: 'pointer', fontWeight: '600', fontSize: '14px' },
  tableCard: { backgroundColor: '#ffffff', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 12px 35px rgba(154, 140, 152, 0.12)', border: '1px solid #9A8C98' },
  tableHeaderZone: { padding: '15px 20px', display: 'flex', justifyContent: 'space-between' },
  searchInput: { padding: '8px 14px', borderRadius: '10px', border: '1px solid #9A8C98', backgroundColor: '#F2E9E4', outline: 'none', fontSize: '13px' },
  table: { width: '100%', borderCollapse: 'collapse', fontSize: '14px', minWidth: '400px' },
  
  // ENCABEZADOS DE LA TABLA: Ahora de color #C9ADA7
  th: { 
    backgroundColor: '#C9ADA7', 
    color: '#22233B', 
    padding: '14px 18px', 
    fontWeight: '750', 
    borderBottom: '2px solid #9A8C98', 
    textAlign: 'left' 
  },
  
  tr: { borderBottom: '1px solid #F2E9E4' },
  td: { padding: '14px 18px', color: '#444E69', verticalAlign: 'middle' },
  tdName: { padding: '14px 18px', color: '#22233B', fontWeight: '600' },
  tdPrice: { padding: '14px 18px', color: '#22233B', fontWeight: '700', fontFamily: 'monospace' },
  
  // Estilos de los estados de las existencias dentro de la tabla
  badgeIn: { backgroundColor: '#E4E9F2', color: '#444E69', padding: '6px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: '700' },
  badgeOut: { backgroundColor: '#f2e6e6', color: '#C9ADA7', padding: '6px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: '700' },
  
  deleteButton: { backgroundColor: 'rgba(201, 173, 167, 0.15)', color: '#C9ADA7', border: '1px solid rgba(201, 173, 167, 0.4)', padding: '6px 10px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' },
  emptyText: { padding: '30px', textAlign: 'center', color: '#9A8C98', fontStyle: 'italic' },
  loadingState: { padding: '30px', textAlign: 'center', color: '#9A8C98', fontWeight: '600' }
};