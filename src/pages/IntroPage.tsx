import { useState } from 'react'
import useApiKeyStore from '../store/useApiKeyStore'
import '../styles/IntroPage.css';

type IntroPageProps = {
  onSaved?: () => void
}

// Pagina iniziale: raccoglie la chiave API e la persiste via zustand/localStorage.
// Permette configurazione runtime evitando rebuild quando cambia la chiave.
const IntroPage = ({ onSaved }: IntroPageProps) => {
  const apiKey = useApiKeyStore((s) => s.apiKey) ?? ''
  const setApiKey = useApiKeyStore((s) => s.setApiKey)
  const [value, setValue] = useState<string>(apiKey)

  const handleSave = () => {
    if (!value) return
    setApiKey(value)
    onSaved?.()
  }

  return (
    <div className="intro-page-container">
      <h2 className="intro-page-title">Insert here your API key</h2>
      <p className="intro-page-subtitle">The API key will be saved locally in your browser.</p>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Spoonacular API key"
        className="intro-page-input"
      />
      <div className="intro-page-buttons">
        <button onClick={handleSave} className="intro-page-save-button">Salva</button>
      </div>
    </div>
  )
}

export default IntroPage
