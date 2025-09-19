
import { h } from 'preact';
import { useState } from 'preact/hooks';
import './style.css';

const companyAddress = '6949 Low Bid Ln, San Antonio, TX 78250';

const northLots = Array.from({ length: 12 }, (_, i) => `n${i + 1}`);
const westLots = Array.from({ length: 6 }, (_, i) => `w${i + 13}`);

export function CompanyMap() {
  // Tabla de búsqueda
  const [search, setSearch] = useState('');
  const allLots = [
    ...northLots.map(lot => ({ area: 'Norte', lot })),
    ...westLots.map(lot => ({ area: 'Oeste', lot }))
  ];
  const filteredLots = allLots.filter(l =>
    l.lot.toLowerCase().includes(search.toLowerCase()) || l.area.toLowerCase().includes(search.toLowerCase())
  );

  // Punto de referencia (coordenadas de la empresa)
  const refX = 50; // % horizontal (centrado)
  const refY = 50; // % vertical (centrado)

  return (
    <div class="company-map-page">
      <h1>Mapa de la Empresa</h1>
      <p><strong>Dirección:</strong> {companyAddress}</p>
      <div class="map-container" style={{marginBottom:'2em', position:'relative'}}>
        <iframe
          title="Mapa Empresa"
          width="100%"
          height="300"
          frameBorder="0"
          src="https://www.openstreetmap.org/export/embed.html?bbox=-98.655,29.505,-98.646,29.511&layer=mapnik"
          style="border:1px solid black; margin-top:1em; position:relative; zIndex:1;"
        ></iframe>
        {/* Punto de referencia visual */}
        <div
          class="map-dot"
          style={{
            left: refX + '%',
            top: refY + '%',
            background: '#2d8cff',
            border: '2px solid #fff',
            zIndex: 2,
            position: 'absolute',
            width: '20px',
            height: '20px',
            transform: 'translate(-50%, -50%)',
            boxShadow: '0 0 8px #2d8cff88'
          }}
          title="Referencia: Empresa"
        ></div>
      </div>

      <h2>Buscar Lote</h2>
      <input
        type="text"
        placeholder="Buscar por número o área..."
        value={search}
  onInput={e => setSearch(e.currentTarget.value)}
        style={{marginBottom:'1em', padding:'0.5em', width:'100%', maxWidth:'300px'}}
      />
      <table style={{width:'100%', maxWidth:'400px', marginBottom:'2em'}}>
        <thead>
          <tr>
            <th>Área</th>
            <th>Lote</th>
          </tr>
        </thead>
        <tbody>
          {filteredLots.map(l => (
            <tr key={l.area + l.lot}>
              <td>{l.area}</td>
              <td>{l.lot}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>División de Lotes</h2>
      <div class="lot-areas">
        <div class="lot-area">
          <h3>Área Norte</h3>
          <div class="lots-grid">
            {northLots.map(lot => (
              <div class="lot-box" key={lot}>
                <div class="lot-label">{lot}</div>
                <div class="lot-parts">
                  {['left', 'center', 'right'].map((side, idx) => (
                    <div class={`lot-part ${side}`} key={side}>
                      <div class="lot-subparts">
                        {['A', 'B', 'C'].map(sub => (
                          <div class="lot-subpart" key={sub}>
                            {/* Aquí se pueden apilar hasta 15 piezas visualmente */}
                            <div class="stack">
                              {Array.from({ length: 0 }).map((_, i) => (
                                <div class="piece" key={i}></div>
                              ))}
                            </div>
                            <span class="sub-label">{sub}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div class="lot-area">
          <h3>Área Oeste</h3>
          <div class="lots-grid">
            {westLots.map(lot => (
              <div class="lot-box" key={lot}>
                <div class="lot-label">{lot}</div>
                <div class="lot-parts">
                  <div class="lot-part left"></div>
                  <div class="lot-part center"></div>
                  <div class="lot-part right"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
