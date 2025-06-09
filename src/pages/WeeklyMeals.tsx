import { useState } from 'react';
import mealsData from '../data/meals.json';
import { Meal } from '../types/meals';

function WeeklyMeals() {
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);

  const handleMealClick = (meal: Meal) => {
    setSelectedMeal(meal);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-primary-800 mb-6">Weekly Meal Plan</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {mealsData.meals.map((meal) => (
          <div
            key={meal.day}
            className="bg-white rounded-lg shadow-md p-4 sm:p-6 cursor-pointer hover:shadow-lg transition-shadow border border-primary-100"
            onClick={() => handleMealClick(meal)}
          >
            <h2 className="text-lg sm:text-xl font-semibold text-primary-700 mb-2">{meal.day}</h2>
            <h3 className="text-base sm:text-lg font-medium text-primary-800 mb-1">{meal.name}</h3>
            <p className="text-sm sm:text-base text-primary-600 mb-2">{meal.description}</p>
            <div className="flex items-center text-primary-500 text-sm sm:text-base">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{meal.time}</span>
            </div>
            {meal.nutrition && (
              <div className="mt-2 text-sm sm:text-base">
                <p className="text-primary-600">Calories: {meal.nutrition.per_serving.calories}</p>
                <p className="text-primary-600">Protein: {meal.nutrition.per_serving.protein_g}g</p>
                <p className="text-primary-600">Carbs: {meal.nutrition.per_serving.carbs_g}g</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {selectedMeal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-primary-100">
            <div className="p-4 sm:p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl sm:text-2xl font-bold text-primary-800">{selectedMeal.name}</h2>
                <button
                  onClick={() => setSelectedMeal(null)}
                  className="text-primary-500 hover:text-primary-700 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <p className="text-primary-600 mb-4 text-sm sm:text-base">{selectedMeal.description}</p>
              
              <div className="mb-4">
                <h3 className="text-lg sm:text-xl font-semibold text-primary-700 mb-2">Ingredients</h3>
                <ul className="list-disc list-inside space-y-1 text-sm sm:text-base">
                  {selectedMeal.ingredients.map((ingredient, index) => (
                    <li key={index} className="text-primary-600">
                      {ingredient.amount} {ingredient.unit} {ingredient.name}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-primary-700 mb-2">Instructions</h3>
                <div className="whitespace-pre-line text-primary-600 text-sm sm:text-base">
                  {selectedMeal.instructions}
                </div>
              </div>

              {selectedMeal.nutrition && (
                <div className="mt-4">
                  <h3 className="text-lg sm:text-xl font-semibold text-primary-700 mb-2">Nutrition (per serving)</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 text-sm sm:text-base">
                    <div>
                      <p className="text-primary-600">Calories: {selectedMeal.nutrition.per_serving.calories}</p>
                      <p className="text-primary-600">Protein: {selectedMeal.nutrition.per_serving.protein_g}g</p>
                      <p className="text-primary-600">Carbs: {selectedMeal.nutrition.per_serving.carbs_g}g</p>
                      <p className="text-primary-600">Net Carbs: {selectedMeal.nutrition.per_serving.net_carbs_g}g</p>
                    </div>
                    <div>
                      <p className="text-primary-600">Fat: {selectedMeal.nutrition.per_serving.fat_g}g</p>
                      <p className="text-primary-600">Saturated Fat: {selectedMeal.nutrition.per_serving.saturated_fat_g}g</p>
                      <p className="text-primary-600">Fiber: {selectedMeal.nutrition.per_serving.fiber_g}g</p>
                      <p className="text-primary-600">Sodium: {selectedMeal.nutrition.per_serving.sodium_mg}mg</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default WeeklyMeals; 