import { useState, useEffect } from 'react';
import mealsData from '../data/meals.json';
import { Meal } from '../types/meals';

function TodayMeal() {
  const [todayMeal, setTodayMeal] = useState<Meal | null>(null);

  useEffect(() => {
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    const meal = mealsData.meals.find(m => m.day === today);
    setTodayMeal(meal || null);
  }, []);

  if (!todayMeal) {
    return (
      <div className="text-center py-8">
        <h2 className="text-2xl font-bold text-gray-700">No meal planned for today</h2>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-4">
        <h1 className="text-3xl font-bold text-gray-800">{todayMeal.name}</h1>
        <p className="text-gray-600 mt-1">{todayMeal.description}</p>
        <div className="flex items-center mt-2 text-gray-500">
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{todayMeal.time}</span>
        </div>
      </div>
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Ingredients</h2>
        <ul className="list-disc list-inside space-y-1">
          {todayMeal.ingredients.map((ingredient, index) => (
            <li key={index} className="text-gray-600">
              {ingredient.amount} {ingredient.unit} {ingredient.name}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Instructions</h2>
        <div className="whitespace-pre-line text-gray-600">
          {todayMeal.instructions}
        </div>
      </div>
    </div>
  );
}

export default TodayMeal; 