import React from 'react';

export default function Navbar({ vista, setVista, esCelular, totalAlertas, totalVentas, logo }) {
  return (
    <nav style={styles.nav}>
      <div style={styles.brandZone}>
        <img src={logo} alt="Logo" style={styles.logoImg} />
        <h1 style={styles.brandTitle}>Tecnología Fastech 💻✨️</h1>
      </div>
      <div style={{ ...styles.navLinks, flexDirection: esCelular ? 'column' : 'row', width: esCelular ? '100%' : 'auto' }}>
        <button onClick={() => setVista('inventario')} style={{ ...styles.btn, backgroundColor: vista === 'inventario' ? '#444E69' : 'transparent', color: vista === 'inventario' ? '#F2E9E4' : '#C9ADA7' }}>📊 Inventario</button>
        <button onClick={() => setVista('catalogo')} style={{ ...styles.btn, backgroundColor: vista === 'catalogo' ? '#444E69' : 'transparent', color: vista === 'catalogo' ? '#F2E9E4' : '#C9ADA7' }}>🛍️ Catálogo</button>
        <button onClick={() => setVista('alertas')} style={{ ...styles.btn, backgroundColor: vista === 'alertas' ? '#444E69' : 'transparent', color: vista === 'alertas' ? '#F2E9E4' : '#C9ADA7' }}>⚠️ Alertas ({totalAlertas})</button>
        <button onClick={() => setVista('caja')} style={{ ...styles.btn, backgroundColor: vista === 'caja' ? '#444E69' : 'transparent', color: vista === 'caja' ? '#F2E9E4' : '#C9ADA7' }}>💵 Caja ({totalVentas})</button>
      </div>
    </nav>
  );
}

const styles = {
  nav: { backgroundColor: '#22233B', padding: '15px 25px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px', boxShadow: '0 4px 15px rgba(34,35,59,0.2)' },
  brandZone: { display: 'flex', alignItems: 'center', gap: '15px' }, // Un poco más de separación por el tamaño del logo
  
  // 🌟 LOGO MODIFICADO: Más grande (60px), cuadrado y con ajuste de cobertura impecable
  logoImg: { height: '60px', width: '60px', objectFit: 'cover', borderRadius: '8px' }, 
  
  brandTitle: { color: '#F2E9E4', fontSize: '19px', margin: 0, fontWeight: '800' },
  navLinks: { display: 'flex', gap: '8px' },
  btn: { padding: '10px 16px', borderRadius: '12px', border: 'none', fontWeight: '700', fontSize: '13px', cursor: 'pointer', transition: 'all 0.2s' }
};