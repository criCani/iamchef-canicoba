// INGREDIENTS
export interface IIngredient {
  id: number;
  name: string;
  image: string;
}

// RECIPES
export interface IRecipeDetails {
  id: number;
  image: string;
  imageType: string;
  title: string;
  readyInMinutes: number;
  servings: number;
  sourceUrl: string;
  vegetarian: boolean;
  vegan: boolean;
  glutenFree: boolean;
  dairyFree: boolean;
  veryHealthy: boolean;
  cheap: boolean;
  veryPopular: boolean;
  sustainable: boolean;
  lowFodmap: boolean;
  weightWatcherSmartPoints: number;
  gaps: string;
  preparationMinutes: number | null;
  cookingMinutes: number | null;
  aggregateLikes: number;
  healthScore: number;
  creditsText: string;
  license: string;
  sourceName: string;
  pricePerServing: number;

  extendedIngredients: IExtendedIngredient[];

  summary: string;
  cuisines: string[];
  dishTypes: string[];
  diets: string[];
  occasions: string[];

  instructions: string;
  analyzedInstructions: IAnalyzedInstruction[];

  spoonacularScore: number;
  spoonacularSourceUrl: string;
}

export interface IExtendedIngredient {
  id: number;
  aisle: string;
  image: string;
  consistency: string;
  name: string;
  nameClean: string;
  original: string;
  originalName: string;
  amount: number;
  unit: string;
  meta: string[];
  measures: IIngredientMeasures;
}

export interface IIngredientMeasures {
  us: IMeasureUnit;
  metric: IMeasureUnit;
}

export interface IMeasureUnit {
  amount: number;
  unitShort: string;
  unitLong: string;
}

export interface IAnalyzedInstruction {
  name: string;
  steps: IInstructionStep[];
}

export interface IInstructionStep {
  number: number;
  step: string;
  ingredients: IStepIngredient[];
  equipment: IStepEquipment[];
}

export interface IStepIngredient {
  id: number;
  name: string;
  localizedName: string;
  image: string;
}

export interface IStepEquipment {
  id?: number;
  name?: string;
  localizedName?: string;
  image?: string;
}

// RECIPES BY INGREDIENTS
export interface IRecipeByIng {
  id: number;
  title: string;
  image: string;
  imageType: string;
  usedIngredientCount: number;
  missedIngredientCount: number;
  missedIngredients: IRecipeByIngIngredient[];
  usedIngredients: IRecipeByIngIngredient[];
  unusedIngredients: IRecipeByIngIngredient[];
  likes: number;
}

export interface IRecipeByIngIngredient {
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
  extendedName?: string;
}
