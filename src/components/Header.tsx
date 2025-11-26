import useModeStore from '../store/useModeStore'
import '../styles/Header.css'

type HeaderProps = {
  onSettingsClick?: () => void
}

const Header = ({ onSettingsClick }: HeaderProps) => {
  const mode = useModeStore((s) => s.mode)

  return (
    <header className="app-header">
      <div className="header-content">
        <div className="header-logo">
          <img src="/logo.png" alt="iChef Logo" className="logo-icon" />
          <span className="logo-text">iChef</span>
        </div>
        
        <div className="header-actions">
          <div className="mode-badge">
            <span className="mode-badge-icon">{mode === 'mock' ? '🎭' : '🌐'}</span>
            <span className="mode-badge-text">{mode === 'mock' ? 'Mock' : 'API'}</span>
          </div>
          
          {onSettingsClick && (
            <button onClick={onSettingsClick} className="settings-button" title="Settings">
              ⚙️
            </button>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header