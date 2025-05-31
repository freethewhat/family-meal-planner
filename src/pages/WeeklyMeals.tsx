import mealsData from '../data/meals.json';
import { Ingredient } from '../types/meals';

function WeeklyMeals() {
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Weekly Meal Plan</h1>
      
      <div className="grid gap-6">
        {daysOfWeek.map(day => {
          const meal = mealsData.meals.find(m => m.day === day);
          
          return (
            <div key={day} className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">{day}</h2>
              
              {meal ? (
                <div>
                  <div className="mb-4">
                    <h3 className="text-xl font-medium text-gray-800">{meal.name}</h3>
                    <p className="text-gray-600 mt-1">{meal.description}</p>
                    <div className="flex items-center mt-2 text-gray-500">
                      <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{meal.time}</span>
                    </div>
                  </div>
                  <div className="text-gray-600">
                    <p className="mb-2 font-medium">Ingredients:</p>
                    <ul className="list-disc list-inside space-y-1">
                      {meal.ingredients.map((ingredient, index) => (
                        <li key={index}>
                          {ingredient.amount} {ingredient.unit} {ingredient.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500 italic">No meal planned</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default WeeklyMeals; 