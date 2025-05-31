export interface Ingredient {
  name: string;
  amount: string;
  unit: string;
}

export interface Meal {
  id: number;
  name: string;
  day: string;
  time: string;
  description: string;
  ingredients: Ingredient[];
  instructions: string;
}

export interface MealsData {
  meals: Meal[];
} 