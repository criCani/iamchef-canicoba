import useModeStore from '../store/useModeStore';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/layout/AppHeader.css';

type AppHeaderProps = {
  onSettingsClick?: () => void;
};

const AppHeader = ({ onSettingsClick }: AppHeaderProps) => {
  const mode = useModeStore((s) => s.mode);
  const navigate = useNavigate();
  const location = useLocation();

  const isIntroPage = location.pathname === '/intro';

  const handleLogoClick = () => {
    if (!isIntroPage) {
      navigate('/');
    }
  };

  return (
    <header className="header">
      <div className="header__container">
        <button
          type="button"
          onClick={handleLogoClick}
          disabled={isIntroPage}
          className="header__logo"
          title={isIntroPage ? "Completa la configurazione per tornare alla home" : "Vai alla home"}
        >
          <img src="/logo.png" alt="iChef Logo" className="header__logo-img" />
          <span className="header__title">iChef</span>
        </button>
        
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

export default AppHeader;