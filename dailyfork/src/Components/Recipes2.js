import axios from "axios";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    async function getRecipes() {
      const diet = "Gluten Free";
      try {
        const response = await axios.get(
          `https://api.spoonacular.com/recipes/complexSearch?number=7&apiKey=${process.env.REACT_APP_API_KEY}&addRecipeInformation=true&addRecipeNutrition=true&diet=${diet}`
        );
        console.log(response.data.results);
        setRecipes(response.data.results);
      } catch (error) {
        console.error(error);
      }
    }
    getRecipes();
  }, []);

  return (
    <div>
      <h1>Title: {recipes[2]?.title} </h1>
      <img src={recipes[2]?.image} />
      <ol>
        {recipes[2]?.analyzedInstructions[0]?.steps.map((item) => {
          return <li>{item.step}</li>;
        })}
      </ol>
      <ul>
        {recipes[2]?.nutrition?.ingredients.map((item) => {
          return <li>{item.name}</li>;
        })}
      </ul>
      <h3>
        {recipes[2]?.summary}
      </h3>
    </div>
  );
};

export default Recipes;