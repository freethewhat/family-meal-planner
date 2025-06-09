import { HashRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { useState } from 'react';
import TodayMeal from './pages/TodayMeal';
import WeeklyMeals from './pages/WeeklyMeals';
import ShoppingList from './pages/ShoppingList';
import MealDetail from './pages/MealDetail';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow-lg">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex justify-between">
              <div className="flex items-center py-4">
                <span className="font-semibold text-gray-500 text-lg">Family Meal Planner</span>
              </div>
              
              {/* Mobile menu button */}
              <div className="flex items-center sm:hidden">
                <button
                  onClick={toggleMenu}
                  className="text-gray-500 hover:text-gray-900 focus:outline-none"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {isMenuOpen ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    )}
                  </svg>
                </button>
              </div>

              {/* Desktop menu */}
              <div className="hidden sm:flex items-center space-x-4">
                <Link to="/today" className="py-4 px-2 text-gray-500 hover:text-gray-900">Today's Meal</Link>
                <Link to="/weekly" className="py-4 px-2 text-gray-500 hover:text-gray-900">Weekly Plan</Link>
                <Link to="/shopping" className="py-4 px-2 text-gray-500 hover:text-gray-900">Shopping List</Link>
              </div>
            </div>

            {/* Mobile menu */}
            <div className={`sm:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
              <div className="px-2 pt-2 pb-3 space-y-1">
                <Link
                  to="/today"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Today's Meal
                </Link>
                <Link
                  to="/weekly"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Weekly Plan
                </Link>
                <Link
                  to="/shopping"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Shopping List
                </Link>
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