import { HashRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import TodayMeal from './pages/TodayMeal';
import WeeklyMeals from './pages/WeeklyMeals';
import ShoppingList from './pages/ShoppingList';
import MealDetail from './pages/MealDetail';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow-lg">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex justify-between">
              <div className="flex space-x-7">
                <div className="flex items-center py-4">
                  <span className="font-semibold text-gray-500 text-lg">Family Meal Planner</span>
                </div>
                <div className="flex items-center space-x-4">
                  <Link to="/today" className="py-4 px-2 text-gray-500 hover:text-gray-900">Today's Meal</Link>
                  <Link to="/weekly" className="py-4 px-2 text-gray-500 hover:text-gray-900">Weekly Plan</Link>
                  <Link to="/shopping" className="py-4 px-2 text-gray-500 hover:text-gray-900">Shopping List</Link>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-6xl mx-auto mt-6 px-4">
          <Routes>
            <Route path="/" element={<Navigate to="/today" replace />} />
            <Route path="/today" element={<TodayMeal />} />
            <Route path="/weekly" element={<WeeklyMeals />} />
            <Route path="/shopping" element={<ShoppingList />} />
            <Route path="/meal/:mealId" element={<MealDetail />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App; 