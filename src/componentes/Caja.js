import React from 'react';

export default function Caja({ ventas, esCelular }) {
  // Asegura que lea la lista simulada que le pasamos desde App.js
  const listaVentas = Array.isArray(ventas) ? ventas : [];
  const totalCaja = listaVentas.reduce((acc, v) => acc + Number(v.precio || 0), 0);

  return (
    <div style={styles.wrapper}>
      <div style={{ ...styles.header, flexDirection: esCelular ? 'column' : 'row', gap: '15px', alignItems: esCelular ? 'stretch' : 'center' }}>
        <h2 style={styles.title}>💵 Control de Caja e Ingresos</h2>
        <div style={styles.totalRevenueBox}>
          <span style={{ fontSize: '11px', fontWeight: '700' }}>TOTAL RECAUDADO</span>
          <span style={{ fontSize: '20px', fontWeight: '800' }}>${totalCaja.toFixed(2)}</span>
        </div>
      </div>
      
      <p style={{ color: '#7a6f66', marginBottom: '20px' }}>Bitácora de ventas procesadas en tiempo real:</p>
      
      <div style={{ overflowX: 'auto', width: '100%' }}>
        <div style={styles.tableCard}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Hora de Venta</th>
                <th style={styles.th}>Artículo Vendido</th>
                <th style={styles.th}>Monto Percibido</th>
              </tr>
            </thead>
            <tbody>
              {listaVentas.length === 0 ? (
                <tr>
                  <td colSpan="3" style={styles.emptyText}>No se han registrado ventas en esta sesión todavía.</td>
                </tr>
              ) : (
                listaVentas.map((v, index) => (
                  <tr key={v.idVenta || index} style={styles.tr}>
                    <td style={{ ...styles.td, fontFamily: 'monospace', fontWeight: '600', color: '#311b92' }}>⏱️ {v.hora}</td>
                    <td style={styles.tdName}>{v.nombre}</td>
                    <td style={{ ...styles.tdPrice, color: '#2e7d32' }}>+${parseFloat(v.precio).toFixed(2)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const styles = {
  wrapper: { backgroundColor: '#faf6f0', borderRadius: '20px', padding: '20px', boxShadow: '0 12px 35px rgba(194, 176, 163, 0.18)', border: '1px solid #dfd5cc' },
  header: { display: 'flex', justifyContent: 'space-between' },
  title: { color: '#1b1c33', margin: 0, fontSize: '20px', fontWeight: '750' },
  totalRevenueBox: { backgroundColor: '#e8f5e9', color: '#2e7d32', padding: '8px 16px', borderRadius: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', border: '1px solid #a5d6a7' },
  tableCard: { backgroundColor: '#faf6f0', borderRadius: '20px', overflow: 'hidden', border: '1px solid #dfd5cc' },
  table: { width: '100%', borderCollapse: 'collapse', fontSize: '14px', minWidth: '500px' },
  th: { backgroundColor: '#f5efe8', color: '#1b1c33', padding: '14px 18px', fontWeight: '750', borderBottom: '2px solid #dfd5cc', textAlign: 'left' },
  tr: { borderBottom: '1px solid #dfd5cc' },
  td: { padding: '14px 18px', color: '#524b44' },
  tdName: { padding: '14px 18px', color: '#1b1c33', fontWeight: '600' },
  tdPrice: { padding: '14px 18px', color: '#1b1c33', fontWeight: '700', fontFamily: 'monospace' },
  emptyText: { padding: '30px', textAlign: 'center', color: '#7a6f66', fontStyle: 'italic' }
};