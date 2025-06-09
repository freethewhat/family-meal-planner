import { useParams, Link } from 'react-router-dom';
import mealsData from '../data/meals.json';

function MealDetail() {
  const { mealId } = useParams();
  const meal = mealsData.meals.find(m => m.id === Number(mealId));

  if (!meal) {
    return (
      <div className="text-center py-8">
        <h2 className="text-2xl font-bold text-gray-700">Meal not found</h2>
        <Link to="/weekly" className="text-blue-500 hover:text-blue-700 mt-4 inline-block">
          Back to Weekly Plan
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-4">
        <Link to="/weekly" className="text-blue-500 hover:text-blue-700 mb-4 inline-block">
          ← Back to Weekly Plan
        </Link>
        <h1 className="text-3xl font-bold text-gray-800">{meal.name}</h1>
        <p className="text-gray-600 mt-1">{meal.description}</p>
        <div className="flex items-center mt-2 text-gray-500">
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{meal.time}</span>
        </div>
      </div>

      {meal.servings && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Servings</h2>
          <p className="text-gray-600">
            {meal.servings.count} servings ({meal.servings.size} each)
          </p>
        </div>
      )}

      {meal.nutrition && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Nutrition (per serving)</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600">Calories: {meal.nutrition.perServing.calories}</p>
              <p className="text-gray-600">Protein: {meal.nutrition.perServing.protein}g</p>
              <p className="text-gray-600">Carbs: {meal.nutrition.perServing.carbohydrates}g</p>
            </div>
            <div>
              <p className="text-gray-600">Fat: {meal.nutrition.perServing.fat}g</p>
              <p className="text-gray-600">Fiber: {meal.nutrition.perServing.fiber}g</p>
              <p className="text-gray-600">Sodium: {meal.nutrition.perServing.sodium}mg</p>
            </div>
          </div>
        </div>
      )}
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Ingredients</h2>
        <ul className="list-disc list-inside space-y-1">
          {meal.ingredients.map((ingredient, index) => (
            <li key={index} className="text-gray-600">
              {ingredient.amount} {ingredient.unit} {ingredient.name}
            </li>
          ))}
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