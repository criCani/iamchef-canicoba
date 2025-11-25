import ScrollBtn from "./ScrollBtn"
import '../styles/ScrollBtn.css';

type ScrollBtnSectionProps = {
  currentIndex: number
  maxIndex: number
  setCurrentIndex: (index: number) => void
  goToHomepage: () => void
}

export function ScrollBtnSection({ currentIndex, setCurrentIndex, maxIndex, goToHomepage }: ScrollBtnSectionProps) {

  return (
    <div className="scroll-btn-section">

          <ScrollBtn 
            currentIndex={currentIndex}
            isIncrement={false}
            maxIndex={maxIndex}
            onClick={setCurrentIndex}
            cursor={currentIndex == 0 ? "cursor-default" : "cursor-pointer"}
            opacity={currentIndex == 0 ? "opacity-50" : "opacity-100"}
          />

        <div 
          className="scroll-btn-logo-container"
          onClick={goToHomepage}
        >
          🏠
        </div>
        
        <ScrollBtn 
          currentIndex={currentIndex}
          isIncrement={true}
          maxIndex={maxIndex}
          onClick={setCurrentIndex}
          cursor={currentIndex == maxIndex ? "cursor-default" : "cursor-pointer"}
          opacity={currentIndex == maxIndex ? "opacity-50" : "opacity-100"}
        />
        
    </div>
  )
}
