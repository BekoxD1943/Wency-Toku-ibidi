import React, { useState } from "react";
import "./App.css";
import recipesData from "./recipesData";

function App() {
  const [ingredients, setIngredients] = useState([]);
  const [input, setInput] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  // Malzeme ekleme
  const addIngredient = () => {
    if (input && !ingredients.includes(input)) {
      setIngredients([...ingredients, input]);
      setInput("");
    }
  };

  // Malzemeye göre tarif filtreleme
  const filteredRecipes = recipesData.filter((recipe) =>
    ingredients.every((ing) => recipe.ingredients.includes(ing))
  );

  return (
    <div className="app">
      <h1>Mutfak Asistanı 🍲</h1>
      
      {/* Malzeme Girişi */}
      <div className="ingredient-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Malzeme ekle..."
        />
        <button onClick={addIngredient}>Ekle</button>
      </div>
      
      {/* Malzeme Listesi */}
      <div className="ingredient-list">
        {ingredients.map((ing, idx) => (
          <span key={idx} className="ingredient-item">{ing}</span>
        ))}
      </div>
      
      {/* Tarif Kartları */}
      <div className="recipes-container">
        {filteredRecipes.map((recipe) => (
          <div 
            key={recipe.id} 
            className="recipe-card"
            onClick={() => setSelectedRecipe(recipe)}
          >
            <h3>{recipe.name}</h3>
            <p>{recipe.type} - {recipe.time} dk</p>
          </div>
        ))}
      </div>

      {/* Tarif Detayı */}
      {selectedRecipe && (
        <div className="recipe-detail">
          <h2>{selectedRecipe.name}</h2>
          <p><strong>Süre:</strong> {selectedRecipe.time} dk</p>
          <p><strong>Zorluk:</strong> {selectedRecipe.difficulty}</p>
          <p><strong>Malzemeler:</strong> {selectedRecipe.ingredients.join(", ")}</p>
          <p><strong>Adımlar:</strong></p>
          <ol>
            {selectedRecipe.steps.map((step, idx) => <li key={idx}>{step}</li>)}
          </ol>
          <button onClick={() => setSelectedRecipe(null)}>Kapat</button>
        </div>
      )}
    </div>
  );
}

export default App;
