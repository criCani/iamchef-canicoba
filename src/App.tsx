import { useState, useEffect } from 'react'
import Layout from "./components/Layout"
import Header from './components/Header'
import Footer from './components/Footer'
import IntroPage from './pages/IntroPage'
import type { IRecipeByIng, IIngredient, IRecipeDetails } from './types/types'
import type { CurrentPage } from './types/pages'
import SearchResults from './pages/SearchResults'
import Home from './pages/Home'
import { FullRecipe } from './pages/FullRecipe'
import { getRecipesByIngredientsUrl, getRecipeInformationUrl } from './hooks/useApi'

// Root dell'app: gestisce la navigazione "manuale" tra viste e centralizza
// 1) Ingredienti selezionati
// 2) Ricette risultanti da una ricerca
// 3) Dettagli di una ricetta
// La pagina "intro" viene mostrata se manca la chiave API nel localStorage.
// Non si usa un router perché la navigazione è lineare e guidata dal flusso.

function App() {
  // Pagina corrente (gestione semplice dello stato di navigazione)
  const [currentPage, setCurrentPage] = useState<CurrentPage>({currentPage: {page: "home"}})
  // Ingredienti selezionati dall'utente per la ricerca ricette
  const [ selectedIng, setSelectedIng ] = useState<IIngredient[]>([])
  // Risultati ricette dalla chiamata API
  const [ recipes, setRecipes ] = useState<IRecipeByIng[]>([])
  // Spinner / stato del bottone di ricerca (evita richieste duplicate)
  const [ isDiscover, setIsDiscover ] = useState<boolean>(false)

  // Avvia la ricerca ricette: costruisce URL, esegue fetch e passa alla pagina risultati.
  // Gestisce fallback se l'API non ritorna risultati.
  const handleSearchClick = async () => {
    setIsDiscover(true)
    setCurrentIndex(0)

    try {
      const url = getRecipesByIngredientsUrl(selectedIng, { ranking: 1, ignorePantry: true })
      const resp = await fetch(url)
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`)
      const json = (await resp.json()) as IRecipeByIng[]
      if (Array.isArray(json) && json.length > 0) {
        setRecipes(json)
        setCurrentPage({ currentPage: { page: 'results' } })
      } else {
        console.warn('Nessun risultato trovato per gli ingredienti selezionati')
      }
    } catch (e) {
      console.error('Errore chiamata ricette per ingredienti:', e)
    } finally {
      setIsDiscover(false)
    }
  }

  // Aggiunge un ingrediente suggerito evitando duplicati.
  const handleSuggestClick = (ing: IIngredient) => {
    if (selectedIng.includes(ing)) {
      return
    }
    setSelectedIng(prev => [...prev, ing])
  }

  // const handleSetCurrentPage = (page: currentPage) => setCurrentPage(page)

  // Rimuove un ingrediente precedentemente selezionato.
  const handleSuggestedRemove = (ing: IIngredient) => {
    const filtArray = selectedIng.filter(item => item != ing);
    setSelectedIng(filtArray)
  }

  // Recupera i dettagli completi di una singola ricetta e naviga alla vista dedicata.
  const handleRecipeDetailsClick = (recipe: IRecipeByIng) => {
    void (async () => {
      try {
        const url = getRecipeInformationUrl(recipe.id)
        console.log("URL richiesta:", url)
        const resp = await fetch(url)
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`)
        const json = (await resp.json()) as IRecipeDetails
        setCurrentPage({ currentPage: { page: 'full-recipe', recipeData: json } })
      } catch (e) {
        console.error('Errore dettagli ricetta:', e)
      }
    })()
  }

  // Torna alla pagina iniziale per nuova selezione ingredienti.
  const goToHomepage = () => {
    setCurrentPage({currentPage: {page: "home"}})
  }

  // Gestione ritorno dalla pagina dettaglio alla lista risultati.
  const handleClickBack = (id:number) => {
    setCurrentPage({
      currentPage: {page: 'results'},
      id: id
    })
  }

  // Indice della ricetta corrente mostrata nei risultati (navigazione incrementale)
  const [currentIndex, setCurrentIndex] = useState<number>(0)

  // La pagina "intro" raccoglie e persiste la chiave API la prima volta.

  useEffect(() => {
    // All'avvio controlla presenza della chiave API per decidere la prima vista.
    const localKey = typeof window !== 'undefined' ? window.localStorage.getItem('spoonacular_api_key') : null
    if (!localKey) {
      setCurrentPage({ currentPage: { page: 'intro' } })
    }
  }, [])

  const handleSetCurrentIndex = (index: number) => {
    setCurrentIndex(index)
  }

  // Determina dinamicamente il contenuto principale in base allo stato di navigazione.
  let mainContent = null;

  switch (currentPage.currentPage.page) {
    case "intro":
      mainContent = <IntroPage onSaved={() => setCurrentPage({ currentPage: { page: 'home' } })} />
      break;
    case "results":
      mainContent = <SearchResults recipes={recipes} onRecipeDetailsClick={handleRecipeDetailsClick} goToHomepage={goToHomepage} currentIndex={currentIndex} setCurrentIndex={handleSetCurrentIndex} />
      break;
    case "full-recipe":
      mainContent = <FullRecipe goToBack={handleClickBack} id={0} recipeData={currentPage.currentPage.recipeData!}/>
      break;
    default:
      mainContent = <Home onSuggestClick={handleSuggestClick} 
      onBadgeRemove={handleSuggestedRemove} selectedIng={selectedIng} 
      onSearchClick={handleSearchClick} isDiscover={isDiscover}/>;
      break;
  }

  return (
    <Layout
      header={<Header />}
      main={mainContent}
      footer={<Footer />}
    />
  )
}

export default App
