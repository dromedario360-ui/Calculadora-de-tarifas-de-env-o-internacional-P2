import { useState, useEffect } from 'react'

const PAISES = [
  { id: 'india', nombre: 'India', bandera: '\u{1F1EE}\u{1F1F3}', tarifa: 5 },
  { id: 'us', nombre: 'Estados Unidos', bandera: '\u{1F1FA}\u{1F1F8}', tarifa: 8 },
  { id: 'uk', nombre: 'Reino Unido', bandera: '\u{1F1EC}\u{1F1E7}', tarifa: 10 },
]

function ShippingApp() {
  const [peso, setPeso] = useState('')
  const [paisSeleccionado, setPaisSeleccionado] = useState(null)
  const [resultado, setResultado] = useState(null)
  const [mostrarResultado, setMostrarResultado] = useState(false)
  const [error, setError] = useState('')
  const [montado, setMontado] = useState(false)

  useEffect(() => { setTimeout(() => setMontado(true), 100) }, [])

  const calcular = () => {
    setError('')
    setMostrarResultado(false)
    if (!peso || parseFloat(peso) <= 0 || isNaN(parseFloat(peso))) {
      setError('Ingrese un peso valido mayor a 0')
      return
    }
    if (!paisSeleccionado) {
      setError('Seleccione un pais de destino')
      return
    }
    const pais = PAISES.find(p => p.id === paisSeleccionado)
    const costoTotal = parseFloat(peso) * pais.tarifa
    setTimeout(() => {
      setResultado({ nombre: pais.nombre, bandera: pais.bandera, peso: parseFloat(peso), tarifaPorKg: pais.tarifa, costoTotal })
      setMostrarResultado(true)
    }, 400)
  }

  const nuevaConsulta = () => {
    setMostrarResultado(false)
    setTimeout(() => { setPeso(''); setPaisSeleccionado(null); setResultado(null); setError('') }, 300)
  }

  return (
    <div style={s.page}>
      <div style={s.orb1}></div>
      <div style={s.orb2}></div>
      <div style={{...s.card, opacity: montado?1:0, transform: montado?'translateY(0)':'translateY(30px)', transition:'all 0.8s cubic-bezier(0.22,1,0.36,1)'}}>
        <div style={s.header}>
          <div style={s.logoRow}>
            <div style={s.logoBox}>
              <svg width='26' height='26' viewBox='0 0 24 24' fill='none' stroke='white' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'><path d='M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z'/><polyline points='3.27 6.96 12 12.01 20.73 6.96'/><line x1='12' y1='22.08' x2='12' y2='12'/></svg>
            </div>
            <h1 style={s.title}>Calculadora de Envios</h1>
          </div>
          <div style={s.badge}>Internacional</div>
        </div>
        <div style={s.body}>
          <div style={s.section}>
            <label style={s.label}>Peso del paquete</label>
            <div style={s.inputWrap}>
              <input type='number' value={peso} onChange={e=>{setPeso(e.target.value);setError('')}} placeholder='0.00' style={s.input} min='0' step='0.1'/>
              <span style={s.unit}>KG</span>
            </div>
          </div>
          <div style={s.section}>
            <label style={s.label}>Pais de destino</label>
            <div style={s.grid}>
              {PAISES.map(p=>(
                <button key={p.id} onClick={()=>{setPaisSeleccionado(p.id);setError('')}} style={{...s.countryBtn,...(paisSeleccionado===p.id?s.countryBtnOn:{})}}>
                  <span style={{fontSize:32}}>{p.bandera}</span>
                  <span style={{fontSize:12,fontWeight:600}}>{p.nombre}</span>
                  <span style={{fontSize:13,fontFamily:'monospace',fontWeight:700,color:paisSeleccionado===p.id?'#818cf8':'#64748b'}}>{p.tarifa} USD/kg</span>
                </button>
              ))}
            </div>
          </div>
          {error && <div style={s.err}>{error}</div>}
          <button onClick={calcular} style={s.calcBtn}>Calcular tarifa</button>
          {mostrarResultado && resultado && (
            <div style={s.resultCard}>
              <div style={{display:'flex',alignItems:'center',gap:14}}>
                <span style={{fontSize:40}}>{resultado.bandera}</span>
                <div>
                  <div style={{fontSize:18,fontWeight:700,color:'#f1f5f9'}}>{resultado.nombre}</div>
                  <div style={{fontSize:12,color:'#64748b',fontFamily:'monospace'}}>Envio internacional</div>
                </div>
              </div>
              <div style={s.divider}></div>
              <div style={{display:'flex',justifyContent:'space-between',marginBottom:8}}>
                <span style={{fontSize:13,color:'#94a3b8'}}>Peso</span>
                <span style={{fontSize:14,color:'#e2e8f0',fontWeight:600,fontFamily:'monospace'}}>{resultado.peso} kg</span>
              </div>
              <div style={{display:'flex',justifyContent:'space-between'}}>
                <span style={{fontSize:13,color:'#94a3b8'}}>Tarifa por kg</span>
                <span style={{fontSize:14,color:'#e2e8f0',fontWeight:600,fontFamily:'monospace'}}>{resultado.tarifaPorKg} USD</span>
              </div>
              <div style={s.divider}></div>
              <div style={s.totalBox}>
                <span style={{fontSize:12,fontWeight:700,color:'#94a3b8',letterSpacing:1.5}}>COSTO TOTAL</span>
                <span style={{fontSize:24,fontWeight:700,color:'#a5b4fc',fontFamily:'monospace'}}>{resultado.costoTotal.toFixed(2)} USD</span>
              </div>
              <button onClick={nuevaConsulta} style={s.resetBtn}>Nueva consulta</button>
            </div>
          )}
        </div>
      </div>
      <style>{'@import url(https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&display=swap);*{margin:0;padding:0;box-sizing:border-box}@keyframes f1{0%,100%{transform:translate(0,0)}50%{transform:translate(30px,-30px)}}@keyframes f2{0%,100%{transform:translate(0,0)}50%{transform:translate(-40px,20px)}}input[type=number]::-webkit-inner-spin-button,input[type=number]::-webkit-outer-spin-button{-webkit-appearance:none}input[type=number]{-moz-appearance:textfield}'}</style>
    </div>
  )
}

const s = {
  page:{minHeight:'100vh',background:'linear-gradient(135deg,#0a0a0f,#1a1a2e 40%,#16213e 70%,#0f3460)',display:'flex',justifyContent:'center',alignItems:'center',padding:20,fontFamily:'DM Sans,sans-serif',position:'relative',overflow:'hidden'},
  orb1:{position:'fixed',top:'-10%',left:'-10%',width:500,height:500,borderRadius:'50%',background:'radial-gradient(circle,rgba(99,102,241,0.15),transparent 70%)',animation:'f1 12s ease-in-out infinite',pointerEvents:'none'},
  orb2:{position:'fixed',bottom:'-15%',right:'-5%',width:600,height:600,borderRadius:'50%',background:'radial-gradient(circle,rgba(236,72,153,0.12),transparent 70%)',animation:'f2 15s ease-in-out infinite',pointerEvents:'none'},
  card:{width:'100%',maxWidth:520,background:'rgba(255,255,255,0.04)',backdropFilter:'blur(40px)',WebkitBackdropFilter:'blur(40px)',borderRadius:24,border:'1px solid rgba(255,255,255,0.08)',boxShadow:'0 8px 32px rgba(0,0,0,0.4)',position:'relative',zIndex:1,overflow:'hidden'},
  header:{padding:'28px 32px 20px',display:'flex',justifyContent:'space-between',alignItems:'center',borderBottom:'1px solid rgba(255,255,255,0.06)'},
  logoRow:{display:'flex',alignItems:'center',gap:14},
  logoBox:{width:48,height:48,borderRadius:14,background:'linear-gradient(135deg,#6366f1,#8b5cf6)',display:'flex',alignItems:'center',justifyContent:'center',boxShadow:'0 4px 15px rgba(99,102,241,0.4)'},
  title:{fontSize:18,fontWeight:700,color:'#f1f5f9',letterSpacing:'-0.3px'},
  badge:{padding:'6px 14px',borderRadius:20,background:'linear-gradient(135deg,rgba(34,211,238,0.15),rgba(99,102,241,0.15))',color:'#22d3ee',fontSize:11,fontWeight:600,letterSpacing:0.8,textTransform:'uppercase',border:'1px solid rgba(34,211,238,0.2)'},
  body:{padding:'28px 32px'},
  section:{marginBottom:24},
  label:{display:'flex',alignItems:'center',gap:8,fontSize:13,fontWeight:600,color:'#94a3b8',marginBottom:10,textTransform:'uppercase',letterSpacing:0.8},
  inputWrap:{position:'relative',display:'flex',alignItems:'center'},
  input:{width:'100%',padding:'16px 60px 16px 20px',borderRadius:14,border:'1px solid rgba(255,255,255,0.1)',background:'rgba(255,255,255,0.05)',color:'#f1f5f9',fontSize:22,fontWeight:600,fontFamily:'Space Mono,monospace',outline:'none'},
  unit:{position:'absolute',right:20,color:'#6366f1',fontSize:14,fontWeight:700,fontFamily:'Space Mono,monospace'},
  grid:{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:10},
  countryBtn:{display:'flex',flexDirection:'column',alignItems:'center',gap:6,padding:'18px 10px',borderRadius:16,border:'1px solid rgba(255,255,255,0.08)',background:'rgba(255,255,255,0.03)',cursor:'pointer',transition:'all 0.3s ease',outline:'none',color:'#cbd5e1',fontFamily:'DM Sans,sans-serif'},
  countryBtnOn:{background:'rgba(99,102,241,0.15)',border:'1px solid rgba(99,102,241,0.5)',boxShadow:'0 0 20px rgba(99,102,241,0.2)',transform:'translateY(-2px)'},
  err:{display:'flex',alignItems:'center',gap:8,padding:'12px 16px',borderRadius:12,background:'rgba(239,68,68,0.1)',border:'1px solid rgba(239,68,68,0.2)',color:'#fca5a5',fontSize:13,fontWeight:500,marginBottom:20},
  calcBtn:{width:'100%',padding:16,borderRadius:14,border:'none',background:'linear-gradient(135deg,#6366f1,#8b5cf6)',color:'white',fontSize:15,fontWeight:700,fontFamily:'DM Sans,sans-serif',cursor:'pointer',boxShadow:'0 4px 20px rgba(99,102,241,0.4)'},
  resultCard:{marginTop:24,padding:24,borderRadius:18,background:'linear-gradient(145deg,rgba(99,102,241,0.08),rgba(139,92,246,0.05))',border:'1px solid rgba(99,102,241,0.15)'},
  divider:{height:1,background:'rgba(255,255,255,0.06)',margin:'18px 0'},
  totalBox:{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'16px 20px',borderRadius:12,background:'rgba(99,102,241,0.12)'},
  resetBtn:{width:'100%',marginTop:16,padding:12,borderRadius:12,border:'1px solid rgba(255,255,255,0.1)',background:'rgba(255,255,255,0.05)',color:'#94a3b8',fontSize:13,fontWeight:600,fontFamily:'DM Sans,sans-serif',cursor:'pointer'},
}

export default ShippingApp

