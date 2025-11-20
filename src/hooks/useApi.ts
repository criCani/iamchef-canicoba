import { useState, useEffect } from 'react'

export interface UseApiReturn<T> {
  data: T | null
  loading: boolean
  error: string | null
}

export function useApi<T = any>(url: string): UseApiReturn<T> {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  
  useEffect(() => {
    let cancelled = false
    
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await fetch(url)
        const result = await response.json()
        
        if (!cancelled) {
          setData(result.results)
        }
      } catch (err) {
        if (!cancelled) {
          setError((err as Error).message)
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }
    
    if (url.length > 0) fetchData();
    
    return () => {
      cancelled = true
    }
  }, [url])
  
  return { data, loading, error }
}

/**
 * Funzione di helper per costruire l’URL delle API per la ricerca degli ingredienti
 * @param query stringa di ricerca
 * @returns URL completo per la chiamata API
 */
export const getIngredientsUrl = (query: string) => {
    const ENDPOINT = `/food/ingredients/search`;
    const RESULTS_NUM = 10;

    return `${import.meta.env.VITE_BASE_URL}${ENDPOINT}?apiKey=${import.meta.env.VITE_API_KEY}&query=${query}&number=${RESULTS_NUM}`;
}