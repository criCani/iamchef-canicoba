import useModeStore from '../store/useModeStore';
import '../styles/Header.css';

type HeaderProps = {
  onSettingsClick?: () => void;
};

const Header = ({ onSettingsClick }: HeaderProps) => {
  const mode = useModeStore((s) => s.mode);

  return (
    <header className="header">
      <div className="header__container">
        <div className="header__logo">
          <img src="/logo.png" alt="iChef Logo" className="header__logo-img" />
          <span className="header__title">iChef</span>
        </div>
        
        <div className="header__right">
          <div className="header__mode">
            <span className="header__mode-icon">{mode === 'mock' ? '🍳' : '🌐'}</span>
            <span className="header__mode-label">{mode === 'mock' ? 'Mock' : 'API'}</span>
          </div>
          
          {onSettingsClick && (
            <button onClick={onSettingsClick} title="Impostazioni" className="header__settings-btn">
              <span role="img" aria-label="settings">⚙️</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;