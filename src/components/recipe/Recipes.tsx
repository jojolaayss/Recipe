import { useEffect, useState } from "react";
import type { Recipe } from "../../types/recipetype";
import { getAllRecipesApi } from "../../apis/recipes";
export default function Recipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const data = await getAllRecipesApi();
        setRecipes(data);
      } catch (error) {
        console.error("Failed to fetch recipes:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipes();
  }, []);

  if (loading)
    return <p className="text-center text-gray-500 mt-10">Loading...</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-center">
      {recipes.map((recipe) => (
        <div
          key={recipe.id}
          className="border rounded-base p-4 shadow hover:shadow-lg transition outline-gray-300"
          style={{
            width: "300px",
            height: "400px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <img
            src={
              recipe.image ||
              "https://via.placeholder.com/300x200?text=No+Image"
            }
            alt={recipe.name}
            style={{
              width: "100%",
              height: "180px",
              objectFit: "cover",
              borderRadius: "0.5rem",
            }}
          />

          <div className="flex flex-col justify-between flex-1 mt-2">
            <h3 className="font-bold text-lg mb-1">{recipe.name}</h3>
            <p className="text-sm text-gray-600 mb-1">
              Prep Time: {recipe.prepTimeMinutes} mins
            </p>
            <p className="text-sm text-gray-600">
              Difficulty: {recipe.difficulty}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
