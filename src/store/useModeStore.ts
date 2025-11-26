import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export type DataMode = 'api' | 'mock'

type ModeStore = {
  mode: DataMode
  setMode: (mode: DataMode) => void
}

const STORAGE_KEY = 'app_data_mode'

// Store per la scelta tra dati mock e API reali
// Consente all'utente di scegliere come ottenere i dati dell'applicazione
const useModeStore = create<ModeStore>()(
  persist(
    (set) => ({
      mode: 'api', // Default: utilizza le API reali
      setMode: (mode: DataMode) => set({ mode }),
    }),
    typeof window !== 'undefined'
      ? { name: STORAGE_KEY, storage: createJSONStorage(() => window.localStorage) }
      : { name: STORAGE_KEY }
  )
)

export default useModeStore
