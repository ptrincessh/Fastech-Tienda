import React from 'react';

export default function Catalogo({ productos, busqueda, setBusqueda, esCelular, alSeleccionarProducto }) {
  const productosFiltrados = productos.filter(p => p.nombre.toLowerCase().includes(busqueda.toLowerCase()));

  return (
    <div style={styles.catalogWrapper}>
      <div style={{ ...styles.catalogHeader, flexDirection: esCelular ? 'column' : 'row', gap: '15px', alignItems: esCelular ? 'stretch' : 'center' }}>
        <h2 style={styles.catalogTitle}>Escaparate de Productos</h2>
        <input type="text" placeholder="🔍 ¿Qué buscas hoy?" value={busqueda} onChange={e => setBusqueda(e.target.value)} style={{ ...styles.searchBarCatalog, width: esCelular ? '100%' : '300px' }} />
      </div>
      
      <div style={{ ...styles.catalogGrid, gridTemplateColumns: esCelular ? '1fr' : 'repeat(auto-fill, minmax(220px, 1fr))' }}>
        {productosFiltrados.length === 0 ? (
          <p style={styles.emptyText}>No hay artículos que coincidan.</p>
        ) : (
          productosFiltrados.map((p, index) => {
            const fotoProducto = p.imagen || "/Logi.png";

            return (
              <div key={p.id || p.ID || index} style={styles.productCard} onClick={() => alSeleccionarProducto(p)}>
                <div style={styles.cardImageContainer}>
                  <img src={fotoProducto} alt={p.nombre} style={styles.cardImage} />
                </div>
                <h4 style={styles.cardProdName}>{p.nombre}</h4>
                <p style={styles.cardProdPrice}>${parseFloat(p.precio).toFixed(2)}</p>
                <div style={{ marginBottom: '12px' }}>
                  {p.stock <= 3 && p.stock > 0 && <span style={styles.alertMiniBadge}>⚠️ ¡Últimas unidades!</span>}
                  <span style={p.stock > 0 ? styles.badgeIn : styles.badgeOut}>{p.stock > 0 ? `${p.stock} Disponibles` : 'Agotado'}</span>
                </div>
                <button style={styles.buyButton}>🔎 Ver detalles</button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

const styles = { 
  catalogWrapper: { backgroundColor: '#ffffff', borderRadius: '20px', padding: '20px', boxShadow: '0 12px 35px rgba(154, 140, 152, 0.12)', border: '1px solid #9A8C98' }, 
  catalogHeader: { display: 'flex', justifyContent: 'space-between', marginBottom: '20px', borderBottom: '1px solid #9A8C98', paddingBottom: '12px' }, 
  catalogTitle: { color: '#22233B', margin: 0, fontSize: '20px', fontWeight: '750' }, 
  searchBarCatalog: { padding: '10px 16px', borderRadius: '12px', border: '1px solid #9A8C98', backgroundColor: '#F2E9E4', outline: 'none', fontSize: '14px' }, 
  catalogGrid: { display: 'grid', gap: '20px' }, 
  
  // EL CUADRITO DE CADA PRODUCTO
  productCard: { 
    backgroundColor: '#C9ADA7', 
    borderRadius: '16px', 
    padding: '18px', 
    textAlign: 'center', 
    border: '1px solid #9A8C98', 
    overflow: 'hidden', 
    cursor: 'pointer', 
    transition: 'transform 0.2s', 
    boxShadow: '0 6px 20px rgba(0,0,0,0.06)' 
  }, 
  
  // CORREGIDO: Contenedor interno de la imagen centrado estrictamente
  cardImageContainer: { 
    width: '100%', 
    height: '150px', 
    marginBottom: '10px', 
    overflow: 'hidden', 
    borderRadius: '12px', 
    backgroundColor: '#ffffff', 
    display: 'flex', 
    alignItems: 'center',      // Centra verticalmente la imagen
    justifyContent: 'center',  // CORREGIDO: Centra horizontalmente la imagen de forma real
    padding: '8px', 
    boxSizing: 'border-box' 
  }, 
  
  // Ajuste de la imagen para que mantenga sus proporciones y no se deforme
  cardImage: { 
    maxWidth: '100%', 
    maxHeight: '100%', 
    objectFit: 'contain',
    display: 'block'           // Elimina espacios fantasma debajo de la imagen
  }, 
  
  // Textos adaptados
  cardProdName: { color: '#22233B', fontSize: '16px', margin: '8px 0 4px 0', fontWeight: '700' }, 
  cardProdPrice: { color: '#22233B', fontSize: '18px', fontWeight: '850', margin: '0 0 10px 0', fontFamily: 'monospace' }, 
  
  // Botón principal de la tarjeta
  buyButton: { backgroundColor: '#22233B', color: '#fff', border: 'none', width: '100%', padding: '10px', borderRadius: '10px', fontWeight: '600', cursor: 'pointer' }, 
  
  // Badges y etiquetas de stock
  alertMiniBadge: { backgroundColor: '#f2e6e6', color: '#22233B', padding: '4px 8px', borderRadius: '20px', fontSize: '11px', fontWeight: '700', display: 'block', marginBottom: '5px' }, 
  badgeIn: { backgroundColor: '#F2E9E4', color: '#22233B', padding: '4px 8px', borderRadius: '20px', fontSize: '11px', fontWeight: '700' }, 
  badgeOut: { backgroundColor: '#22233B', color: '#F2E9E4', padding: '4px 8px', borderRadius: '20px', fontSize: '11px', fontWeight: '700' }, 
  emptyText: { padding: '30px', textAlign: 'center', color: '#9A8C98', fontStyle: 'italic' } 
};