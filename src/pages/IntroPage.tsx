import { useState } from 'react';
import { useNavigate } from 'react-router';
import useApiKeyStore from '../store/useApiKeyStore';
import useModeStore, { type DataMode } from '../store/useModeStore';
import '../styles/IntroPage.css';

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
  const navigate = useNavigate();
  const apiKey = useApiKeyStore((s) => s.apiKey) ?? '';
  const setApiKey = useApiKeyStore((s) => s.setApiKey);
  const mode = useModeStore((s) => s.mode);
  const setMode = useModeStore((s) => s.setMode);
  
  const [value, setValue] = useState<string>(apiKey);
  const [selectedMode, setSelectedMode] = useState<DataMode>(mode);

  const handleSave = () => {
    // Se modalità API è selezionata, richiede API key
    if (selectedMode === 'api' && !value) return;
    
    if (selectedMode === 'api') {
      setApiKey(value);
    }
    setMode(selectedMode);
    
    // Naviga alla home con replace (evita tornare a intro con back button)
    navigate('/', { replace: true });
  };

  const handleModeChange = (newMode: DataMode) => {
    setSelectedMode(newMode);
  };

  return (
    <div className="intro-page">
      <div className="intro-page__container">
        <div className="intro-page__card">
          <div className="intro-page__hero">
            <span className="intro-page__hero-icon">🍳</span>
            <h1 className="intro-page__title">Benvenuto in iChef</h1>
            <p className="intro-page__subtitle">
              Scegli come vuoi utilizzare l'app:
            </p>
          </div>
          
          <div className="intro-page__modes">
            <button
              className={`intro-page__mode-btn ${
                selectedMode === 'api' ? 'intro-page__mode-btn--active' : ''
              }`}
              onClick={() => handleModeChange('api')}
            >
              <div className="intro-page__mode-content">
                <span className="intro-page__mode-icon">🌐</span>
                <span className="intro-page__mode-title">Usa API</span>
                <span className="intro-page__mode-desc">Dati reali da Spoonacular</span>
              </div>
            </button>
            
            <button
              className={`intro-page__mode-btn ${
                selectedMode === 'mock' ? 'intro-page__mode-btn--active' : ''
              }`}
              onClick={() => handleModeChange('mock')}
            >
              <div className="intro-page__mode-content">
                <span className="intro-page__mode-icon">🍳</span>
                <span className="intro-page__mode-title">Usa Dati Demo</span>
                <span className="intro-page__mode-desc">Dati di esempio pre-caricati</span>
              </div>
            </button>
          </div>

          {selectedMode === 'api' && (
            <div className="intro-page__api-input">
              <p className="intro-page__api-label">
                Inserisci la tua chiave API di Spoonacular, verrà salvata localmente nel tuo browser.
              </p>
              <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="API key"
                className="intro-page__input"
              />
            </div>
          )}
          
          <div className="intro-page__actions">
            <button 
              onClick={handleSave} 
              className="intro-page__continue-btn"
              disabled={selectedMode === 'api' && !value}
            >
              Continua
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntroPage;
