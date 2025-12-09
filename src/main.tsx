import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'
import { RecipesProvider } from './contexts/RecipesContext'
import { router } from './router'
import './styles/index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RecipesProvider>
      <RouterProvider router={router} />
    </RecipesProvider>
  </StrictMode>,
)
