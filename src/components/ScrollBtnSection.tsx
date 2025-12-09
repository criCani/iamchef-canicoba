import ScrollBtn from "./ScrollBtn";
import '../styles/ScrollBtnSection.css';

type ScrollBtnSectionProps = {
  currentIndex: number;
  maxIndex: number;
  setCurrentIndex: (index: number) => void;
  goToHomepage: () => void;
};

export function ScrollBtnSection({ currentIndex, setCurrentIndex, maxIndex, goToHomepage }: ScrollBtnSectionProps) {
  return (
    <div className="scroll-btn-section">
      <ScrollBtn 
        currentIndex={currentIndex}
        isIncrement={false}
        maxIndex={maxIndex}
        onClick={setCurrentIndex}
      />

      <button 
        className="scroll-btn-section__home"
        onClick={goToHomepage}
        title="Torna alla home"
      >
        <span className="scroll-btn-section__home-icon">🏠</span>
        <span className="scroll-btn-section__home-text">Home</span>
      </button>
      
      <ScrollBtn 
        currentIndex={currentIndex}
        isIncrement={true}
        maxIndex={maxIndex}
        onClick={setCurrentIndex}
      />
    </div>
  );
}
