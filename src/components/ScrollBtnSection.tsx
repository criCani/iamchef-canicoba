import ScrollBtn from "./ScrollBtn"

type ScrollBtnSectionProps = {
  currentIndex: number
  maxIndex: number
  setCurrentIndex: (index: number) => void
  goToHomepage: () => void
}

export function ScrollBtnSection({ currentIndex, setCurrentIndex, maxIndex, goToHomepage }: ScrollBtnSectionProps) {

  return (
    <div className="py-2 flex gap-3 justify-center items-center">

          <ScrollBtn 
            currentIndex={currentIndex}
            isIncrement={false}
            maxIndex={maxIndex}
            onClick={setCurrentIndex}
            cursor={currentIndex == 0 ? "cursor-default" : "cursor-pointer"}
            opacity={currentIndex == 0 ? "opacity-50" : "opacity-100"}
          />

        <div 
          className="flex w-12 h-12 cursor-pointer shrink-0"
          onClick={goToHomepage}
        >
          <img src="/icons/iAmChef_Logo.svg" alt="Logo" className="w-full h-full rounded-lg"/>

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
