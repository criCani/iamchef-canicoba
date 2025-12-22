import { createBrowserRouter, type RouteObject } from 'react-router-dom'
import App from './App'
import HomePage from './pages/HomePage'
import IntroPage from './pages/IntroPage'
import SearchResultsPage from './pages/SearchResultsPage'
import { FullRecipePage } from './pages/FullRecipePage'

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
