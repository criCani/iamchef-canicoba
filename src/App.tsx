import { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router'
import useModeStore from './store/useModeStore'
import useApiKeyStore from './store/useApiKeyStore'
import Layout from './components/Layout'
import Header from './components/Header'
import Footer from './components/Footer'

/**
 * App - Componente principale con logica di configurazione
 * 
 * Responsabilità:
 * 1. Verifica configurazione iniziale (mode + apiKey)
 * 2. Redirect a /intro se manca configurazione
 * 3. Gestione click su pulsante impostazioni
 * 4. Wrapping del layout presentazionale
 * 
 * Utilizza <Outlet /> per renderizzare le rotte figlie definite in router.tsx
 */

function App() {
  const location = useLocation()
  const navigate = useNavigate()
  const mode = useModeStore((s) => s.mode)
  const apiKey = useApiKeyStore((s) => s.apiKey)

  // Verifica configurazione iniziale e redirect a /intro se necessario
  useEffect(() => {
    // Non controllare se siamo già sulla pagina intro
    if (location.pathname === '/intro') {
      return
    }

    // Se non c'è modalità salvata, vai a intro
    if (!mode) {
      navigate('/intro', { replace: true })
      return
    }

    // Se modalità è API ma manca la chiave, vai a intro
    if (mode === 'api' && !apiKey) {
      navigate('/intro', { replace: true })
    }
  }, [mode, apiKey, location.pathname, navigate])

  // Handler per click su impostazioni nel Header
  const handleSettingsClick = () => {
    navigate('/intro')
  }

  // Nascondi pulsante impostazioni se siamo già sulla pagina intro
  const showSettingsButton = location.pathname !== '/intro'

  return (
    <Layout
      header={
        <Header 
          onSettingsClick={showSettingsButton ? handleSettingsClick : undefined} 
        />
      }
      main={<Outlet />}
      footer={<Footer />}
    />
  )
}

export default App
