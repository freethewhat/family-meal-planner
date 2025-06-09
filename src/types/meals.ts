export interface Ingredient {
  name: string;
  amount: string;
  unit: string;
}

export interface NutritionPerServing {
  calories: number;
  protein_g: number;
  carbs_g: number;
  net_carbs_g: number;
  fiber_g: number;
  sugar_g: number;
  fat_g: number;
  saturated_fat_g: number;
  sodium_mg: number;
}

export interface Nutrition {
  per_serving: NutritionPerServing;
}

export interface Meal {
  id: number;
  name: string;
  day: string;
  time: string;
  description: string;
  servings: number;
  nutrition: Nutrition;
  ingredients: Ingredient[];
  instructions: string;
}

export interface MealsData {
  meals: Meal[];
} 