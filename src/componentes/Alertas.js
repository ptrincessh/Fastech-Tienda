import React from 'react';

export default function Alertas({ productos, esCelular }) {
  const productosAlerta = productos.filter(p => p.stock <= 3);

  return (
    <div style={styles.wrapper}>
      <h2 style={styles.title}>⚠️ Módulo de Control de Abastecimiento</h2>
      <p style={{ color: '#9A8C98', marginBottom: '20px', fontSize: '14px' }}>Productos críticos con stock igual o inferior a 3 unidades:</p>
      <div style={{ ...styles.grid, gridTemplateColumns: esCelular ? '1fr' : 'repeat(auto-fill, minmax(220px, 1fr))' }}>
        {productosAlerta.length === 0 ? (
          <p style={styles.emptyText}>✅ Todo excelente. Ningún producto requiere reabastecimiento crítico.</p>
        ) : (
          productosAlerta.map((p, index) => (
            <div key={p.id || index} style={styles.card}>
              <div style={{ fontSize: '32px', marginBottom: '8px' }}>🚨</div>
              <h4 style={styles.name}>{p.nombre}</h4>
              <p style={styles.stockText}>Stock actual: {p.stock} uds</p>
              <p style={{ fontSize: '12px', color: '#444E69', margin: 0, fontWeight: '500' }}>Se sugiere contactar proveedor inmediatamente.</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const styles = {
  wrapper: { 
    backgroundColor: '#ffffff', 
    borderRadius: '20px', 
    padding: '20px', 
    boxShadow: '0 12px 35px rgba(154, 140, 152, 0.12)', 
    border: '1px solid #9A8C98' 
  },
  title: { 
    color: '#22233B', 
    margin: 0, 
    fontSize: '20px', 
    fontWeight: '750' 
  },
  grid: { 
    display: 'grid', 
    gap: '20px' 
  },
  card: { 
    backgroundColor: '#F2E9E4', 
    borderRadius: '16px', 
    padding: '18px', 
    textAlign: 'center', 
    border: '1px solid #C9ADA7', // Borde suave usando el color arena/rosa viejo
    boxShadow: '0 4px 15px rgba(0,0,0,0.02)'
  },
  name: { 
    color: '#22233B', 
    fontSize: '16px', 
    margin: '8px 0 4px 0', 
    fontWeight: '700' 
  },
  stockText: { 
    color: '#444E69', 
    fontSize: '16px', 
    fontWeight: '800', 
    margin: '0 0 10px 0',
    fontFamily: 'monospace'
  },
  emptyText: { 
    padding: '30px', 
    textAlign: 'center', 
    color: '#9A8C98', 
    fontStyle: 'italic',
    fontWeight: '500'
  }
};