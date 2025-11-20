import { useState, useEffect } from 'react';

/**
 * Hook personalizzato per il debouncing di un valore
 * 
 * @param value - Il valore da "debounciare" (es. testo di ricerca)
 * @param delay - Millisecondi di attesa prima di aggiornare il valore (es. 300ms)
 * @returns Il valore debounced, aggiornato solo dopo il delay
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)
  
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)
    
    return () => {
      clearTimeout(handler)
    }
  }, [value, delay]) // L'effect si riesegue quando value o delay cambiano
  
  return debouncedValue
}
