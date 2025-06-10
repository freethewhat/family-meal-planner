import { useState, useEffect, useMemo } from 'react';
import mealsData from '../data/meals.json';
import { Meal } from '../types/meals';

function TodayMeal() {
  const [todayMeal, setTodayMeal] = useState<Meal | null>(null);
  const [servingsMultiplier, setServingsMultiplier] = useState(1);

  const adjustedServings = useMemo(() => {
    return todayMeal ? todayMeal.servings * servingsMultiplier : 0;
  }, [todayMeal, servingsMultiplier]);

  const adjustedNutrition = useMemo(() => {
    if (!todayMeal?.nutrition) return null;
    return {
      calories: Math.round(todayMeal.nutrition.per_serving.calories * servingsMultiplier),
      protein_g: Math.round(todayMeal.nutrition.per_serving.protein_g * servingsMultiplier * 10) / 10,
      carbs_g: Math.round(todayMeal.nutrition.per_serving.carbs_g * servingsMultiplier * 10) / 10,
      net_carbs_g: Math.round(todayMeal.nutrition.per_serving.net_carbs_g * servingsMultiplier * 10) / 10,
      fiber_g: Math.round(todayMeal.nutrition.per_serving.fiber_g * servingsMultiplier * 10) / 10,
      sugar_g: Math.round(todayMeal.nutrition.per_serving.sugar_g * servingsMultiplier * 10) / 10,
      fat_g: Math.round(todayMeal.nutrition.per_serving.fat_g * servingsMultiplier * 10) / 10,
      saturated_fat_g: Math.round(todayMeal.nutrition.per_serving.saturated_fat_g * servingsMultiplier * 10) / 10,
      sodium_mg: Math.round(todayMeal.nutrition.per_serving.sodium_mg * servingsMultiplier)
    };
  }, [todayMeal, servingsMultiplier]);

  useEffect(() => {
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    const meal = mealsData.meals.find(m => m.day === today);
    setTodayMeal(meal || null);
  }, []);

  const handleServingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (value > 0 && todayMeal) {
      setServingsMultiplier(value / todayMeal.servings);
    }
  };

  if (!todayMeal) {
    return (
      <div className="text-center py-8">
        <h2 className="text-2xl font-bold text-gray-700">No meal planned for today</h2>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-primary-800 dark:text-primary-100 mb-6">Today's Meal</h1>
      
      <div className="bg-white dark:bg-primary-800 rounded-lg shadow-md p-6 border border-primary-100 dark:border-primary-700">
        <h2 className="text-2xl font-bold text-primary-800 dark:text-primary-100 mb-2">{todayMeal.name}</h2>
        <p className="text-primary-600 dark:text-primary-300 mb-4">{todayMeal.description}</p>
        
        <div className="mb-6">
          <label htmlFor="servings" className="block text-sm font-medium text-primary-700 dark:text-primary-300 mb-2">
            Number of Servings
          </label>
          <input
            type="number"
            id="servings"
            min="1"
            step="1"
            value={adjustedServings}
            onChange={handleServingsChange}
            className="w-24 px-3 py-2 border border-primary-300 dark:border-primary-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500 dark:bg-primary-700 dark:text-primary-100"
          />
        </div>

        {todayMeal.nutrition && adjustedNutrition && (
          <div className="mb-6">
            <h2 className="text-lg sm:text-xl font-semibold text-primary-700 dark:text-primary-200 mb-2">Nutrition (total for {adjustedServings} servings)</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 text-sm sm:text-base">
              <div>
                <p className="text-primary-600 dark:text-primary-300">Calories: {adjustedNutrition.calories}</p>
                <p className="text-primary-600 dark:text-primary-300">Protein: {adjustedNutrition.protein_g}g</p>
                <p className="text-primary-600 dark:text-primary-300">Carbs: {adjustedNutrition.carbs_g}g</p>
                <p className="text-primary-600 dark:text-primary-300">Net Carbs: {adjustedNutrition.net_carbs_g}g</p>
              </div>
              <div>
                <p className="text-primary-600 dark:text-primary-300">Fat: {adjustedNutrition.fat_g}g</p>
                <p className="text-primary-600 dark:text-primary-300">Saturated Fat: {adjustedNutrition.saturated_fat_g}g</p>
                <p className="text-primary-600 dark:text-primary-300">Fiber: {adjustedNutrition.fiber_g}g</p>
                <p className="text-primary-600 dark:text-primary-300">Sodium: {adjustedNutrition.sodium_mg}mg</p>
              </div>
            </div>
          </div>
        )}
        
        <div className="mb-6">
          <h2 className="text-lg sm:text-xl font-semibold text-primary-700 dark:text-primary-200 mb-2">Ingredients</h2>
          <ul className="list-disc list-inside space-y-1 text-sm sm:text-base">
            {todayMeal.ingredients.map((ingredient, index) => {
              // Skip ingredients with "to taste" amount
              if (ingredient.amount === "to taste") {
                return (
                  <li key={index} className="text-primary-600 dark:text-primary-300">
                    {ingredient.name}
                  </li>
                );
              }

              // Calculate adjusted amount
              const originalAmount = parseFloat(ingredient.amount);
              const adjustedAmount = originalAmount * servingsMultiplier;
              
              return (
                <li key={index} className="text-primary-600 dark:text-primary-300">
                  {adjustedAmount.toFixed(1)} {ingredient.unit} {ingredient.name}
                </li>
              );
            })}
          </ul>
        </div>

        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-primary-700 dark:text-primary-200 mb-2">Instructions</h2>
          <div className="whitespace-pre-line text-primary-600 dark:text-primary-300 text-sm sm:text-base">
            {todayMeal.instructions}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TodayMeal; 