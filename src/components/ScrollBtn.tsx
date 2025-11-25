import React from "react";

//* Questo componente definisce lo stato generico dei bottoni di scroll e di visualizza dettagli, in base al nome del file dell'icona, riceve l'indice corrente e lo aggiorna, oppure cambia pagina

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

  //# definisco incrementare o decrementare l'indice
  const params = isIncrement 
                  ? currentIndex < maxIndex
                    ? currentIndex = currentIndex + 1
                    : currentIndex
                  : currentIndex > 0
                    ? currentIndex = currentIndex - 1
                    : currentIndex

  return (
    <button
      className={`${opacity} ${cursor}`}
      onClick={() => onClick(params)}
    >

      <img className={`w-14 h-14 ${!isIncrement && "rotate-y-180"}`} src={`/icons/nextRecipeIcon.svg`} />
    
    </button>
  );
};

export default ScrollBtn;
