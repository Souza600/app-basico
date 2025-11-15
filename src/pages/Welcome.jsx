import { useNavigate } from 'react-router-dom'

function PlaceholderLogo({ size = 82, style }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        background: '#58617a',
        borderRadius: 18,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 18,
        boxShadow: '0 2px 16px #0a0a15',
        ...style
      }}
    >
      <span style={{
        color: '#fff',
        fontWeight: 900,
        fontSize: 17,
        textAlign: 'center',
        letterSpacing: 0.5,
        padding: '2px 6px'
      }}>
        Sua<br />logomarca<br />aqui
      </span>
    </div>
  )
}

function StarIcon({ size = 19, color = "#FFD700", style }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill={color} style={style}>
      <polygon points="10,1 12.3,7.1 19,7.4 13.6,11.6 15.5,18 10,14.2 4.5,18 6.4,11.6 1,7.4 7.7,7.1" />
    </svg>
  )
}

// SVGs simples para redes
function InstagramIcon({ size = 22, color = "#FFD700" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 30 30" fill="none">
      <rect x="5" y="5" width="20" height="20" rx="6" stroke={color} strokeWidth="2" />
      <circle cx="15" cy="15" r="5" stroke={color} strokeWidth="2" />
      <circle cx="21.25" cy="8.75" r="1.4" fill={color} />
    </svg>
  )
}
function WhatsAppIcon({ size = 22, color = "#46df9c" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 30 30" fill="none">
      <circle cx="15" cy="15" r="13" stroke={color} strokeWidth="2" />
      <path d="M10.6 12.7a7.3 7.3 0 0010 7.3l1.4 1.3" stroke={color} strokeWidth="2" fill="none" />
      <path d="M12.6 18c2 1.2 3.3 1.6 5.1-1.2" stroke={color} strokeWidth="2" fill="none" />
    </svg>
  );
}

export default function Welcome() {
  const navigate = useNavigate()
  return (
    <div className="mobile-container" style={{
      paddingTop: 60,
      minHeight: '100vh',
      background: 'var(--background-main)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
    }}>
      <PlaceholderLogo />
      <h1 className="titulo-grande" style={{ fontWeight: 800, marginBottom: 22 }}>
        Barbearia Império
      </h1>
      <div style={{
        display: 'flex', alignItems: 'center', marginBottom: 24, background: '#232d48', borderRadius: 9, padding: '7px 15px'
      }}>
        <StarIcon size={21} />
        <span style={{
          color: '#FFF',
          fontWeight: 700,
          fontSize: 18,
          marginLeft: 12,
          letterSpacing: 1.5
        }}>
          Seu estilo começa aqui!
        </span>
        <StarIcon size={21} style={{ marginLeft: 10 }} />
      </div>
      <div style={{
        margin: '10px 0 36px 0',
        color: 'var(--accent)',
        fontSize: 17,
        fontWeight: 700,
        textAlign: 'center'
      }}>
        Agende seu corte ou barba com os melhores profissionais do bairro.
      </div>
      <button
        onClick={() => navigate('/servico')}
        style={{
          background: 'var(--accent)',
          color: 'var(--primary)',
          border: 'none',
          borderRadius: 8,
          fontWeight: 800,
          fontSize: 18,
          padding: '12px 36px',
          boxShadow: '0 2px 12px #0002',
          marginTop: 30,
          cursor: 'pointer',
          transition: 'background 0.16s'
        }}
      >
        Começar
      </button>
      <div style={{
        marginTop: 30, color: '#8fa0ba', fontSize: 14, textAlign: 'center', maxWidth: 330
      }}>
        <b>Observação:</b> Seu logotipo personalizado pode ser exibido no quadrado acima do slogan, trazendo mais identidade visual à sua barbearia.
      </div>

      {/* Rodapé */}
      <footer style={{
        marginTop: 60,
        background: '#232d48',
        borderRadius: 10,
        boxShadow: '0 1px 14px #0005',
        padding: '20px 14px 18px 14px',
        width: '100%',
        maxWidth: 410,
        color: '#fff',
        textAlign: 'center'
      }}>
        <div style={{ fontWeight: 800, fontSize: 17, marginBottom: 8 }}>
          Barbearia Império
        </div>
        <div style={{ marginBottom: 8, color: '#FFD700', fontSize: 15, fontWeight: 700 }}>
          Aberto: Seg a Sáb 09:00 - 19:00
        </div>
        <div style={{ marginBottom: 7 }}>
          Rua dos Alfaiates, 200<br />
          Bairro Centro, Cidade Exemplo - SP
        </div>
        <div style={{ marginBottom: 9 }}>
          <a href="https://instagram.com/barbeariaimperio" target="_blank" rel="noopener noreferrer" style={{ color: '#FFD700', margin: '0 10px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>
            <InstagramIcon /> Instagram
          </a>
          <a href="https://wa.me/5599999999999" target="_blank" rel="noopener noreferrer" style={{ color: '#46df9c', margin: '0 10px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>
            <WhatsAppIcon /> WhatsApp
          </a>
        </div>
        <div style={{ color: '#cfd9e5', fontSize: 13, marginTop: 4 }}>
          © {new Date().getFullYear()} Barbearia Império – Todos os direitos reservados
        </div>
      </footer>
    </div>
  )
}
