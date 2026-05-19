import React from 'react';

export default function DetalleCompra({ producto, simularCompra, volver }) {
  if (!producto) return null;

  const fotoProducto = producto.imagen || "/Logi.png";

  return (
    <div style={styles.wrapper}>
      <button onClick={volver} style={styles.backButton}>⬅️ Volver al catálogo</button>
      
      <div style={styles.cardDetails}>
        <div style={styles.imageColumn}>
          <img src={fotoProducto} alt={producto.nombre} style={styles.bigImage} />
        </div>
        
        <div style={styles.infoColumn}>
          <span style={styles.tag}>Producto Verificado</span>
          <h2 style={styles.title}>{producto.nombre}</h2>
          <p style={styles.description}>Dispositivo tecnológico de alta calidad garantizado por Fastech. Cuenta con soporte completo y compatibilidad garantizada.</p>
          
          <div style={styles.priceZone}>
            <span style={styles.priceLabel}>Precio Unitario</span>
            <span style={styles.price}>${parseFloat(producto.precio).toFixed(2)}</span>
          </div>

          <div style={styles.stockZone}>
            <span>Estado del Stock:</span>
            <span style={producto.stock > 0 ? styles.badgeIn : styles.badgeOut}>
              {producto.stock > 0 ? `${producto.stock} unidades disponibles` : 'Agotado'}
            </span>
          </div>

          {/* Al hacer clic, simula la compra y regresa al catálogo */}
          <button 
            onClick={() => { simularCompra(producto); volver(); }}
            disabled={producto.stock <= 0}
            style={{ ...styles.btnBuy, ...(producto.stock <= 0 ? styles.disabled : {}) }}
          >
            {producto.stock > 0 ? '⚡ Confirmar Compra' : 'No Disponible'}
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = { 
  wrapper: { backgroundColor: '#ffffff', borderRadius: '24px', padding: '25px', border: '1px solid #9A8C98', boxShadow: '0 12px 35px rgba(154, 140, 152, 0.12)' }, 
  backButton: { backgroundColor: 'transparent', color: '#22233B', border: 'none', fontWeight: '700', cursor: 'pointer', marginBottom: '20px', fontSize: '14px' }, 
  cardDetails: { display: 'flex', flexWrap: 'wrap', gap: '30px', alignItems: 'center' }, 
  imageColumn: { flex: '1 1 300px', height: '300px', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 8px 20px rgba(0,0,0,0.04)', backgroundColor: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '12px', boxSizing: 'border-box', border: '1px solid #F2E9E4' }, 
  bigImage: { maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }, 
  infoColumn: { flex: '1.2 1 350px', display: 'flex', flexDirection: 'column', gap: '15px' }, 
  tag: { backgroundColor: '#C9ADA7', color: '#22233B', padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: '700', alignSelf: 'flex-start' }, 
  title: { color: '#22233B', fontSize: '26px', margin: 0, fontWeight: '800' }, 
  description: { color: '#444E69', fontSize: '14px', lineHeight: '1.6', margin: 0 }, 
  priceZone: { backgroundColor: '#F2E9E4', padding: '15px', borderRadius: '14px', border: '1px solid #9A8C98' }, 
  priceLabel: { display: 'block', color: '#9A8C98', fontSize: '11px', fontWeight: '700' }, 
  price: { color: '#22233B', fontSize: '24px', fontWeight: '800', fontFamily: 'monospace' }, 
  stockZone: { display: 'flex', gap: '10px', alignItems: 'center', fontSize: '14px', color: '#444E69', fontWeight: '600' }, 
  badgeIn: { backgroundColor: '#E4E9F2', color: '#444E69', padding: '4px 10px', borderRadius: '20px', fontSize: '12px' }, 
  badgeOut: { backgroundColor: '#f2e6e6', color: '#C9ADA7', padding: '4px 10px', borderRadius: '20px', fontSize: '12px' }, 
  btnBuy: { backgroundColor: '#22233B', color: '#fff', border: 'none', padding: '15px', borderRadius: '12px', fontSize: '16px', fontWeight: '700', cursor: 'pointer', boxShadow: '0 6px 15px rgba(34,35,59,0.2)' }, 
  disabled: { backgroundColor: '#ccc', cursor: 'not-allowed', boxShadow: 'none' } 
};