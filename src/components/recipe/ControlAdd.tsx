import { useState } from "react";
import { addRecipeApi } from "../../apis/recipes";
import type { Recipe } from "../../types/recipetype";
import { toast } from "react-toastify";

type ControlAddProps = {
  setRecipes: React.Dispatch<React.SetStateAction<Recipe[]>>;
};

const ControlAdd = ({ setRecipes }: ControlAddProps) => {
  const [formData, setFormData] = useState<Partial<Omit<Recipe, "id">>>({
    name: "",
    ingredients: [],
    instructions: [],
    prepTimeMinutes: undefined,
    cookTimeMinutes: undefined,
    servings: undefined,
    difficulty: "",
    cuisine: "",
    caloriesPerServing: undefined,
    tags: [],
    userId: undefined,
    image: "",
    rating: undefined,
    reviewCount: undefined,
    mealType: [],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload: Omit<Recipe, "id"> = {
      name: formData.name?.trim() || "Untitled Recipe",
      ingredients: formData.ingredients ?? [],
      instructions: formData.instructions ?? [],
      prepTimeMinutes: formData.prepTimeMinutes ?? 0,
      cookTimeMinutes: formData.cookTimeMinutes ?? 0,
      servings: formData.servings ?? 1,
      difficulty: formData.difficulty?.trim() || "Easy",
      cuisine: formData.cuisine?.trim() || "Unknown",
      caloriesPerServing: formData.caloriesPerServing ?? 0,
      tags: formData.tags ?? [],
      userId: formData.userId ?? 0,
      image: formData.image?.trim() || "",
      rating: formData.rating ?? 0,
      reviewCount: formData.reviewCount ?? 0,
      mealType: formData.mealType ?? ["Other"],
    };

    try {
      const res = await addRecipeApi(payload);
      setRecipes((prev) => [res.data, ...prev]);

      setFormData({
        name: "",
        ingredients: [],
        instructions: [],
        prepTimeMinutes: undefined,
        cookTimeMinutes: undefined,
        servings: undefined,
        difficulty: "",
        cuisine: "",
        caloriesPerServing: undefined,
        tags: [],
        userId: undefined,
        image: "",
        rating: undefined,
        reviewCount: undefined,
        mealType: [],
      });

      toast.success("Recipe added successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to add recipe");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full"
    >
      <input
        type="text"
        placeholder="Name"
        value={formData.name ?? ""}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        className="border p-2 rounded col-span-1"
        required
      />

      <input
        type="number"
        placeholder="Prep Time (mins)"
        value={formData.prepTimeMinutes ?? ""}
        onChange={(e) =>
          setFormData({ ...formData, prepTimeMinutes: Number(e.target.value) })
        }
        className="border p-2 rounded col-span-1"
        min={0}
      />

      <input
        type="number"
        placeholder="Cook Time (mins)"
        value={formData.cookTimeMinutes ?? ""}
        onChange={(e) =>
          setFormData({ ...formData, cookTimeMinutes: Number(e.target.value) })
        }
        className="border p-2 rounded col-span-1"
        min={0}
      />

      <input
        type="number"
        placeholder="Servings"
        value={formData.servings ?? ""}
        onChange={(e) =>
          setFormData({ ...formData, servings: Number(e.target.value) })
        }
        className="border p-2 rounded col-span-1"
        min={1}
      />

      <input
        type="text"
        placeholder="Difficulty"
        value={formData.difficulty ?? ""}
        onChange={(e) =>
          setFormData({ ...formData, difficulty: e.target.value })
        }
        className="border p-2 rounded col-span-1"
      />

      <input
        type="text"
        placeholder="Cuisine"
        value={formData.cuisine ?? ""}
        onChange={(e) => setFormData({ ...formData, cuisine: e.target.value })}
        className="border p-2 rounded col-span-1"
      />

      <input
        type="number"
        placeholder="Calories per serving"
        value={formData.caloriesPerServing ?? ""}
        onChange={(e) =>
          setFormData({
            ...formData,
            caloriesPerServing: Number(e.target.value),
          })
        }
        className="border p-2 rounded col-span-1"
        min={0}
      />

      <input
        type="text"
        placeholder="Tags (comma separated)"
        value={(formData.tags ?? []).join(",")}
        onChange={(e) =>
          setFormData({
            ...formData,
            tags: e.target.value
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean),
          })
        }
        className="border p-2 rounded col-span-1"
      />

      <input
        type="text"
        placeholder="Meal Type (comma separated)"
        value={(formData.mealType ?? []).join(",")}
        onChange={(e) =>
          setFormData({
            ...formData,
            mealType: e.target.value
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean),
          })
        }
        className="border p-2 rounded col-span-1"
      />

      <input
        type="text"
        placeholder="Ingredients (comma separated)"
        value={(formData.ingredients ?? []).join(",")}
        onChange={(e) =>
          setFormData({
            ...formData,
            ingredients: e.target.value
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean),
          })
        }
        className="border p-2 rounded col-span-full"
      />

      <input
        type="text"
        placeholder="Instructions (use | to separate steps)"
        value={(formData.instructions ?? []).join("|")}
        onChange={(e) =>
          setFormData({
            ...formData,
            instructions: e.target.value
              .split("|")
              .map((s) => s.trim())
              .filter(Boolean),
          })
        }
        className="border p-2 rounded col-span-full"
      />

      <input
        type="text"
        placeholder="Image URL"
        value={formData.image ?? ""}
        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
        className="border p-2 rounded col-span-2"
      />

      <input
        type="number"
        placeholder="User ID"
        value={formData.userId ?? ""}
        onChange={(e) =>
          setFormData({ ...formData, userId: Number(e.target.value) })
        }
        className="border p-2 rounded col-span-1"
        min={0}
      />

      <input
        type="number"
        placeholder="Rating"
        value={formData.rating ?? ""}
        onChange={(e) =>
          setFormData({ ...formData, rating: Number(e.target.value) })
        }
        className="border p-2 rounded col-span-1"
        min={0}
        max={5}
        step={0.1}
      />

      <input
        type="number"
        placeholder="Review Count"
        value={formData.reviewCount ?? ""}
        onChange={(e) =>
          setFormData({ ...formData, reviewCount: Number(e.target.value) })
        }
        className="border p-2 rounded col-span-1"
        min={0}
      />

      <button
        type="submit"
        className="bg-fuchsia-500 text-white px-4 py-2 rounded col-span-full hover:bg-fuchsia-700 transition-colors mt-20"
      >
        Add Recipe
      </button>
    </form>
  );
};

export default ControlAdd;
