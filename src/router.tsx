import { createBrowserRouter, type RouteObject } from 'react-router'
import App from './App'
import HomePage from './pages/HomePage'
import IntroPage from './pages/IntroPage'
import SearchResultsPage from './pages/SearchResultsPage'
import { FullRecipePage } from './pages/FullRecipePage'

/**
 * Configurazione rotte React Router v7
 * 
 * Struttura:
 * App (logica configurazione + layout)
 *   ├─ / (HomePage - selezione ingredienti)
 *   ├─ /intro (Configurazione iniziale API/Mock)
 *   ├─ /results?ingredients=... (Risultati ricerca con query string)
 *   └─ /recipe/:recipeId (Dettaglio ricetta con parametro dinamico)
 */

const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        // Rotta index: Pagina per selezione ingredienti
        index: true,
        element: <HomePage />
      },
      {
        // Rotta statica: Configurazione iniziale (API key o modalità mock)
        path: 'intro',
        element: <IntroPage />
      },
      {
        // Rotta con query string: Risultati ricerca
        // Esempio: /results?ingredients=tomato,cheese&ranking=1
        path: 'results',
        element: <SearchResultsPage />
      },
      {
        // Rotta dinamica: Dettaglio ricetta con ID
        // Esempio: /recipe/123456
        path: 'recipe/:recipeId',
        element: <FullRecipePage />
      }
    ]
  }
]

// Crea il router con configurazione
export const router = createBrowserRouter(routes)
