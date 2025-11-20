import { useState } from 'react';
import type { CurrentPage } from './types/pages'
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import ResultPage from './pages/ResultPage';
import FullRecipe from './pages/FullRecipe';
import Layout from './components/Layout';
import type { IRecipeDetails, IRecipeByIng, IIngredient } from './types/types';
import './components/Layout.css';
import { recipesMock } from './mock/mock';

const App = () => {
  const [currentPage, setCurrentPage] = useState<CurrentPage>({currentPage: {page: "home"}})
  const [ selectedIng, setSelectedIng ] = useState<IIngredient[]>([])
  const [ recipes, setRecipes ] = useState<IRecipeDetails[]>([])

  // variabile di stato per cambiare la scritta sul bottone quando viene cliccato
  const [ isDiscover, setIsDiscover ] = useState<boolean>(false)

  // funzione per gestire l'indice della ricetta
  const [currentIndex, setCurrentIndex] = useState<number>(0)

  const handleSearch = async () => {
    setIsDiscover(true)

    setCurrentIndex(0);
    //TODO: Implementare reale chiamata api
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRecipes(recipesMock); //popolo l'array recipes[] con i dati del mock per simulare la chiamata api

    //TODO: devo popolare l'array recipes[] con dei dati (uso il mock già presente nel progetto)
    console.log(selectedIng);
    setCurrentPage({ currentPage: {page: "results"} })
    setIsDiscover(false)
  };

  // funzione per gestire la selezione da un elemento suggerito
  const handleSuggestClick = (ingredient: IIngredient) => {
    if (selectedIng.includes(ingredient)) {
      return
    }
    setSelectedIng(prev => [...prev, ingredient])
  }

  const handleSuggestedRemove = (ingredient: IIngredient) => {
    const filtArray = selectedIng.filter(item => item != ingredient);
    setSelectedIng(filtArray)
  }

  const handleRecipeDetailsClick = (fullRecipe: IRecipeDetails) => {
    setCurrentPage({ currentPage: {page: "full-recipe", recipeData: fullRecipe}})
  }

  const goToHomepage = () => {
    setCurrentPage({currentPage: {page: "home"}})
  }

  const handleClickBack = (id: number) => {
    setCurrentPage({
      currentPage: {page: 'results'},
      id: id
    })
  }

  const handleSetCurrentIndex = (index: number) => {
    setCurrentIndex(index)
  }

  let mainContent = null;
  switch (currentPage.currentPage.page) {
    case "results":
      mainContent = <ResultPage recipes={recipes} onRecipeDetailsClick={handleRecipeDetailsClick} goToHomepage={goToHomepage} currentIndex={currentIndex} setCurrentIndex={handleSetCurrentIndex} />
      break;
    case "full-recipe":
      mainContent = <FullRecipe goToBack={handleClickBack} id={0} recipeData={currentPage.currentPage.recipeData!}/>
      break;
    default:
      mainContent = <Home onSuggestClick={handleSuggestClick} 
      onPillRemove={handleSuggestedRemove} selectedIng={selectedIng} 
      onSearchClick={handleSearch} isDiscover={isDiscover}/>;
      break;
  }

  return (
    <Layout
      header={<Header />}
      main={mainContent}
      footer={<Footer />}
    />
  );
};

export default App;