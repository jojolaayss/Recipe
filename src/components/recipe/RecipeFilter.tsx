import { useState, useEffect } from "react";
import type { Recipe } from "../../types/recipetype";

type RecipeFilterProps = {
  recipes: Recipe[];
  onFilterChange: (filters: {
    difficulty?: string;
    cuisine?: string;
    mealType?: string;
  }) => void;
};

const RecipeFilter = ({ recipes, onFilterChange }: RecipeFilterProps) => {
  const [difficulty, setDifficulty] = useState<string>("");
  const [cuisine, setCuisine] = useState<string>("");
  const [mealType, setMealType] = useState<string>("");

  const difficulties = Array.from(new Set(recipes.map((r) => r.difficulty)));
  const cuisines = Array.from(new Set(recipes.map((r) => r.cuisine)));
  const mealTypes = Array.from(new Set(recipes.flatMap((r) => r.mealType)));

  useEffect(() => {
    onFilterChange({
      difficulty: difficulty || undefined,
      cuisine: cuisine || undefined,
      mealType: mealType || undefined,
    });
  }, [difficulty, cuisine, mealType]);

  return (
    <div className="flex gap-4 mb-4">
      <select
        value={difficulty}
        onChange={(e) => setDifficulty(e.target.value)}
        className="p-2 border-2 border-gray-400 rounded-md appearance-none w-full text-center
              bg-fuchsia-200 transition-colors"
      >
        <option value="">All Difficulty</option>
        {difficulties.map((d) => (
          <option key={d} value={d}>
            {d}
          </option>
        ))}
      </select>

      <select
        value={cuisine}
        onChange={(e) => setCuisine(e.target.value)}
        className="p-2 border-2 border-gray-400 rounded-md appearance-none w-full text-center
             bg-fuchsia-200 transition-colors"
      >
        <option value="">All Cuisines</option>
        {cuisines.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      <select
        value={mealType}
        onChange={(e) => setMealType(e.target.value)}
        className="p-2 border-2 border-gray-400 rounded-md appearance-none w-full text-center
            bg-fuchsia-200 transition-colors"
      >
        <option value="">All Meal Type </option>
        {mealTypes.map((m) => (
          <option key={m} value={m}>
            {m}
          </option>
        ))}
      </select>
    </div>
  );
};

export default RecipeFilter;
