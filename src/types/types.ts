export interface Ingredient {
  id: number;
  name: string;
  image: string;
}

export interface RecipeIngredient {
  id: number;
  name: string;
  amount: number;
  unit: string;
}

export interface InstructionStep {
  number: number;
  step: string;
}

export interface Recipe {
  id: number;
  title: string;
  image: string;
  readyInMinutes: number;
  cheap: boolean;
  extendedIngredients: RecipeIngredient[];
  instructions: string;
}