import React from "react";
import '../styles/ScrollBtn.css';

// Bottone di navigazione tra ricette: calcola il nuovo indice rispettando i limiti.
// Si evita di modificare l'indice fuori range per non causare errori di accesso.

type ScrollBtnProps = {
  currentIndex: number,
  onClick: (newIndex: number) => void;
  maxIndex: number,
  isIncrement: boolean,
  cursor: string,
  opacity: string
};

const ScrollBtn: React.FC<ScrollBtnProps> = ({ 
  currentIndex, 
  onClick, 
  maxIndex, 
  isIncrement ,
  cursor,
  opacity
}: ScrollBtnProps) => {

  // Calcolo dell'indice successivo restando dentro [0, maxIndex]
  const params = isIncrement 
                  ? currentIndex < maxIndex
                    ? currentIndex = currentIndex + 1
                    : currentIndex
                  : currentIndex > 0
                    ? currentIndex = currentIndex - 1
                    : currentIndex

  return (
    <button
      className={`scroll-btn ${cursor} ${opacity}`}
      onClick={() => onClick(params)}
    >
      {isIncrement ? '→' : '←'}
    </button>
  );
};

export default ScrollBtn;
