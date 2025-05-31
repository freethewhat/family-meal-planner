import { useState, useEffect } from 'react';
import mealsData from '../data/meals.json';

interface Ingredient {
  name: string;
  amount: string;
  unit: string;
}

interface Meal {
  id: number;
  name: string;
  day: string;
  time: string;
  description: string;
  ingredients: Ingredient[];
  instructions: string;
}

interface CombinedIngredient {
  name: string;
  amounts: { amount: string; unit: string }[];
}

function ShoppingList() {
  const [ingredients, setIngredients] = useState<CombinedIngredient[]>([]);
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const combinedIngredients = mealsData.meals.reduce((acc: { [key: string]: CombinedIngredient }, meal) => {
      meal.ingredients.forEach(ing => {
        if (!acc[ing.name]) {
          acc[ing.name] = {
            name: ing.name,
            amounts: []
          };
        }
        acc[ing.name].amounts.push({
          amount: ing.amount,
          unit: ing.unit
        });
      });
      return acc;
    }, {});

    setIngredients(Object.values(combinedIngredients));
  }, []);

  const handleCheckboxChange = (ingredientName: string) => {
    setCheckedItems(prev => ({
      ...prev,
      [ingredientName]: !prev[ingredientName]
    }));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Shopping List</h1>
      
      <div className="space-y-4">
        {ingredients.map((ingredient, index) => (
          <div 
            key={index} 
            className={`flex items-center space-x-4 p-3 rounded transition-colors ${
              checkedItems[ingredient.name] ? 'bg-green-50' : 'bg-gray-50'
            }`}
          >
            <input
              type="checkbox"
              className="h-5 w-5 text-blue-600 rounded"
              checked={checkedItems[ingredient.name] || false}
              onChange={() => handleCheckboxChange(ingredient.name)}
            />
            <div>
              <span className={`font-medium ${checkedItems[ingredient.name] ? 'text-gray-500 line-through' : 'text-gray-800'}`}>
                {ingredient.name}
              </span>
              <div className="text-sm text-gray-600">
                {ingredient.amounts.map((amount, i) => (
                  <span key={i}>
                    {i > 0 && ' + '}
                    {amount.amount} {amount.unit}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShoppingList; 