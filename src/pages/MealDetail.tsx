import { useParams } from 'react-router-dom';
import { useState, useMemo } from 'react';
import mealsData from '../data/meals.json';

function MealDetail() {
  const { mealId } = useParams();
  const meal = mealsData.meals.find(m => m.id === Number(mealId));
  const [servingsMultiplier, setServingsMultiplier] = useState(1);

  const adjustedServings = useMemo(() => {
    return meal ? meal.servings * servingsMultiplier : 0;
  }, [meal, servingsMultiplier]);

  const adjustedNutrition = useMemo(() => {
    if (!meal?.nutrition) return null;
    return {
      calories: Math.round(meal.nutrition.per_serving.calories * servingsMultiplier),
      protein_g: Math.round(meal.nutrition.per_serving.protein_g * servingsMultiplier * 10) / 10,
      carbs_g: Math.round(meal.nutrition.per_serving.carbs_g * servingsMultiplier * 10) / 10,
      net_carbs_g: Math.round(meal.nutrition.per_serving.net_carbs_g * servingsMultiplier * 10) / 10,
      fiber_g: Math.round(meal.nutrition.per_serving.fiber_g * servingsMultiplier * 10) / 10,
      sugar_g: Math.round(meal.nutrition.per_serving.sugar_g * servingsMultiplier * 10) / 10,
      fat_g: Math.round(meal.nutrition.per_serving.fat_g * servingsMultiplier * 10) / 10,
      saturated_fat_g: Math.round(meal.nutrition.per_serving.saturated_fat_g * servingsMultiplier * 10) / 10,
      sodium_mg: Math.round(meal.nutrition.per_serving.sodium_mg * servingsMultiplier)
    };
  }, [meal, servingsMultiplier]);

  const handleServingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (value > 0 && meal) {
      setServingsMultiplier(value / meal.servings);
    }
  };

  if (!meal) {
    return (
      <div className="text-center py-8">
        <h2 className="text-2xl font-bold text-gray-700">Meal not found</h2>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-4">
        <h1 className="text-3xl font-bold text-gray-800">{meal.name}</h1>
        <p className="text-gray-600 mt-1">{meal.description}</p>
        <div className="flex items-center mt-2 text-gray-500">
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{meal.time}</span>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-semibold text-gray-700">Servings</h2>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min="1"
              step="1"
              value={adjustedServings}
              onChange={handleServingsChange}
              className="w-20 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-gray-600">servings</span>
          </div>
        </div>
      </div>

      {meal.nutrition && adjustedNutrition && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Nutrition (total for {adjustedServings} servings)</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600">Calories: {adjustedNutrition.calories}</p>
              <p className="text-gray-600">Protein: {adjustedNutrition.protein_g}g</p>
              <p className="text-gray-600">Carbs: {adjustedNutrition.carbs_g}g</p>
              <p className="text-gray-600">Net Carbs: {adjustedNutrition.net_carbs_g}g</p>
            </div>
            <div>
              <p className="text-gray-600">Fat: {adjustedNutrition.fat_g}g</p>
              <p className="text-gray-600">Saturated Fat: {adjustedNutrition.saturated_fat_g}g</p>
              <p className="text-gray-600">Fiber: {adjustedNutrition.fiber_g}g</p>
              <p className="text-gray-600">Sodium: {adjustedNutrition.sodium_mg}mg</p>
            </div>
          </div>
        </div>
      )}
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Ingredients</h2>
        <ul className="list-disc list-inside space-y-1">
          {meal.ingredients.map((ingredient, index) => {
            // Skip ingredients with "to taste" amount
            if (ingredient.amount === "to taste") {
              return (
                <li key={index} className="text-gray-600">
                  {ingredient.name}
                </li>
              );
            }

            // Calculate adjusted amount
            const originalAmount = parseFloat(ingredient.amount);
            const adjustedAmount = originalAmount * servingsMultiplier;
            
            return (
              <li key={index} className="text-gray-600">
                {adjustedAmount.toFixed(1)} {ingredient.unit} {ingredient.name}
              </li>
            );
          })}
        </ul>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Instructions</h2>
        <div className="whitespace-pre-line text-gray-600">
          {meal.instructions}
        </div>
      </div>
    </div>
  );
}

export default MealDetail; 