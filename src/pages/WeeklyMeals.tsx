import { useState } from 'react';
import mealsData from '../data/meals.json';
import { Meal } from '../types/meals';

function WeeklyMeals() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-primary-800 dark:text-primary-100 mb-6">Weekly Meal Plan</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {mealsData.meals.map((meal) => (
          <div
            key={meal.day}
            className="bg-white dark:bg-primary-800 rounded-lg shadow-md p-4 sm:p-6 cursor-pointer hover:shadow-lg transition-shadow border border-primary-100 dark:border-primary-700"
          >
            <h2 className="text-lg sm:text-xl font-semibold text-primary-700 dark:text-primary-200 mb-2">{meal.day}</h2>
            <h3 className="text-base sm:text-lg font-medium text-primary-800 dark:text-primary-100 mb-1">{meal.name}</h3>
            <p className="text-sm sm:text-base text-primary-600 dark:text-primary-300 mb-2">{meal.description}</p>
            <div className="flex items-center text-primary-500 dark:text-primary-400 text-sm sm:text-base">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{meal.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WeeklyMeals; 