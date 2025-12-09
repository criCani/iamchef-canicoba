import { useState } from 'react'
import { useNavigate } from 'react-router'
import useApiKeyStore from '../store/useApiKeyStore'
import useModeStore, { type DataMode } from '../store/useModeStore'
import '../styles/IntroPage.css'

/**
 * IntroPage - Configurazione iniziale applicazione
 * 
 * Utilizzo React Router:
 * - useNavigate: navigazione programmatica verso home dopo salvataggio
 * - Replace: usa replace per evitare di tornare a intro con back button
 * 
 * Questa pagina permette di:
 * - Scegliere modalità API (con chiave Spoonacular) o Mock (dati demo)
 * - Salvare configurazione in localStorage tramite Zustand
 * - Navigare automaticamente alla home dopo configurazione
 */

const IntroPage = () => {
  const navigate = useNavigate()
  const apiKey = useApiKeyStore((s) => s.apiKey) ?? ''
  const setApiKey = useApiKeyStore((s) => s.setApiKey)
  const mode = useModeStore((s) => s.mode)
  const setMode = useModeStore((s) => s.setMode)
  
  const [value, setValue] = useState<string>(apiKey)
  const [selectedMode, setSelectedMode] = useState<DataMode>(mode)

  const handleSave = () => {
    // Se modalità API è selezionata, richiede API key
    if (selectedMode === 'api' && !value) return
    
    if (selectedMode === 'api') {
      setApiKey(value)
    }
    setMode(selectedMode)
    
    // Naviga alla home con replace (evita tornare a intro con back button)
    navigate('/', { replace: true })
  }

  const handleModeChange = (newMode: DataMode) => {
    setSelectedMode(newMode)
  }

  return (
    <div className="intro-page-page">
      <div className="intro-page-card">
        <div className="intro-page-container">
          <h2 className="intro-page-title">Welcome to iChef</h2>
          <p className="intro-page-subtitle">
            Choose how you want to use the app:
          </p>
          
          <div className="intro-page-mode-selector">
            <button
              className={`intro-page-mode-button ${selectedMode === 'api' ? 'active' : ''}`}
              onClick={() => handleModeChange('api')}
            >
              <div className="mode-button-content">
                <span className="mode-icon">🌐</span>
                <span className="mode-title">Use API</span>
                <span className="mode-description">Real data from Spoonacular</span>
              </div>
            </button>
            
            <button
              className={`intro-page-mode-button ${selectedMode === 'mock' ? 'active' : ''}`}
              onClick={() => handleModeChange('mock')}
            >
              <div className="mode-button-content">
                <span className="mode-icon">🎭</span>
                <span className="mode-title">Use Mock Data</span>
                <span className="mode-description">Pre-loaded demo data</span>
              </div>
            </button>
          </div>

          {selectedMode === 'api' && (
            <div className="intro-page-api-section">
              <p className="intro-page-api-note">
                Insert your Spoonacular API key, it will be saved locally in your browser.
              </p>
              <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="API key"
                className="intro-page-input"
              />
            </div>
          )}
          
          <div className="intro-page-buttons">
            <button 
              onClick={handleSave} 
              className="intro-page-save-button"
              disabled={selectedMode === 'api' && !value}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default IntroPage
