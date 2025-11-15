import { useNavigate } from 'react-router-dom'

export default function Welcome() {
  const navigate = useNavigate()
  return (
    <div style={{
      minHeight: '100vh',
      width: '100vw',
      background: `
        linear-gradient(rgba(25,25,25,0.65), rgba(15,15,15,0.89)),
        url("/images/working.jpg") center/cover no-repeat
      `,
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      color: '#fff'
    }}>
      <img src="/images/logo.png" alt="Barbearia Império logo" style={{ width: 120, marginBottom: 8, boxShadow: "0 6px 32px #0007" }} />
      <h1 style={{ fontFamily: 'Bebas Neue, Montserrat, sans-serif', fontSize: 52, color: '#FFD700', letterSpacing: 2 }}>
        Barbearia Império
      </h1>
      <p style={{
        fontSize: 30, fontWeight: 400, maxWidth: 340, textAlign: 'center',
        background: 'rgba(0,0,0,.5)', padding: 18, borderRadius: 15, marginBottom: 16
      }}>
        Seu estilo começa aqui!<br />  
      </p>
      <button onClick={() => navigate('/servico')}
        style={{
          padding: '16px 40px', fontSize: 25, borderRadius: '100px', background: '#FFD700', color: '#191919',
          border: 'none', boxShadow: '0 8px 32px #0003', cursor: 'pointer', fontWeight: 700,
        }}>
        Agendar Horário
      </button>
    </div>
  )
}
