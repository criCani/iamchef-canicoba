import React from "react";
import '../styles/ScrollBtn.css';

// Bottone di navigazione tra ricette: calcola il nuovo indice rispettando i limiti.
// Si evita di modificare l'indice fuori range per non causare errori di accesso.

type ScrollBtnProps = {
  currentIndex: number;
  onClick: (newIndex: number) => void;
  maxIndex: number;
  isIncrement: boolean;
};

const ScrollBtn: React.FC<ScrollBtnProps> = ({ 
  currentIndex, 
  onClick, 
  maxIndex, 
  isIncrement
}: ScrollBtnProps) => {
  // Calcolo dell'indice successivo restando dentro [0, maxIndex]
  const nextIndex = isIncrement
    ? Math.min(currentIndex + 1, maxIndex)
    : Math.max(currentIndex - 1, 0);

  const isDisabled = isIncrement ? currentIndex >= maxIndex : currentIndex <= 0;

  return (
    <button
      className={`scroll-btn ${isDisabled ? 'scroll-btn--disabled' : ''}`}
      onClick={() => onClick(nextIndex)}
      disabled={isDisabled}
    >
      {isIncrement ? '→' : '←'}
    </button>
  );
};

export default ScrollBtn;
