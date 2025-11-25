import { useState, useEffect } from "react";
import useApiKeyStore from "../store/useApiKeyStore";
import type { IIngredient } from "../types/types";

export interface UseApiReturn<T> {
  data: T | null
  loading: boolean
  error: string | null
}
// https://api.spoonacular.com/food/ingredients/search?query=${spa}&number=${10}&sortDirection=asc

export function useApi<T = any>(url: string): UseApiReturn<T> {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Flag di cancellazione: evita setState su componenti smontati (race / warning React).
    let cancelled = false

    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await fetch(url)
        const result = await response.json()
        if (!cancelled) {
          // Assumiamo formato Spoonacular con 'results'; se cambia l'API servirà adattare qui.
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

    if (url.length > 0) fetchData(); // Evita chiamate con URL vuoto.
    return () => { cancelled = true }
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
  // La chiave è prelevata da zustand (persistita): consente cambio senza rebuild.
  const storeKey = useApiKeyStore.getState().apiKey
  const apiKey = storeKey
  const base = import.meta.env.VITE_BASE_URL || 'https://api.spoonacular.com'
  return `${base}${ENDPOINT}?apiKey=${apiKey}&query=${query}&number=${RESULTS_NUM}`;
}

/**
 * Costruisce l'URL per cercare ricette a partire da una lista di ingredienti.
 * Esempio endpoint: /recipes/findByIngredients?ingredients=tomato,cheese
 */
export const getRecipesByIngredientsUrl = (
  ingredients: IIngredient[],
  options?: {
    number?: number
    ranking?: 1 | 2 // 1: massimizza uso ingredienti disponibili, 2: minimizza mancanti
    ignorePantry?: boolean // True: non considera ingredienti di dispensa (sale, acqua...)
  }
) => {
  const ENDPOINT = `/recipes/findByIngredients`;
  const number = 100
  const ranking = options?.ranking ?? 1;
  const ignorePantry = options?.ignorePantry ?? true;
  const storeKey = useApiKeyStore.getState().apiKey
  const apiKey = storeKey
  const ingredientsParam = ingredients
    .map((ing) => ing.name.trim())
    .filter(Boolean)
    .map(encodeURIComponent)
    .join(",");
  const base = import.meta.env.VITE_BASE_URL || 'https://api.spoonacular.com'
  return `${base}${ENDPOINT}?apiKey=${apiKey}&ingredients=${ingredientsParam}&number=${number}&ranking=${ranking}&ignorePantry=${ignorePantry}`;
}

/**
 * Costruisce l'URL per ottenere le informazioni di una ricetta specifica.
 * Endpoint: /recipes/{id}/information
 */
export const getRecipeInformationUrl = (id: number) => {
  // Dettaglio completo di una singola ricetta (ingredienti + istruzioni).
  const ENDPOINT = `/recipes/${id}/information`;
  const storeKey = useApiKeyStore.getState().apiKey
  const apiKey = storeKey
  const base = import.meta.env.VITE_BASE_URL || 'https://api.spoonacular.com'
  return `${base}${ENDPOINT}?apiKey=${apiKey}`;
}

