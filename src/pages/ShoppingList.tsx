import { useState, useEffect } from 'react';
import mealsData from '../data/meals.json';
import { Ingredient } from '../types/meals';

interface ShoppingItem extends Ingredient {
  checked: boolean;
}

function ShoppingList() {
  const [shoppingList, setShoppingList] = useState<ShoppingItem[]>([]);

  useEffect(() => {
    // Combine all ingredients from all meals
    const allIngredients = mealsData.meals.flatMap(meal => meal.ingredients);
    
    // Create a map to combine ingredients with the same name
    const ingredientMap = new Map<string, ShoppingItem>();
    
    allIngredients.forEach(ingredient => {
      const existing = ingredientMap.get(ingredient.name);
      if (existing) {
        // If ingredient exists, combine amounts
        const newAmount = parseFloat(existing.amount) + parseFloat(ingredient.amount);
        existing.amount = newAmount.toString();
      } else {
        // If ingredient doesn't exist, add it to the map
        ingredientMap.set(ingredient.name, {
          ...ingredient,
          checked: false
        });
      }
    });
    
    setShoppingList(Array.from(ingredientMap.values()));
  }, []);

  const toggleItem = (index: number) => {
    setShoppingList(prevList => {
      const newList = [...prevList];
      newList[index] = {
        ...newList[index],
        checked: !newList[index].checked
      };
      return newList;
    });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-primary-800 mb-6">Shopping List</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 border border-primary-100">
        <ul className="space-y-3">
          {shoppingList.map((item, index) => (
            <li 
              key={index}
              className={`flex items-center p-3 rounded-lg transition-colors ${
                item.checked ? 'bg-primary-50' : 'bg-white'
              }`}
            >
              <input
                type="checkbox"
                checked={item.checked}
                onChange={() => toggleItem(index)}
                className="w-5 h-5 text-accent-500 rounded focus:ring-accent-500"
              />
              <span className={`ml-3 ${item.checked ? 'line-through text-primary-400' : 'text-primary-700'}`}>
                {item.amount} {item.unit} {item.name}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ShoppingList; 