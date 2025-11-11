// INGREDIENTS
export interface IIngredient {
  id: number;
  name: string;
  image: string;
}

// RECIPES
export interface IRecipeIngredient {
  id: number;
  name: string;
  amount: number;
  unit: string;
}

export interface IInstructionStep {
  number: number;
  step: string;
}

export interface IRecipe {
  id: number;
  title: string;
  image: string;
  readyInMinutes: number;
  cheap: boolean;
  extendedIngredients: IRecipeIngredient[];
  instructions: string;
}

// RECIPES BY INGREDIENTS
export interface IRecipeByIngredients {
  id: number;
  title: string;
  image: string;
  imageType: string;
  usedIngredientCount: number;
  missedIngredientCount: number;
  missedIngredients: IIngredientRecipe[];
  usedIngredients: IIngredientRecipe[];
  unusedIngredients: IIngredientRecipe[];
  likes: number;
}

export interface IIngredientRecipe {
  id: number;
  amount: number;
  unit: string;
  unitLong: string;
  unitShort: string;
  aisle: string;
  name: string;
  original: string;
  originalName: string;
  meta: string[];
  image: string;
}
