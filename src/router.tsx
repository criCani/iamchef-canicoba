import { createBrowserRouter, type RouteObject } from 'react-router'
import App from './App'
import Home from './pages/Home'
import IntroPage from './pages/IntroPage'
import SearchResults from './pages/SearchResults'
import { FullRecipe } from './pages/FullRecipe'

/**
 * Configurazione rotte React Router v7
 * 
 * Struttura:
 * App (logica configurazione + layout)
 *   ├─ / (Home - selezione ingredienti)
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
        // Rotta index: Home page per selezione ingredienti
        index: true,
        element: <Home />
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
        element: <SearchResults />
      },
      {
        // Rotta dinamica: Dettaglio ricetta con ID
        // Esempio: /recipe/123456
        path: 'recipe/:recipeId',
        element: <FullRecipe />
      }
    ]
  }
]

// Crea il router con configurazione
export const router = createBrowserRouter(routes)
