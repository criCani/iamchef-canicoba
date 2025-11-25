import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

type ApiKeyStore = {
  apiKey: string | null
  setApiKey: (key: string) => void
  clearApiKey: () => void
}

const STORAGE_KEY = 'spoonacular_api_key'

// Store zustand persistito: mantiene la chiave API tra sessioni senza dipendere da env.
// Motivo: consente all'utente di inserire la chiave runtime senza rebuild.
const useApiKeyStore = create<ApiKeyStore>()(
  persist(
    (set) => ({
      apiKey: null,
      setApiKey: (key: string) => set({ apiKey: key }),
      clearApiKey: () => set({ apiKey: null }),
    }),
    typeof window !== 'undefined'
      ? { name: STORAGE_KEY, storage: createJSONStorage(() => window.localStorage) }
      : { name: STORAGE_KEY }
  )
)

export default useApiKeyStore
