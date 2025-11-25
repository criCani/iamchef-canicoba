import { useState, useEffect } from 'react';

// Hook di debounce: rinvia l'aggiornamento del valore finché l'utente continua
// ad interagire entro la finestra temporale. Riduce chiamate API e rendering.
// Uso tipico: testo ricerca -> meno fetch durante la digitazione.
export function useDebounce<T>(value: T, delay: number): T {
  // Valore stabilizzato dopo l'inattività dell'utente.
  const [debouncedValue, setDebouncedValue] = useState<T>(value)
  
  useEffect(() => {
    // Timer riprogrammato ad ogni modifica: solo l'ultimo scatta.
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)
    
    // Cleanup: evita aggiornamenti non necessari e race quando il componente si smonta.
    return () => {
      clearTimeout(handler)
    }
  }, [value, delay]) // L'effect si riesegue quando value o delay cambiano
  
  // Ritorna il valore stabilizzato.
  return debouncedValue
}
