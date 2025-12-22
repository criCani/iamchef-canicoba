import '../styles/components/ScrollSection.css';
import IconifyIcon from '../utils/IconifyIcon';

type ScrollSectionProps = {
  currentIndex: number;
  maxIndex: number;
  setCurrentIndex: (index: number) => void;
};

export function ScrollSection({ currentIndex, setCurrentIndex, maxIndex }: ScrollSectionProps) {
  const isFirst = currentIndex <= 0;
  const isLast = currentIndex >= maxIndex;

  const goPrev = () => setCurrentIndex(Math.max(currentIndex - 1, 0));
  const goNext = () => setCurrentIndex(Math.min(currentIndex + 1, maxIndex));

  const dots = Array.from({ length: maxIndex + 1 });

  return (
    <div className="scroll-section" aria-label="Navigazione ricette">
      <div className="scroll-section__top">
        <button
          className="scroll-section__nav scroll-section__nav--prev"
          onClick={goPrev}
          disabled={isFirst}
        >
          <span className="scroll-section__chevron"><IconifyIcon icon="mdi:arrow-left" width="1.3em" height="1.3em" aria-hidden={true} /></span>
        </button>

        <div className="scroll-section__progress" aria-live="polite">
          {currentIndex + 1}/{maxIndex + 1}
        </div>

        <button
          className="scroll-section__nav scroll-section__nav--next"
          onClick={goNext}
          disabled={isLast}
        >
          <span className="scroll-section__chevron"><IconifyIcon icon="mdi:arrow-right" width="1.3em" height="1.3em" aria-hidden={true} /></span>
        </button>
      </div>

      <div className="scroll-section__dots" aria-label="Seleziona ricetta">
        {dots.map((_, idx) => (
          <button
            key={idx}
            className={`scroll-section__dot ${idx === currentIndex ? 'scroll-section__dot--active' : ''}`}
            onClick={() => setCurrentIndex(idx)}
            aria-label={`Vai alla ricetta ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
