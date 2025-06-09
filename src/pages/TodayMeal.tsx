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
        <h2 className="text-2xl font-bold text-primary-700">No meal planned for today</h2>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 border border-primary-100">
      <div className="mb-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-primary-800">{todayMeal.name}</h1>
        <p className="text-primary-600 mt-1 text-sm sm:text-base">{todayMeal.description}</p>
        <div className="flex items-center mt-2 text-primary-500 text-sm sm:text-base">
          <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{todayMeal.time}</span>
        </div>
      </div>
      
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          <h2 className="text-lg sm:text-xl font-semibold text-primary-700">Servings</h2>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min="1"
              step="1"
              value={adjustedServings}
              onChange={handleServingsChange}
              className="w-20 px-2 py-1 border border-primary-200 rounded focus:outline-none focus:ring-2 focus:ring-accent-500 text-sm sm:text-base"
            />
            <span className="text-primary-600 text-sm sm:text-base">servings</span>
          </div>
        </div>
      </div>

      {todayMeal.nutrition && adjustedNutrition && (
        <div className="mb-6">
          <h2 className="text-lg sm:text-xl font-semibold text-primary-700 mb-2">Nutrition (total for {adjustedServings} servings)</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 text-sm sm:text-base">
            <div>
              <p className="text-primary-600">Calories: {adjustedNutrition.calories}</p>
              <p className="text-primary-600">Protein: {adjustedNutrition.protein_g}g</p>
              <p className="text-primary-600">Carbs: {adjustedNutrition.carbs_g}g</p>
              <p className="text-primary-600">Net Carbs: {adjustedNutrition.net_carbs_g}g</p>
            </div>
            <div>
              <p className="text-primary-600">Fat: {adjustedNutrition.fat_g}g</p>
              <p className="text-primary-600">Saturated Fat: {adjustedNutrition.saturated_fat_g}g</p>
              <p className="text-primary-600">Fiber: {adjustedNutrition.fiber_g}g</p>
              <p className="text-primary-600">Sodium: {adjustedNutrition.sodium_mg}mg</p>
            </div>
          </div>
        </div>
      )}
      
      <div className="mb-6">
        <h2 className="text-lg sm:text-xl font-semibold text-primary-700 mb-2">Ingredients</h2>
        <ul className="list-disc list-inside space-y-1 text-sm sm:text-base">
          {todayMeal.ingredients.map((ingredient, index) => {
            // Skip ingredients with "to taste" amount
            if (ingredient.amount === "to taste") {
              return (
                <li key={index} className="text-primary-600">
                  {ingredient.name}
                </li>
              );
            }

            // Calculate adjusted amount
            const originalAmount = parseFloat(ingredient.amount);
            const adjustedAmount = originalAmount * servingsMultiplier;
            
            return (
              <li key={index} className="text-primary-600">
                {adjustedAmount.toFixed(1)} {ingredient.unit} {ingredient.name}
              </li>
            );
          })}
        </ul>
      </div>

      <div>
        <h2 className="text-lg sm:text-xl font-semibold text-primary-700 mb-2">Instructions</h2>
        <div className="whitespace-pre-line text-primary-600 text-sm sm:text-base">
          {todayMeal.instructions}
        </div>
      </div>
    </div>
  );
}

export default TodayMeal; 